import { HomeView } from "./HomeView";
import { useHome } from "../hooks/useHome";

export const HomeContainer = () => {
  const {
    modelPath,
    charaId,
    llmResponse,
    comments,
    handleResult,
    isThinking,
    isSpeechProcessing,
  } = useHome();

  return (
    <HomeView
      modelPath={modelPath}
      charaId={charaId}
      llmResponse={llmResponse}
      comments={comments}
      onResult={handleResult}
      isThinking={isThinking || isSpeechProcessing}
    />
  );
};
