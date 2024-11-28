import React from "react";

export type ProfileCardViewProps = {
  name: string;
  age: string;
  firstPerson: string;
  bloodType: string;
  birthDate: string;
  favoriteFood: string;
  club: string;
  hobbies: string;
  height: string;
  description: string;
  imageUrl: string;
  bgColor: string;
};

export const ProfileCardView: React.FC<ProfileCardViewProps> = ({
  name,
  age,
  firstPerson,
  bloodType,
  birthDate,
  favoriteFood,
  club,
  hobbies,
  height,
  description,
  imageUrl,
  bgColor,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 flex items-center justify-center">
          <img
            className="h-64 w-64 object-cover rounded-full border-4 border-gray-200 shadow-md"
            src={imageUrl}
            alt={`${name} profile`}
          />
        </div>
        <div className="p-6 md:flex-grow">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{name}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "身長", value: height },
              { label: "年齢", value: age },
              { label: "一人称", value: firstPerson },
              { label: "血液型", value: bloodType },
              { label: "誕生日", value: birthDate },
              { label: "好きな食べ物", value: favoriteFood },
              { label: "部活", value: club },
              { label: "趣味", value: hobbies },
            ].map((item) => (
              <div className="flex items-center gap-2" key={item.label}>
                <div
                  className={`p-2 rounded-full flex-1 text-center ${bgColor}`}
                >
                  <p className="text-lg text-gray-700">{item.label}:</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-lg text-gray-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-800 text-lg mb-4">{description}</p>
        </div>
      </div>
    </div>
  );
};
