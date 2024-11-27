import { useNicoNico } from "./useNiconico";

type NicoNicoViewProps = {
  Comments: string[];
};

export const NicoNicoView = ({ Comments }: NicoNicoViewProps) => {
  const comments = useNicoNico(Comments);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="absolute whitespace-nowrap animate-niconico-scroll"
          style={{ top: `${comment.top}vh` }}
        >
          <p className="text-3xl font-bold text-white">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};