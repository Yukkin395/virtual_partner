import { Close } from "@mui/icons-material";
import { BackgroundGrid } from "./BackgroundGrid";
import type { BackgroundImage } from "../types/backgroundImage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (bg: BackgroundImage) => void;
  backgrounds: BackgroundImage[];
};

export const BackgroundModal = ({
  isOpen,
  onClose,
  onSelect,
  backgrounds,
}: Props) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30"
      onClick={handleOverlayClick}
    >
      <div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[93%] bg-white bg-opacity-50 rounded-xl w-[calc(60vw-32px)] h-[calc(70vh-32px)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">背景を選択</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Close className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <BackgroundGrid backgrounds={backgrounds} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};
