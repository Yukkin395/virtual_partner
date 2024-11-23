import React, { useRef, useEffect } from "react";
import { usePIXIApp } from "../hooks/usePIXIApp";
import { useLive2DModel } from "../hooks/useLive2DModel";

const Live2DModelComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMountedRef = useRef(true);
  const { app, initialized } = usePIXIApp(canvasRef); // 初期化状態を取得

  // マウント状態の管理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // PIXIアプリケーションが初期化された後にモデルをロード
  useLive2DModel(initialized ? app : null, isMountedRef.current);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default Live2DModelComponent;
