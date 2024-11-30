import type { Message } from "../types/message";
import type { User } from "firebase/auth";
import type { CharacterProfile } from "../../../types/character";
import { MessageItem } from "./MessageItem";

type MessageViewProps = {
  groupedMessages: { [key: string]: Message[] };
  character: CharacterProfile;
  user: User | null;
};

export const MessageView = ({
  groupedMessages,
  character,
  user,
}: MessageViewProps) => (
  <div className="mt-4 mx-4 overflow-y-auto h-[600px]">
    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
      <div key={date}>
        <div className="flex justify-center my-4">
          <span className="px-4 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
            {date}
          </span>
        </div>
        {dateMessages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            character={character}
            user={user}
          />
        ))}
      </div>
    ))}
  </div>
);
