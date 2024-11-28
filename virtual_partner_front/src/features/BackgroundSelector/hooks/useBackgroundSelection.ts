import { useState } from "react";
import { useAtom } from "jotai";
import { backgroundImageAtom } from "../../../atoms/backgroundAtom";
import type { BackgroundImage } from "../types/backgroundImage";

export const useBackgroundSelection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setBackgroundImage] = useAtom(backgroundImageAtom);

  const handleSelectBackground = (bg: BackgroundImage) => {
    setBackgroundImage(bg.path);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    handleSelectBackground,
  };
};
