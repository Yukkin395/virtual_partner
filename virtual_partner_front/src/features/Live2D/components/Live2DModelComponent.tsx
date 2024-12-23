import React, { useRef, useEffect } from "react";
import { usePIXIApp } from "../hooks/usePIXIApp";
import { useLive2DModel } from "../hooks/useLive2DModel";
import { useAudioAnalyzer } from "../../../hooks/useAudioAnalyzer";
import { useAtom } from "jotai";
import { backgroundImageAtom } from "../../../atoms/backgroundAtom";

interface Live2DModelComponentProps {
  modelPath: string;
  audioUrl?: string;
}

export const Live2DModelComponent: React.FC<Live2DModelComponentProps> = ({
  modelPath,
  audioUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMountedRef = useRef(true);
  const { app, initialized } = usePIXIApp(canvasRef); // 初期化状態を取得
  const { analyzer, isPlaying } = useAudioAnalyzer(audioUrl || "");
  const [backgroundImage] = useAtom(backgroundImageAtom);

  // マウント状態の管理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // モデルのクリーンアップと再ロードを行う
  useEffect(() => {
    if (app && initialized) {
      // 既存のモデルをクリーンアップ
      app.stage.removeChildren();
    }
  }, [modelPath, app, initialized]);

  useLive2DModel(
    initialized ? app : null,
    isMountedRef.current,
    analyzer,
    isPlaying,
    modelPath
  );

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
