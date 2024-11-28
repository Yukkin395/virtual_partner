import { Close } from "@mui/icons-material";
import { ModelGrid } from "./ModelGrid";
import type { Live2DModel } from "../types/live2dModel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: Live2DModel) => void;
  models: Live2DModel[];
};

export const ModelModal = ({ isOpen, onClose, onSelect, models }: Props) => {
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
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[96%] bg-white bg-opacity-50 rounded-xl w-[calc(60vw-32px)] h-[calc(70vh-32px)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">モデルを選択</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Close className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <ModelGrid models={models} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};
