import { useState, useCallback, useMemo } from "react";
import { useTimer } from "./useTimer";
import { useTaskManager } from "./useTaskmanager";

export const usePomodoroTimer = () => {
  const [isWork, setIsWork] = useState<boolean>(true);

  // ブラウザ通知
  const notify = useCallback(() => {
    if (Notification.permission === "granted") {
      new Notification(isWork ? "休憩時間です！" : "作業を開始しましょう！");
    }

    if (isWork) {
      setIsWork(false);
      resetTimer(5 * 60);
      startTimer();
    } else {
      setIsWork(true);
      resetTimer(25 * 60);
    }
  }, [isWork]);

  // タイマー機能
  const { time, isActive, startTimer, pauseTimer, resetTimer } = useTimer({
    initialTime: 25 * 60,
    onTimeEnd: notify,
  });

  // タスク管理
  const { tasks, newTask, setNewTask, addTask, toggleTask } = useTaskManager();

  // 進捗率をパーセンテージで計算
  const progress = useMemo(() => {
    const totalTime = isWork ? 25 * 60 : 5 * 60;
    return ((totalTime - time) / totalTime) * 100;
  }, [isWork, time]);

  // 時間フォーマット
  const formattedTime = useMemo(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  return {
    isWork,
    isActive,
    progress,
    formattedTime,
    tasks,
    newTask,
    startTimer,
    pauseTimer,
    resetTimer,
    setNewTask,
    addTask,
    toggleTask,
  };
};
