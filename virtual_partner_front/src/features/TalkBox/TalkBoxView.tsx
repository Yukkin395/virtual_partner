type TalkBoxViewProps = {
  message: string;
};

export const TalkBoxView = ({ message }: TalkBoxViewProps) => {
  const borderColor = "border-gray-300";

  return (
    <div
      className={`relative bg-white bg-opacity-90 rounded-2xl ${borderColor} shadow-xl min-w-[240px] max-w-[400px] mx-auto py-4 px-8`}
    >
      <p className="text-[#865734] text-lg leading-relaxed font-bold tracking-wide">
        {message}
      </p>
      <div
        className={`absolute top-[-10px] left-[60%] transform -translate-x-1/2 w-0 h-0 border-b-[10px] border-b-white border-b-opacity-90 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${borderColor}`}
      ></div>
    </div>
  );
};
