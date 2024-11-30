import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Avatar, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { characterProfiles } from "../utils/characterProfile";
import { CSSTransition } from "react-transition-group";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

type Message = {
  sender: "user" | "ai";
  text: string;
  createdAt: Date;
};

export const MemoryPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [character, setCharacter] = useState(characterProfiles[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const nodeRef = useRef(null);
  const [user] = useAtom(userAtom);

  const groupMessagesByDate = (messages: Message[]) => {
    return messages.reduce((groups: { [key: string]: Message[] }, message) => {
      const date = message.createdAt.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

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
          orderBy("createdAt", "asc"),
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

          {/* タイトル部分 */}
          <div className="flex items-center p-4 border-b mt-8">
            <IconButton onClick={() => navigate(-1)} className="mr-2">
              <ArrowBack />
            </IconButton>
            <Avatar
              src={character.imageUrl}
              sx={{ width: 32, height: 32 }}
              className="mr-3"
            />
            <h2 className="text-lg font-bold">{character.name}</h2>
          </div>

          {error && <div className="p-4 text-red-500 text-center">{error}</div>}

          {isLoading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="mt-4 mx-4 overflow-y-auto h-[600px]">
              {Object.entries(groupMessagesByDate(messages)).map(
                ([date, dateMessages]) => (
                  <div key={date}>
                    <div className="flex justify-center my-4">
                      <span className="px-4 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                        {date}
                      </span>
                    </div>
                    {dateMessages.map((message, index) => (
                      <div key={index} className="mb-4">
                        <div
                          className={`flex items-center ${
                            message.sender === "ai"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {message.sender === "ai" && (
                            <Avatar
                              src={character.imageUrl}
                              sx={{ width: 32, height: 32 }}
                              className="mr-2"
                            />
                          )}
                          <div
                            className={`p-3 rounded-2xl max-w-[75%] ${
                              message.sender === "ai"
                                ? "bg-blue-100 text-gray-700 rounded-bl-none"
                                : "bg-yellow-100 text-gray-700 rounded-br-none"
                            } shadow-sm`}
                          >
                            {message.text}
                          </div>
                          {message.sender === "user" && (
                            <Avatar
                              sx={{ width: 32, height: 32 }}
                              className="ml-2"
                              src={user?.photoURL || "/default-user-icon.png"}
                              alt="User"
                            />
                          )}
                        </div>
                        <div
                          className={`text-xs text-gray-500 mt-1 ${
                            message.sender === "ai"
                              ? "text-left ml-12"
                              : "text-right mr-12"
                          }`}
                        >
                          {message.createdAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
