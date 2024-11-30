import { BackgroundButton } from "./BackgroundButton";
import { BackgroundModal } from "./BackgroundModal";
import type { BackgroundImage } from "../types/backgroundImage";

type BackgroundSelectorViewProps = {
  isOpen: boolean;
  onButtonClick: () => void;
  onModalClose: () => void;
  onBackgroundSelect: (bg: BackgroundImage) => void;
  backgrounds: BackgroundImage[];
};

export const BackgroundSelectorView: React.FC<BackgroundSelectorViewProps> = ({
  isOpen,
  onButtonClick,
  onModalClose,
  onBackgroundSelect,
  backgrounds,
}) => {
  return (
    <>
      <BackgroundButton onClick={onButtonClick} />
      <BackgroundModal
        isOpen={isOpen}
        onClose={onModalClose}
        onSelect={onBackgroundSelect}
        backgrounds={backgrounds}
      />
    </>
  );
};
