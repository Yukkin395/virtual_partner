import { useEffect, useState, useRef } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { characterProfiles } from "../utils/characterProfile";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

type ChatRoomWithCharacter = {
  id: string;
  characterId: number;
  lastMessage: string;
  lastMessageAt: Date;
  characterName: string;
  characterImage: string;
};

export const ChatRoomListPage = () => {
  const [user] = useAtom(userAtom);
  const [latestChats, setLatestChats] = useState<{
    [key: number]: ChatRoomWithCharacter;
  }>({});
  const nodeRef = useRef(null);

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

        // キャラクターごとに最新のメッセージのみを保持
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

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="flex justify-center items-center min-h-screen bg-gray-200"
      >
        <div className="w-[375px] h-[812px] bg-white rounded-3xl shadow-2xl relative">
          {/* スマホのヘッダー */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>

          {/* タイトル */}
          <div className="mt-8 p-4 border-b">
            <h1 className="text-xl font-bold text-center">思い出</h1>
          </div>
          <div className="overflow-y-auto h-[700px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="divide-y">
              {Object.values(latestChats).map((chat) => (
                <div
                  key={chat.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Link to={`/memory/${chat.id}`} className="block">
                    <div className="flex items-center">
                      <Avatar
                        src={chat.characterImage}
                        sx={{ width: 48, height: 48 }}
                        className="mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-lg text-gray-800 truncate">
                          {chat.characterName}
                        </h2>
                        <p className="text-gray-600 text-sm truncate">
                          {chat.lastMessage}
                        </p>
                        <span className="text-xs text-gray-500">
                          {chat.lastMessageAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
