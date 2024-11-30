import { useAtom } from "jotai";
import { useState } from "react";
import { characterIdAtom, live2dModelAtom } from "../../../atoms/modelAtom";
import type { Live2DModel } from "../types/live2dModel";

export const useModelSelection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setModelPath] = useAtom(live2dModelAtom);
  const [, setCharaId] = useAtom(characterIdAtom);

  const handleSelectModel = (model: Live2DModel) => {
    setModelPath(model.path);
    setCharaId(model.id);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    handleSelectModel,
  };
};
