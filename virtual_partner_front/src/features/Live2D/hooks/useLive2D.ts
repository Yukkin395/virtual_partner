import { models } from "../constants/model";
import { useModelSelection } from "./useModelSelection";

export const useLive2D = () => {
  const { isOpen, setIsOpen, handleSelectModel } = useModelSelection();

  return {
    models,
    isOpen,
    setIsOpen,
    handleSelectModel,
  };
};
