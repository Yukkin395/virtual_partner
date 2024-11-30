import React from "react";
import { Google } from "@mui/icons-material";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { Divider } from "../../../components/Divder/Divider";

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
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          disabled={isLoading}
          required
          minLength={6}
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Button type="submit" isLoading={isLoading}>
          {isRegistering ? "登録" : "続ける"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <a href="#" className="text-blue-600 text-sm hover:underline">
          パスワードをお忘れですか？
        </a>
      </div>

      <Divider>または</Divider>

      <Button variant="google" onClick={handleGoogleLogin} disabled={isLoading}>
        <Google className="mr-2" />
        Googleで続ける
      </Button>

      <div className="text-center mt-4">
        <Button
          variant="secondary"
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={isLoading}
        >
          {isRegistering
            ? "既にアカウントをお持ちですか？ログイン"
            : "新規登録はこちら"}
        </Button>
      </div>
    </div>
  );
};
