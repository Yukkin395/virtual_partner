import { useState } from "react";

export const useTextField = (
  onResult: (transcribedText: string, llmResponse: string) => void,
  currentCharaId: number
) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const submittedText = inputValue;
    setInputValue("");

    // 送信直前にコールバック実行
    onResult(submittedText, ""); // 空のレスポンスを送信

    try {
      const formData = new FormData();
      formData.append("text", submittedText);
      formData.append("chara_id", currentCharaId.toString());

      const response = await fetch("http://localhost:8000/chat_with_voice/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      onResult(data.input_text, data.llm_response); // レスポンス受信後に再度コールバック
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
