import { ModelButton } from "./ModelButton";
import { ModelModal } from "./ModelModal";
import type { Live2DModel } from "../types/live2dModel";

type Live2DViewProps = {
  isOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  onModelSelect: (model: Live2DModel) => void;
  models: Live2DModel[];
};

export const Live2DView: React.FC<Live2DViewProps> = ({
  isOpen,
  onModalOpen,
  onModalClose,
  onModelSelect,
  models,
}) => {
  return (
    <>
      <ModelButton onClick={onModalOpen} />
      <ModelModal
        isOpen={isOpen}
        onClose={onModalClose}
        onSelect={onModelSelect}
        models={models}
      />
    </>
  );
};
