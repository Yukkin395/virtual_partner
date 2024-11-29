type CreateProfileViewProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const CreateProfileView = ({
  nickname,
  setNickname,
  isLoading,
  handleSubmit,
  handleFileChange,
  error,
}: CreateProfileViewProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              プロフィール作成
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                ニックネーム
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="ニックネームを入力"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                プロフィール画像
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  作成中...
                </span>
              ) : (
                "プロフィールを作成"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
