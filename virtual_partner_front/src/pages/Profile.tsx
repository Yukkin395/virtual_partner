import { useState } from "react";
import { characterProfiles } from "../utils/characterProfile";
import {
  ProfileCardView,
  ProfileCardViewProps,
} from "../features/ProfileCard/ProfileCardView";

export const Profile = () => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<ProfileCardViewProps | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        キャラクタープロフィール
      </h1>
      <div className="grid grid-cols-3 gap-2">
        {characterProfiles.map((character) => (
          <div
            key={character.name}
            className="p-4 border rounded-3xl flex flex-col items-center shadow-xl justify-center cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedCharacter(character)}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="h-32 w-32 object-cover rounded-full border-4 border-gray-300 shadow-lg"
            />
            <p className="text-center mt-2 text-lg font-semibold">
              {character.name}
            </p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-3xl w-full">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedCharacter(null)}
            >
              ×
            </button>
            <ProfileCardView {...selectedCharacter} />
          </div>
        </div>
      )}
    </div>
  );
};
