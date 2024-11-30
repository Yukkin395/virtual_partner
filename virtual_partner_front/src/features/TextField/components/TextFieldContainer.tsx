import React from "react";

import { useTextField } from "../hooks/useTextField";
import { TextFieldView } from "./TextFiledView";

type TextFieldContainerProps = {
  label?: string;
  placeholder: string;
  onResult: (transcribedText: string, llmResponse: string) => void;
  currentCharaId: number;
};

export const TextFieldContainer: React.FC<TextFieldContainerProps> = ({
  label,
  placeholder,
  onResult,
  currentCharaId,
}) => {
  const { inputValue, setInputValue, handleSubmit } = useTextField(
    onResult,
    currentCharaId
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <TextFieldView
      label={label}
      placeholder={placeholder}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onResult={onResult}
      currentCharaId={currentCharaId}
    />
  );
};
