import { backgrounds } from "../constants/background";
import { useBackgroundSelection } from "../hooks/useBackgroundSelection";
import { BackgroundSelectorView } from "./BackgroundSelectoreView";

export const BackgroundSelectorContainer = () => {
  const { isOpen, setIsOpen, handleSelectBackground } =
    useBackgroundSelection();

  return (
    <BackgroundSelectorView
      isOpen={isOpen}
      onButtonClick={() => setIsOpen(true)}
      onModalClose={() => setIsOpen(false)}
      onBackgroundSelect={handleSelectBackground}
      backgrounds={backgrounds}
    />
  );
};
