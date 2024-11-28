import { ModelButton } from "./ModelButton";
import { ModelModal } from "./ModelModal";
import { models } from "../constants/model";
import { useModelSelection } from "../hooks/useModelSelection";

export const ModelSelector = () => {
  const { isOpen, setIsOpen, handleSelectModel } = useModelSelection();

  return (
    <>
      <ModelButton onClick={() => setIsOpen(true)} />
      <ModelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelectModel}
        models={models}
      />
    </>
  );
};
