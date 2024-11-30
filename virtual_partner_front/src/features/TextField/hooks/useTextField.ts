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
    onResult(submittedText, "");

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
      onResult(data.input_text, data.llm_response);

      // 音声再生の処理を追加
      if (data.audio_url) {
        const audioUrl = `http://localhost:8000${data.audio_url}`;
        const audio = new Audio(audioUrl);
        // ユーザーのインタラクション後に再生を開始
        const playAudio = async () => {
          try {
            await audio.play();
          } catch (error) {
            console.error("音声再生エラー:", error);
          }
        };
        playAudio();
      }
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
