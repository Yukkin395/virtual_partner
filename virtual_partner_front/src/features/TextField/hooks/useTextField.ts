import { useState } from "react";

export const useTextField = (
  onResult: (transcribedText: string, llmResponse: string) => void,
  currentCharaId: number
) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      const audioUrl = `http://localhost:8000${data.audio_url}`;
      const audio = new Audio(audioUrl);
      audio.play();

      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    inputValue,
    setInputValue,
    handleSubmit,
  };
};
