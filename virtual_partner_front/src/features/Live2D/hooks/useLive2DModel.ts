

import { useEffect, useRef } from 'react';
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch';
import { Application } from 'pixi.js';

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

  // モデルのロードと初期設定
  useEffect(() => {
    if (!app || !isMounted) return;

    const loadModel = async () => {
      try {
        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
          autoUpdate: true,
        });
        modelRef.current = model;

        model.scale.set(0.2);
        model.anchor.set(0.5);
        model.position.set(
          window.innerWidth / 2,
          window.innerHeight / 2
        );

        const onResize = () => {
          model.position.set(
            window.innerWidth / 2,
            window.innerHeight / 2
          );
        };

        window.addEventListener('resize', onResize);
        app.stage.addChild(model as any);

        return () => {
          window.removeEventListener('resize', onResize);
        };
      } catch (error) {
        console.error('Live2Dモデルのロードに失敗:', error);
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
          const coreModel = modelRef.current.internalModel.coreModel as unknown as CoreModel;
          coreModel.setParameterValueById('ParamMouthOpenY', normalizedValue);
        } catch (error) {
          console.error('パラメータの設定に失敗:', error);
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
