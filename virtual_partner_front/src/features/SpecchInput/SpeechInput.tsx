import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

const SpeechInput: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleRecording = async () => {
    if (recording) {
      // 録音停止
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    } else {
      // 録音開始
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

        // サーバーに音声ファイルを送信
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");

        try {
          const response = await fetch(
            "http://localhost:8000/chat_with_voice/",
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            throw new Error("アップロードに失敗しました");
          }
          const data = await response.json();
          setTranscribedText(data.transcribed_text);
          setLlmResponse(data.llm_response);

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

  return (
    <div>
      <Button
        variant="outlined"
        color={recording ? "secondary" : "primary"}
        onClick={handleRecording}
      >
        <MicIcon style={{ color: recording ? "red" : "inherit" }} />{" "}
      </Button>
      {transcribedText && <p>Transcribed Text: {transcribedText}</p>}
      {llmResponse && <p>LLM Response: {llmResponse}</p>}
    </div>
  );
};

export default SpeechInput;
