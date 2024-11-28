import { Live2DModel } from "../types/live2dModel";

type Props = {
  models: Live2DModel[];
  onSelect: (model: Live2DModel) => void;
};

export const ModelGrid = ({ models, onSelect }: Props) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {models.map((model) => (
      <button
        key={model.id}
        onClick={() => onSelect(model)}
        className="aspect-square relative overflow-hidden rounded-lg hover:ring-4 hover:scale-105 ring-white transition-all"
      >
        <img
          src={model.thumbnailPath}
          alt={model.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
          {model.name}
        </div>
      </button>
    ))}
  </div>
);
