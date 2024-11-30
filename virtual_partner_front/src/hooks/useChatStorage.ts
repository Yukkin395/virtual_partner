import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

interface SaveChatParams {
  inputText: string;
  llmResponse: string;
  userId: string;
  characterId: number;
}

interface ChatStorage {
  saveChat: (params: SaveChatParams) => Promise<void>;
}

export const useChatStorage = (): ChatStorage => {
  const saveChat = async ({
    inputText,
    llmResponse,
    userId,
    characterId,
  }: SaveChatParams) => {
    try {
      // 既存のチャットルームを検索
      const existingRoomQuery = query(
        collection(db, "chatRooms"),
        where("userId", "==", userId),
        where("characterId", "==", characterId)
      );
      const existingRooms = await getDocs(existingRoomQuery);

      let chatRoomId: string;

      if (existingRooms.empty) {
        // 新規チャットルーム作成
        const newRoomRef = await addDoc(collection(db, "chatRooms"), {
          userId,
          characterId,
          lastMessageAt: serverTimestamp(),
          lastMessage: llmResponse,
        });
        chatRoomId = newRoomRef.id;
      } else {
        // 既存のチャットルームを更新
        const roomDoc = existingRooms.docs[0];
        chatRoomId = roomDoc.id;
        await updateDoc(roomDoc.ref, {
          lastMessageAt: serverTimestamp(),
          lastMessage: llmResponse,
        });
      }

      // メッセージを保存
      await addDoc(collection(db, "messages"), {
        chatRoomId,
        userId,
        characterId,
        text: inputText,
        response: llmResponse,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("チャット保存エラー:", error);
      throw error;
    }
  };

  return { saveChat };
};
