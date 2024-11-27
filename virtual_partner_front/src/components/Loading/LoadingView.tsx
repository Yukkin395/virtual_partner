export const LoadingView = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-custom-image bg-white z-50">
      <div className="w-32 h-32 border-8 border-gray-200 border-t-8 border-t-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
};