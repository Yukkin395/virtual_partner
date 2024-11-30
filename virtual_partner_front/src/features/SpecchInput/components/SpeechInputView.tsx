import React from "react";
import { Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

type SpeechInputViewProps = {
  recording: boolean;
  onRecordingClick: () => void;
};

export const SpeechInputView: React.FC<SpeechInputViewProps> = ({
  recording,
  onRecordingClick,
}) => {
  return (
    <div>
      <Button
        variant="outlined"
        color={recording ? "secondary" : "primary"}
        onClick={onRecordingClick}
      >
        <MicIcon style={{ color: recording ? "red" : "inherit" }} />
      </Button>
    </div>
  );
};
