import React, { useState } from "react";
import { SpeechInput } from "../../features/SpecchInput";

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
  const [inputValue, setInputValue] = useState("");

  // フォーム送信のハンドラ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力フィールドの値を取得
    if (!inputValue.trim()) return;

    try {
      const formData = new FormData();
      formData.append("text", inputValue);
      formData.append("chara_id", currentCharaId.toString());

      const response = await fetch("http://localhost:8000/chat_with_voice/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      onResult(data.input_text, data.llm_response);

      // 音声を再生
      const audioUrl = `http://localhost:8000${data.audio_url}`;
      const audio = new Audio(audioUrl);
      audio.play();

      // 入力フィールドをクリア
      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 入力フィールドの変更時のハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      {label && <label className="text-md font-medium px-1">{label}</label>}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
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
