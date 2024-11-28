import { Image } from "@mui/icons-material";

type Props = {
  onClick: () => void;
};

export const BackgroundButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className="fixed z-50 p-2 bg-white backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-colors"
  >
    <Image className="h-6 w-6" />
  </button>
);
