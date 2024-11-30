import { Avatar } from "@mui/material";
import type { Message } from "../types/message";
import type { User } from "firebase/auth";
import type { CharacterProfile } from "../../../types/character";

type MessageItemProps = {
  message: Message;
  character: CharacterProfile;
  user: User | null;
};

export const MessageItem = ({ message, character, user }: MessageItemProps) => (
  <div className="mb-4">
    <div
      className={`flex items-center ${
        message.sender === "ai" ? "justify-start" : "justify-end"
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
        message.sender === "ai" ? "text-left ml-12" : "text-right mr-12"
      }`}
    >
      {message.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
);
