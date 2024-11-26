import * as PIXI from "pixi.js";

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
