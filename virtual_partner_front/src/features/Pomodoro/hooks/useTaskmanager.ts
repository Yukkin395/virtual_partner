import { useState, useCallback } from "react";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // 空白で無いタスクのみを追加
      if (newTask.trim()) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), text: newTask.trim(), completed: false },
        ]);
        setNewTask("");
      }
    },
    [newTask]
  );

  // 指定されたIDのタスクの完了状態を切り替える
  const toggleTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return {
    tasks,
    newTask,
    setNewTask,
    addTask,
    toggleTask,
  };
};
