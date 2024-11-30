import { BackgroundSelector } from "../../BackgroundSelector";
import { Live2DModelComponent } from "../../Live2D/components/Live2DModelComponent";
import { ModelSelector } from "../../Live2D/components/ModelSelector";
import { NicoNicoView } from "../../Niconico";

import { TalkBoxView } from "../../TalkBox/TalkBoxView";
import { TextField } from "../../TextField";
import { ThinkingBox } from "./ThinkingBox";

type HomeViewProps = {
  modelPath: string;
  charaId: number;
  llmResponse: string | null;
  comments: string[];
  onResult: (inputText: string, llmResponse: string) => void;
  isThinking: boolean;
};

export const HomeView: React.FC<HomeViewProps> = ({
  modelPath,
  charaId,
  llmResponse,
  comments,
  onResult,
  isThinking,
}) => {
  return (
    <div className="relative min-h-screen">
      <Live2DModelComponent modelPath={modelPath} />
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 flex justify-center items-center animate-fadeIn">
        {isThinking && <ThinkingBox />}
      </div>
      <div className="absolute bottom-96 left-1/2 transform -translate-x-[60%] w-full max-w-md z-40 flex items-center space-x-12 animate-fadeIn">
        {llmResponse && <TalkBoxView message={llmResponse} />}
      </div>
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 flex items-center space-x-12">
        <BackgroundSelector />
        <ModelSelector />
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
        <TextField
          placeholder="テキストを入力してください"
          onResult={onResult}
          currentCharaId={charaId}
        />
      </div>
      <div className="absolute inset-0">
        <NicoNicoView Comments={comments} />
      </div>
    </div>
  );
};
