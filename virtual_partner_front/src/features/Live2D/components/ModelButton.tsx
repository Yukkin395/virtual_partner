import { Person } from "@mui/icons-material";

type Props = {
  onClick: () => void;
};

export const ModelButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className="z-40 p-2 bg-white rounded-full hover:scale-105 transition-colors"
  >
    <Person className="h-6 w-6" />
  </button>
);
