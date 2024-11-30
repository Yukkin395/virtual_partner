import React from "react";
import { Google } from "@mui/icons-material";

interface LoginViewProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  error?: string;
  isLoading?: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  handleGoogleLogin,
  isRegistering,
  setIsRegistering,
  error,
  isLoading = false,
}) => {
  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        {isRegistering ? "新規登録" : "ようこそ"}
      </h2>
      <p className="text-center mb-6 text-gray-500">
        VirtualPartnerを使用するには、{isRegistering ? "登録" : "ログイン"}
        してください。
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
            required
            minLength={6}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
              処理中...
            </span>
          ) : isRegistering ? (
            "登録"
          ) : (
            "続ける"
          )}
        </button>
      </form>
      <div className="text-center mt-4">
        <a href="#" className="text-blue-600 text-sm hover:underline">
          パスワードをお忘れですか？
        </a>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">または</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full py-3 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Google className="mr-2" />
        Googleで続ける
      </button>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={isLoading}
          className="text-blue-600 text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRegistering
            ? "既にアカウントをお持ちですか？ログイン"
            : "新規登録はこちら"}
        </button>
      </div>
    </div>
  );
};
