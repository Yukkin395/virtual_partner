import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { characterIdAtom, live2dModelAtom } from "../../../atoms/modelAtom";
import { generateComments } from "../../Niconico";
import { userAtom } from "../../../atoms/userAtom";
import { useChatStorage } from "../../../hooks/useChatStorage";

export const useHome = () => {
  const [modelPath] = useAtom(live2dModelAtom);
  const [charaId] = useAtom(characterIdAtom);
  const [user] = useAtom(userAtom);
  const [inputText, setInputText] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);

  const { saveChat } = useChatStorage();

  const handleResult = async (inputText: string, llmResponse: string) => {
    setInputText(inputText);
    setLlmResponse(llmResponse);
    if (user) {
      await saveChat({
        inputText,
        llmResponse,
        userId: user.uid,
        characterId: charaId,
      });
    }
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
