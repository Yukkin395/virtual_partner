import SpeechInput from "../../features/SpecchInput/SpeechInput";

type TextFieldViewProps = {
  label?: string;
  placeholder: string;
  onResult: (transcribedText: string, llmResponse: string) => void;
  currentCharaId: number;
};

export const TextFieldView = ({
  label,
  placeholder,
  onResult,
  currentCharaId,
}: TextFieldViewProps) => {
  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <label className="text-md font-medium px-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-2 py-2 text-base bg-white border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200
                    focus:border-transparent transition-all duration-200 ease-in-out
                  placeholder:text-gray-400"
        />
        <div className="absolute translate-x-[380px] bottom-1">
          <SpeechInput onResult={onResult} currentCharaId={currentCharaId} />
        </div>
      </div>
    </div>
  );
};
