import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtom";
import { characterProfiles } from "../../../utils/characterProfile";
import type { Message } from "../types/message";
import { MemoryView } from "./MemoryView";

export const MemoryContainer = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [character, setCharacter] = useState(characterProfiles[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return;
      setIsLoading(true);
      setError(null);

      try {
        const chatRoomSnapshot = await getDocs(
          query(collection(db, "chatRooms"), where("__name__", "==", roomId))
        );
        const chatRoomData = chatRoomSnapshot.docs[0]?.data();

        if (chatRoomData) {
          const characterId = chatRoomData.characterId;
          const character = characterProfiles.find((c) => c.id === characterId);

          if (character) {
            setCharacter(character);
          }
        }

        const messagesRef = collection(db, "messages");
        const q = query(
          messagesRef,
          where("chatRoomId", "==", roomId),
          orderBy("createdAt", "desc"),
          limit(30)
        );

        const querySnapshot = await getDocs(q);
        const msgs = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return [
              {
                sender: "user" as const,
                text: data.text,
                createdAt: data.createdAt.toDate(),
              },
              {
                sender: "ai" as const,
                text: data.response,
                createdAt: data.createdAt.toDate(),
              },
            ];
          })
          .flat()
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        setMessages(msgs);
      } catch (err) {
        setError("メッセージの取得に失敗しました");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  return (
    <MemoryView
      messages={messages}
      character={character}
      isLoading={isLoading}
      error={error}
      user={user}
      onBack={() => navigate(-1)}
    />
  );
};
