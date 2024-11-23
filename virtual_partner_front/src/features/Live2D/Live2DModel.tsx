import React, { useLayoutEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch';

// グローバルスコープで型定義を追加する
declare global {
  interface Window {
    // PIXIをグローバルに設定
    PIXI: typeof PIXI;
  }
}

if (!window.PIXI) {
  window.PIXI = PIXI;
}

const Live2DModelComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // HTML Canvas要素にアクセスするためのRef
  const appRef = useRef<PIXI.Application | null>(null); // PIXIアプリケーションにアクセスするためのRef
  const isMountedRef = useRef(true); // コンポーネントのマウント状態を追跡するためのRef

  // キャンバスの初期化とモデルの描画タイミングを制御する為に、useLayoutEffectを使用
  useLayoutEffect(() => {
    console.log('useLayoutEffect開始');

    // 既存のアプリケーションがあれば破棄
    if (appRef.current) {
      console.log('既存のPIXIアプリケーションを破棄');
      appRef.current.destroy(true);
      appRef.current = null;
    }

    // canvasRefが有効か確認
    if (!canvasRef.current) {
      console.log('canvasRefが未定義です');
      return;
    }

    isMountedRef.current = true;

    // PIXIの基本設定
    console.log('PIXIの設定を開始');
    PIXI.Program.defaultFragmentPrecision = PIXI.PRECISION.HIGH; // Live2Dモデルの描画品質向上のために追加
    PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false; // 低性能環境でもPIXIを使用するために追加
    console.log('PIXIの設定が完了');

    // PIXIアプリケーションを作成
    console.log('PIXIアプリケーションを作成');
    const app = new PIXI.Application({
      view: canvasRef.current,
      // 自動レンダリング
      autoStart: true, // アニメーションループ

      // キャンバスのサイズ設定
      width: window.innerWidth,
      height: window.innerHeight,

      // 解像度
      resolution: window.devicePixelRatio || 1,
      antialias: true, // エッジのぎざぎざを軽減

      // レンダリング設定
      preserveDrawingBuffer: true, // 描画バッファ(画面に表示される内容を一時的に保存する場所)を保持
      backgroundAlpha: 0, // 背景を透明にする
      forceCanvas: false, // WebGLの優先使用
    });

    appRef.current = app;
    console.log('PIXIアプリケーションが作成されました');

    // Live2Dモデルのロード
    (async () => {
      try {
        console.log('Live2Dモデルのロードを開始');
        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
          autoUpdate: true, // 自動更新を有効化
        });
        console.log('Live2Dモデルがロードされました');

        if (!isMountedRef.current) {
          console.log('コンポーネントはアンマウントされています');
          return;
        }

        if (appRef.current && appRef.current.stage) {
          // モデルのサイズと位置を設定
          const scale = 0.2;
          model.scale.set(scale);

          // モデルの設定
          model.anchor.set(0.5);
          model.position.set(
            window.innerWidth / 2,
            window.innerHeight / 2,
          );

          // ウィンドウリサイズ時の処理
          const onResize = () => {
            model.position.set(
              window.innerWidth / 2,
              window.innerHeight / 2
            );
          };

          window.addEventListener('resize', onResize);

          appRef.current.stage.addChild(model as unknown as PIXI.DisplayObject); // モデルをPIXIのステージに追加
          console.log('モデルの初期化が完了しました');
        } else {
          console.log('appRef.currentまたはappRef.current.stageがnullです');
        }
      } catch (error) {
        console.error('Live2Dモデルのロードに失敗:', error);
      }
    })();

    // クリーンアップ
    return () => {
      console.log('useLayoutEffectのクリーンアップ');
      isMountedRef.current = false;
      if (appRef.current) {
        console.log('PIXIアプリケーションを破棄');
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Live2DModelComponent;
