import { useEffect, useRef } from "react";

import * as PIXI from "pixi.js";
import { InternalModel, Live2DModel } from "pixi-live2d-display-lipsyncpatch";

// CoreModelインターフェースを定義
interface CoreModel {
  setParameterValueById(id: string, value: number): void;
}

// InternalModelを拡張
interface ExtendedInternalModel extends InternalModel {
  coreModel: CoreModel;
}

// Live2DModelを拡張
type Live2DModelExtended = Live2DModel & {
  internalModel: ExtendedInternalModel;
};

interface Props {
  modelPath: string;
  audioUrl?: string;
}

export const useLive2DLipSync = ({ modelPath, audioUrl }: Props) => {
  const modelRef = useRef<Live2DModelExtended | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // モデルのロードと初期化
  const loadModel = async (app: PIXI.Application) => {
    try {
      const model = (await Live2DModel.from(modelPath, {
        autoUpdate: true,
      })) as Live2DModelExtended;
      modelRef.current = model;

      // モデルのスケーリングと位置設定
      const scale =
        Math.min(
          window.innerWidth / model.width,
          window.innerHeight / model.height
        ) * 1.5;

      model.scale.set(scale);
      model.anchor.set(0.5);
      model.position.set(window.innerWidth / 2, window.innerHeight / 2 + 150);

      app.stage.addChild(model);
    } catch (error) {
      console.error("Live2Dモデルのロードに失敗:", error);
    }
  };

  // リップシンクの設定
  const setupLipSync = async (audioUrl: string) => {
    if (!modelRef.current) return;

    try {
      const audio = new Audio(audioUrl);
      audio.crossOrigin = "anonymous";

      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const analyzer = audioContext.createAnalyser();

      analyzer.fftSize = 256;
      analyzer.minDecibels = -90;
      analyzer.maxDecibels = -10;
      analyzer.smoothingTimeConstant = 0.85;

      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      analyzerRef.current = analyzer;
      audioContextRef.current = audioContext;

      // モーション開始
      const result = await modelRef.current.motion(
        "Idle", // モーショングループ
        0, // モーションインデックス
        3, // 優先度 (FORCE)
        {
          sound: audioUrl,
          crossOrigin: "anonymous",
        }
      );

      if (result) {
        audio.play();
        startLipSync();
      }
    } catch (error) {
      console.error("リップシンクの設定に失敗:", error);
    }
  };

  // リップシンクのアニメーション更新
  const updateLipSync = () => {
    if (!modelRef.current || !analyzerRef.current) return;

    const analyzer = analyzerRef.current;
    const dataArray = new Float32Array(analyzer.fftSize);
    analyzer.getFloatTimeDomainData(dataArray);

    // 音声の振幅から口の開き具合を計算
    let sumSquares = 0;
    for (const amplitude of dataArray) {
      sumSquares += amplitude * amplitude;
    }
    const value = Math.sqrt((sumSquares / dataArray.length) * 20);

    // パラメータの更新
    try {
      const coreModel = modelRef.current.internalModel
        .coreModel as unknown as CoreModel;
      coreModel.setParameterValueById("ParamMouthOpenY", value);
    } catch (error) {
      console.error("パラメータの設定に失敗:", error);
    }

    animationFrameRef.current = requestAnimationFrame(updateLipSync);
  };

  const startLipSync = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    updateLipSync();
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    model: modelRef.current,
    loadModel,
    setupLipSync,
  };
};
