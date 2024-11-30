import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { characterIdAtom, live2dModelAtom } from "../../../atoms/modelAtom";
import { generateComments } from "../../Niconico";

export const useHome = () => {
  const [modelPath] = useAtom(live2dModelAtom);
  const [charaId] = useAtom(characterIdAtom);
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
        const generatedComments = await generateComments(inputText);
        setComments(generatedComments);
      }
    };

    fetchComments();
  }, [inputText]);

  return {
    modelPath,
    charaId,
    llmResponse,
    comments,
    handleResult,
  };
};
