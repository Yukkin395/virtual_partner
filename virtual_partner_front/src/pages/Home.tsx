import { TextField } from "../components/TextField";
import { BackgroundSelector } from "../features/BackgroundSelector";
import { Live2DModelComponent } from "../features/Live2D/components/Live2DModelComponent";
import { ModelSelector } from "../features/Live2D/components/ModelSelector";
import { useAtom } from "jotai";
import { live2dModelAtom } from "../atoms/modelAtom";
import { NicoNicoView } from "../features/Niconico/NiconicoView";
import { TalkBoxView } from "../features/TalkBox/TalkBoxView";
import { useEffect, useState } from "react";
import { generateComments } from "../features/Niconico/generateComment";

export const Home = () => {
  const [modelPath] = useAtom(live2dModelAtom);
  const [inputText, setInputText] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);

  const handleResult = (inputText: string, llmResponse: string) => {
    setInputText(inputText);
    setLlmResponse(llmResponse);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (inputText) {
        // inputText が存在する場合のみ実行
        const generatedComments = await generateComments(inputText);
        setComments(generatedComments);
      }
    };

    fetchComments();
  }, [inputText]); // inputText を依存配列に追加

  return (
    <div className="relative min-h-screen">
      <Live2DModelComponent modelPath={modelPath} />
      <div className="absolute bottom-96 left-1/2 transform -translate-x-[60%] w-full max-w-md z-40 flex items-center space-x-12 animate-fadeIn">
        {llmResponse && <TalkBoxView message={llmResponse || ""} />}
        {inputText && <TalkBoxView message={inputText || ""} />}
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
        {inputText && <p className="text-white text-center">{comments}</p>}
      </div>
      <div className="absolute inset-0">
        <NicoNicoView Comments={comments} />
      </div>
    </div>
  );
};
