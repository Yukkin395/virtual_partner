import { useState, useCallback, useMemo } from "react";
import { useTimer } from "./useTimer";
import { useTaskManager } from "./useTaskmanager";

export const usePomodoroTimer = () => {
  const [isWork, setIsWork] = useState<boolean>(true);
  const [workDuration, setWorkDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);

  // 作業時間変更時のハンドラー
  const handleWorkDurationChange = useCallback(
    (newDuration: number) => {
      // 1分未満または60分より大きい値は設定できないようにする
      if (newDuration < 1) {
        setWorkDuration(1);
        if (isWork) {
          resetTimer(60);
        }
        return;
      }

      if (newDuration > 60) {
        setWorkDuration(60);
        if (isWork) {
          resetTimer(60 * 60);
        }
        return;
      }

      setWorkDuration(newDuration);
      if (isWork) {
        resetTimer(newDuration * 60);
      }
    },
    [isWork]
  );
  // 休憩時間変更時のハンドラー
  const handleBreakDurationChange = useCallback(
    (newDuration: number) => {
      setBreakDuration(newDuration);
      if (!isWork) {
        resetTimer(newDuration * 60);
      }
    },
    [!isWork]
  );

  // ブラウザ通知
  const notify = useCallback(() => {
    if (Notification.permission === "granted") {
      new Notification(isWork ? "休憩時間です！" : "作業を開始しましょう！");
    }

    if (isWork) {
      setIsWork(false);
      resetTimer(breakDuration * 60);
      startTimer();
    } else {
      setIsWork(true);
      resetTimer(workDuration * 60);
    }
  }, [isWork, workDuration, breakDuration]);

  // タイマー機能
  const { time, isActive, startTimer, pauseTimer, resetTimer } = useTimer({
    initialTime: workDuration * 60,
    onTimeEnd: notify,
  });

  // タスク管理
  const { tasks, newTask, setNewTask, addTask, toggleTask, deleteTask } =
    useTaskManager();

  // 進捗率をパーセンテージで計算
  const progress = useMemo(() => {
    const totalTime = isWork ? workDuration * 60 : breakDuration * 60;
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
    deleteTask,
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
    handleBreakDurationChange,
    handleWorkDurationChange,
  };
};
