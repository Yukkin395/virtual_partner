import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IconButton, Avatar } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MessageList } from "./MessageList";
import type { Message } from "../types/message";
import type { User } from "firebase/auth";
import type { CharacterProfile } from "../../../types/character";

type MemoryViewProps = {
  messages: Message[];
  character: CharacterProfile;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  onBack: () => void;
};

export const MemoryView = ({
  messages,
  character,
  isLoading,
  error,
  user,
  onBack,
}: MemoryViewProps) => {
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
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>

          <div className="flex items-center p-4 border-b mt-8">
            <IconButton onClick={onBack} className="mr-2">
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
            <MessageList
              messages={messages}
              character={character}
              user={user}
            />
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
