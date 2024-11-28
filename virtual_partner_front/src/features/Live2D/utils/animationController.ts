import * as PIXI from "pixi.js";

// リップシンクの制御用の状態
let isLipSyncEnabled = false;

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
