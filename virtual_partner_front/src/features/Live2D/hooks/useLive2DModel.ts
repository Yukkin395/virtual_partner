import { useEffect, useRef, useCallback } from "react";
import { Live2DModel } from "pixi-live2d-display-lipsyncpatch";
import { Application } from "pixi.js";
import { useResize } from "../../../hooks/useResize";

interface CoreModel {
  setParameterValueById(id: string, value: number): void;
}

export const useLive2DModel = (
  app: Application | null,
  isMounted: boolean,
  analyzer: AnalyserNode | null,
  isPlaying: boolean
) => {
  const modelRef = useRef<Live2DModel | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const onResize = useCallback(() => {
    if (modelRef.current) {
      modelRef.current.position.set(
        window.innerWidth / 2,
        window.innerHeight / 2 + 150
      );
    }
  }, []);

  useResize(onResize);

  // モデルのロードと初期設定
  useEffect(() => {
    if (!app || !isMounted) return;

    const loadModel = async () => {
      try {
        const model = await Live2DModel.from(
          "/Resources/Hiyori/Hiyori.model3.json",
          {
            autoUpdate: true,
          }
        );
        modelRef.current = model;

        const scale = Math.min(
          window.innerWidth / model.width,
          window.innerHeight / model.height
        ) * 1.5;
        model.scale.set(scale);
        model.anchor.set(0.5);
        model.position.set(window.innerWidth / 2, window.innerHeight / 2 + 150);

        app.stage.addChild(model as any);
      } catch (error) {
        console.error("Live2Dモデルのロードに失敗:", error);
      }
    };

    loadModel();
  }, [app, isMounted]);

  // リップシンクの更新
  useEffect(() => {
    if (!app || !isMounted || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const updateLipSync = () => {
      if (analyzer && modelRef.current) {
        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const normalizedValue = Math.min(average / 128, 1);

        try {
          const coreModel = modelRef.current.internalModel
            .coreModel as unknown as CoreModel;
          coreModel.setParameterValueById("ParamMouthOpenY", normalizedValue);
        } catch (error) {
          console.error("パラメータの設定に失敗:", error);
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateLipSync);
    };

    updateLipSync();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [app, isMounted, analyzer, isPlaying]);

  return {
    model: modelRef.current,
  };
};
