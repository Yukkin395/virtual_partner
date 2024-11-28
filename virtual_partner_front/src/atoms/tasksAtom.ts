import { atom } from "jotai";
import type { Task } from "../features/Pomodoro/hooks/useTaskmanager";

// タスクリストを管理するatom
export const tasksAtom = atom<Task[]>([]);

// 新規タスク入力用のatom
export const newTaskAtom = atom<string>("");
