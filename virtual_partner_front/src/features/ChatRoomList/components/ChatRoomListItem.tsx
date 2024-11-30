import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import type { ChatRoomWithCharacter } from "../types/chatRoom";

type ChatRoomListItemProps = {
  chat: ChatRoomWithCharacter;
};

export const ChatRoomListItem = ({ chat }: ChatRoomListItemProps) => (
  <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
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
          <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
          <span className="text-xs text-gray-500">
            {chat.lastMessageAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  </div>
);
