export interface PIXIConfig {
  width: number;
  height: number;
  resolution: number;
  antialias: boolean;
  preserveDrawingBuffer: boolean;
  backgroundAlpha: number;
  forceCanvas: boolean;
}

export interface ModelConfig {
  scale: number;
  autoUpdate: boolean;
}
