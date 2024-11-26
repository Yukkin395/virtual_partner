import { useRef, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { initializePIXI, getDefaultPIXIConfig } from "../utils/pixiConfig";

export const usePIXIApp = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const appRef = useRef<PIXI.Application | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      initializePIXI();

      const app = new PIXI.Application({
        view: canvasRef.current,
        ...getDefaultPIXIConfig(),
      });

      appRef.current = app;
      app.start();
      setInitialized(true);

      console.log("PIXIアプリケーションが正常に初期化されました");
    } catch (error) {
      console.error("PIXIアプリケーションの初期化に失敗:", error);
    }

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
        setInitialized(false);
      }
    };
  }, [canvasRef]);

  return { app: appRef.current, initialized };
};
