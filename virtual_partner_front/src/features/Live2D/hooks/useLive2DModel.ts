import { useEffect } from 'react';
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch';
import { Application } from 'pixi.js';

export const useLive2DModel = (
  app: Application | null,
  isMounted: boolean
) => {
  useEffect(() => {
    if (!app || !isMounted) return;

    const loadModel = async () => {
      try {
        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
          autoUpdate: true,
        });

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

        return () => window.removeEventListener('resize', onResize);
      } catch (error) {
        console.error('Live2Dモデルのロードに失敗:', error);
      }
    };

    loadModel();
  }, [app, isMounted]);
};