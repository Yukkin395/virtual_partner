import { useAtom } from "jotai";
import { useCallback } from "react";
import { newTaskAtom, tasksAtom } from "../../../atoms/tasksAtom";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [newTask, setNewTask] = useAtom(newTaskAtom);

  const addTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // 空白で無いタスクのみを追加
      if (newTask.trim()) {
        setTasks((prevTasks: Task[]) => [
          ...prevTasks,
          { id: Date.now(), text: newTask.trim(), completed: false },
        ]);
        setNewTask("");
      }
    },
    [newTask, setTasks, setNewTask]
  );

  // 指定されたIDのタスクの完了状態を切り替える
  const toggleTask = useCallback(
    (id: number) => {
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task: Task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prevTasks: Task[]) =>
        prevTasks.filter((task: Task) => task.id !== id)
      );
    },
    [setTasks]
  );

  return {
    tasks,
    newTask,
    setNewTask,
    addTask,
    toggleTask,
    deleteTask,
  };
};
