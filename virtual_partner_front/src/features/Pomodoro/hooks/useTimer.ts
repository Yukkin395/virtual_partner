import { useState, useEffect, useCallback } from "react";

interface UseTimerProps {
  initialTime: number;
  onTimeEnd: () => void;
}

export const useTimer = ({ initialTime, onTimeEnd }: UseTimerProps) => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false); // タイマーの動作状態を管理

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  // タイマーを一時停止
  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback((newTime: number) => {
    setIsActive(false);
    setTime(newTime);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // 1秒ごとにカウントダウン
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      onTimeEnd();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onTimeEnd]);

  return {
    time,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
