import { BackgroundButton } from "./components/BackgroundButton";
import { BackgroundModal } from "./components/BackgroundModal";
import { backgrounds } from "./constants/background";
import { useBackgroundSelection } from "./hooks/useBackgroundSelection";

export const BackgroundSelector = () => {
  const { isOpen, setIsOpen, handleSelectBackground } =
    useBackgroundSelection();

  return (
    <>
      <BackgroundButton onClick={() => setIsOpen(true)} />
      <BackgroundModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelectBackground}
        backgrounds={backgrounds}
      />
    </>
  );
};
