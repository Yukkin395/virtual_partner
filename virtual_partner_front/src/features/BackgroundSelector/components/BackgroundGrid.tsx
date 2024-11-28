import type { BackgroundImage } from "../types/backgroundImage";

type Props = {
  backgrounds: BackgroundImage[];
  onSelect: (bg: BackgroundImage) => void;
};

export const BackgroundGrid = ({ backgrounds, onSelect }: Props) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {backgrounds.map((bg) => (
      <button
        key={bg.path}
        onClick={() => onSelect(bg)}
        className="aspect-video relative overflow-hidden rounded-lg hover:ring-4 hover:scale-105 ring-white transition-all"
      >
        <img
          src={bg.path}
          alt={bg.alt}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
);
