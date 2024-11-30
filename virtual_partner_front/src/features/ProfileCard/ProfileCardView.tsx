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
  onClose?: () => void;
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
  onClose,
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="md:flex p-6 gap-8">
        <div className="md:flex-shrink-0 flex items-center justify-center mb-6 md:mb-0">
          <img
            className="h-64 w-64 object-cover rounded-full border-4 border-gray-200 shadow-md"
            src={imageUrl}
            alt={`${name} profile`}
          />
        </div>
        <div className="flex-grow">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-gray-900">{name}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
              <div
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                key={item.label}
              >
                <div
                  className={`px-3 py-2 rounded-md flex-1 text-center ${bgColor}`}
                >
                  <p className="text-sm font-medium text-gray-700">
                    {item.label}
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-800 text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};
