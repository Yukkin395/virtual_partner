import { useState, useRef } from "react";

export const useSpeechRecorder = (
  onResult: (transcribedText: string, llmResponse: string) => void,
  currentCharaId: number
) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleRecording = async () => {
    if (recording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        formData.append("chara_id", currentCharaId.toString());

        try {
          const response = await fetch(
            "http://localhost:8000/chat_with_voice/",
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) throw new Error("アップロードに失敗しました");

          const data = await response.json();
          onResult(data.input_text, data.llm_response);

          const audioUrl = `http://localhost:8000${data.audio_url}`;
          const audio = new Audio(audioUrl);
          audio.play();
        } catch (error) {
          console.error("アップロードエラー:", error);
        }
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  return {
    recording,
    audioURL,
    handleRecording,
  };
};
