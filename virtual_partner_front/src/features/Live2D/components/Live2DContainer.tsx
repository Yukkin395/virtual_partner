import { Live2DView } from "./Live2DView";
import { useLive2D } from "../hooks/useLive2D";

export const Live2DContainer = () => {
  const { models, isOpen, setIsOpen, handleSelectModel } = useLive2D();

  return (
    <Live2DView
      isOpen={isOpen}
      onModalOpen={() => setIsOpen(true)}
      onModalClose={() => setIsOpen(false)}
      onModelSelect={handleSelectModel}
      models={models}
    />
  );
};
