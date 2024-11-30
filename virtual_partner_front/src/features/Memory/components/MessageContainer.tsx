import { useMemo } from "react";
import type { Message } from "../types/message";
import type { User } from "firebase/auth";
import type { CharacterProfile } from "../../../types/character";
import { MessageView } from "./MessageView";

type MessageListContainerProps = {
  messages: Message[];
  character: CharacterProfile;
  user: User | null;
};

export const MessageListContainer = ({
  messages,
  character,
  user,
}: MessageListContainerProps) => {
  const groupedMessages = useMemo(() => {
    return messages.reduce((groups: { [key: string]: Message[] }, message) => {
      const date = message.createdAt.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  }, [messages]);

  return (
    <MessageView
      groupedMessages={groupedMessages}
      character={character}
      user={user}
    />
  );
};
