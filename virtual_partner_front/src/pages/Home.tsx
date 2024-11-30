import { TextField } from "../components/TextField";
import { BackgroundSelector } from "../features/BackgroundSelector";
import { Live2DModelComponent } from "../features/Live2D/components/Live2DModelComponent";
import { ModelSelector } from "../features/Live2D/components/ModelSelector";
import { useAtom } from "jotai";
import { live2dModelAtom } from "../atoms/modelAtom";
import { NicoNicoView } from "../features/Niconico/NiconicoView";
import { mockComments } from "../features/Niconico/const";
import { TalkBoxView } from "../features/TalkBox/TalkBoxView";
import { useState } from "react";
import SpeechInput from "../features/SpecchInput/SpeechInput";

export const Home = () => {
  const [modelPath] = useAtom(live2dModelAtom);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);

  const handleResult = (transcribedText: string, llmResponse: string) => {
    setTranscribedText(transcribedText);
    setLlmResponse(llmResponse);
  };

  return (
    <div className="relative min-h-screen">
      <Live2DModelComponent modelPath={modelPath} />
      <div className="absolute bottom-96 left-1/2 transform -translate-x-[60%] w-full max-w-md z-40 flex items-center space-x-12 animate-fadeIn">
        {llmResponse && <TalkBoxView message={llmResponse || ""} />}
      </div>
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 flex items-center space-x-12">
        <BackgroundSelector />
        <ModelSelector />
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
        <TextField
          placeholder="テキストを入力してください"
          onResult={handleResult}
        />
      </div>
      <div className="absolute inset-0">
        <NicoNicoView Comments={mockComments} />
      </div>
    </div>
  );
};
