import React, { useRef, useEffect } from "react";
import { usePIXIApp } from "../hooks/usePIXIApp";
import { useLive2DModel } from "../hooks/useLive2DModel";
import { useAudioAnalyzer } from "../../../hooks/useAudioAnalyzer";

const Live2DModelComponent: React.FC<{ audioUrl: string }> = ({ audioUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMountedRef = useRef(true);
  const { app, initialized } = usePIXIApp(canvasRef); // 初期化状態を取得
  const { analyzer, playAudio, pauseAudio, isPlaying } = useAudioAnalyzer(audioUrl);

  // マウント状態の管理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // PIXIアプリケーションが初期化された後にモデルをロード
  useLive2DModel(initialized ? app : null, isMountedRef.current, analyzer, isPlaying);

  return (
    <>
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
      <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 2 }}>
        <button onClick={playAudio}>再生</button>
        <button onClick={pauseAudio}>停止</button>
      </div>
    </>
  );
};

export default Live2DModelComponent;
