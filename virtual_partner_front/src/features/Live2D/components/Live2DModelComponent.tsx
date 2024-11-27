import React, { useRef, useEffect } from "react";
import { usePIXIApp } from "../hooks/usePIXIApp";
import { useLive2DModel } from "../hooks/useLive2DModel";
import { useAudioAnalyzer } from "../../../hooks/useAudioAnalyzer";

const Live2DModelComponent: React.FC<{ audioUrl: string }> = ({ audioUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMountedRef = useRef(true);
  const { app, initialized } = usePIXIApp(canvasRef); // 初期化状態を取得
  const { analyzer, isPlaying } = useAudioAnalyzer(audioUrl);

  // マウント状態の管理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // PIXIアプリケーションが初期化された後にモデルをロード
  useLive2DModel(
    initialized ? app : null,
    isMountedRef.current,
    analyzer,
    isPlaying
  );

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-custom-image"
    />
  );
};

export default Live2DModelComponent;
