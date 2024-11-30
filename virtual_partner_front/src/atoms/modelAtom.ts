import { atom } from "jotai";

export const live2dModelAtom = atom<string>(
  "/Resources/Hiyori/Hiyori.model3.json"
);
export const characterIdAtom = atom<number>(0);
