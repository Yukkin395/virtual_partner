import React from "react";
import { Google } from "@mui/icons-material";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  handleGoogleLogin,
  isRegistering,
  setIsRegistering,
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold"
        >
          {isRegistering ? "登録" : "続ける"}
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
        className="w-full py-3 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all"
      >
        <Google className="mr-2" />
        Googleで続ける
      </button>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-600 text-sm hover:underline"
        >
          {isRegistering
            ? "既にアカウントをお持ちですか？ログイン"
            : "新規登録はこちら"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
