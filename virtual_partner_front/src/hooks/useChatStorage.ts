import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";

interface ChatStorage {
  saveChat: (params: {
    inputText: string;
    llmResponse: string;
    userId: string;
    characterId: number;
  }) => Promise<void>;
}

export const useChatStorage = (): ChatStorage => {
  const saveChat = async ({
    inputText,
    llmResponse,
    userId,
    characterId,
  }: {
    inputText: string;
    llmResponse: string;
    userId: string;
    characterId: number;
  }) => {
    try {
      const chatRoomRef = collection(db, "chatRooms");
      const messagesRef = collection(db, "messages");

      const chatRoomDoc = await addDoc(chatRoomRef, {
        userId,
        characterId,
        lastMessageAt: serverTimestamp(),
        lastMessage: llmResponse,
      });

      await addDoc(messagesRef, {
        chatRoomId: chatRoomDoc.id,
        userId,
        characterId,
        text: inputText,
        response: llmResponse,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("チャット保存エラー:", error);
    }
  };

  return { saveChat };
};
