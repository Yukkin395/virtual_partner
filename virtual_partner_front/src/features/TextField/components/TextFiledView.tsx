import React from "react";
import { SpeechInput } from "../../../features/SpecchInput";

type TextFieldViewProps = {
  label?: string;
  placeholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onResult: (transcribedText: string, llmResponse: string) => void;
  currentCharaId: number;
};

export const TextFieldView: React.FC<TextFieldViewProps> = ({
  label,
  placeholder,
  inputValue,
  onInputChange,
  onSubmit,
  onResult,
  currentCharaId,
}) => {
  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      {label && <label className="text-md font-medium px-1">{label}</label>}
      <form onSubmit={onSubmit} className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          className="w-full px-2 py-2 text-base bg-white border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200
                    focus:border-transparent transition-all duration-200 ease-in-out
                    placeholder:text-gray-400"
        />
        <div className="absolute translate-x-[380px] bottom-1">
          <SpeechInput onResult={onResult} currentCharaId={currentCharaId} />
        </div>
      </form>
    </div>
  );
};
