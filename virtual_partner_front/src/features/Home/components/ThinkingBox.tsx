export const ThinkingBox = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md animate-pulse z-50">
      <div className="flex space-x-2 items-center">
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "600ms" }}
        />
      </div>
    </div>
  );
};
