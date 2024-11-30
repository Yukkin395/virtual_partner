import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtom";
import { characterProfiles } from "../../../utils/characterProfile";
import { ChatRoomWithCharacter } from "../types/chatRoom";
import { ChatRoomListView } from "./ChatRoomListView";

export const ChatRoomListContainer = () => {
  const [user] = useAtom(userAtom);
  const [latestChats, setLatestChats] = useState<{
    [key: number]: ChatRoomWithCharacter;
  }>({});

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (!user) return;

      const chatRoomRef = collection(db, "chatRooms");
      const q = query(
        chatRoomRef,
        where("userId", "==", user.uid),
        orderBy("lastMessageAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const latestMessages: { [key: number]: ChatRoomWithCharacter } = {};

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const character = characterProfiles[data.characterId];

        if (!latestMessages[data.characterId] && character) {
          latestMessages[data.characterId] = {
            id: doc.id,
            characterId: data.characterId,
            lastMessage: data.lastMessage,
            lastMessageAt: data.lastMessageAt.toDate(),
            characterName: character.name,
            characterImage: character.imageUrl,
          };
        }
      });

      setLatestChats(latestMessages);
    };

    fetchChatRooms();
  }, [user]);

  return <ChatRoomListView chats={Object.values(latestChats)} />;
};
