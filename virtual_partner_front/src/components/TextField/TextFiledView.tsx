type TextFieldViewProps = {
  label: string;
  placeholder: string;
};

export const TextFieldView = ({ label, placeholder }: TextFieldViewProps) => {
  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <label className="text-md font-medium px-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-2 py-2 text-base bg-white border
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBCA4D]
                    focus:border-transparent transition-all duration-200 ease-in-out
                  placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};
