import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useFormValidation } from "../hooks/useFormValidataion";

interface LoginContainerProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
}

const LoginContainer: React.FC<LoginContainerProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit: handleLoginSubmit,
  handleGoogleLogin,
  isRegistering,
  setIsRegistering,
}) => {
  const { validateEmail, validatePassword } = useFormValidation();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await handleLoginSubmit(e);
    } catch (error) {
      setError("ログインに失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleGoogleLogin={handleGoogleLogin}
      isRegistering={isRegistering}
      setIsRegistering={setIsRegistering}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default LoginContainer;
