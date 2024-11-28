// PixiJSのアプリケーションを初期化するカスタムフック
import { useRef, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { initializePIXI, getDefaultPIXIConfig } from "../utils/pixiConfig";
import { useResize } from "../../../hooks/useResize";

export const usePIXIApp = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const appRef = useRef<PIXI.Application | null>(null);
  const [initialized, setInitialized] = useState(false);

  const onResize = () => {
    if (appRef.current) {
      appRef.current.renderer.resize(window.innerWidth, window.innerHeight);
    }
  };

  useResize(onResize);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      initializePIXI(); // PixiJSの初期設定を行う

      const app = new PIXI.Application({
        view: canvasRef.current,
        ...getDefaultPIXIConfig(),
      });

      appRef.current = app; // アプリケーションの参照を更新
      app.start();
      setInitialized(true);

      console.log("PIXIアプリケーションが正常に初期化されました");
    } catch (error) {
      console.error("PIXIアプリケーションの初期化に失敗:", error);
    }

    // クリーンアップ関数
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
