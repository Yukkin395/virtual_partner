// ウィンドウのサイズが変更された時に特定の処理を行う為のフック
import { useEffect } from "react";

export const useResize = (onResize: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
};
