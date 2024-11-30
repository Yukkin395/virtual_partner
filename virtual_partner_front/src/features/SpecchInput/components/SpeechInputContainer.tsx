import React from "react";
import { useSpeechRecorder } from "../hooks/useSpeechRecorder";
import { SpeechInputView } from "./SpeechInputView";

type SpeechInputContainerProps = {
  onResult: (transcribedText: string, llmResponse: string) => void;
  currentCharaId: number;
};

export const SpeechInputContainer: React.FC<SpeechInputContainerProps> = ({
  onResult,
  currentCharaId,
}) => {
  const { recording, handleRecording } = useSpeechRecorder(
    onResult,
    currentCharaId
  );

  return (
    <SpeechInputView recording={recording} onRecordingClick={handleRecording} />
  );
};
