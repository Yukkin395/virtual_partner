import * as PIXI from 'pixi.js';

declare global {
  interface Window {
    PIXI: typeof PIXI;
  }
}

export const initializePIXI = () => {
  PIXI.Program.defaultFragmentPrecision = PIXI.PRECISION.HIGH;
  PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;
  window.PIXI = PIXI;
};

// リップシンクの制御用の状態
let isLipSyncEnabled = false;

export const getDefaultPIXIConfig = () => ({
  autoStart: true,
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio || 1,
  antialias: true,
  preserveDrawingBuffer: true,
  backgroundAlpha: 0,
  forceCanvas: false,
});

// アニメーション制御用の関数
export const controlAnimation = (app: PIXI.Application) => {
  return {
    start: () => {
      if (!app.ticker.started) {
        app.start();
      }
    },
    stop: () => {
      app.stop();
    },
    startLipSync: () => {
      isLipSyncEnabled = true;
      if (!app.ticker.started) {
        app.start();
      }
    },
    stopLipSync: () => {
      isLipSyncEnabled = false;
      app.stop();
    },
    isLipSyncActive: () => isLipSyncEnabled,
  };
};