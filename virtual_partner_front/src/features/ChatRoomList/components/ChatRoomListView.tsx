import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ChatRoomListItem } from "./ChatRoomListItem";
import type { ChatRoomWithCharacter } from "../types/chatRoom";

type ChatRoomListViewProps = {
  chats: ChatRoomWithCharacter[];
};

export const ChatRoomListView = ({ chats }: ChatRoomListViewProps) => {
  const nodeRef = useRef(null);

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
              {chats.map((chat) => (
                <ChatRoomListItem key={chat.id} chat={chat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
