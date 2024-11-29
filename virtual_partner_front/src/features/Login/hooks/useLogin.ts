import { useState } from "react";
import { useFirebase } from "../../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login, loginWithGoogle, register, logout } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (isRegistering) {
      await register(email, password);
      navigate("/");
    } else {
      await login(email, password);
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Googleログインエラー:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleGoogleLogin,
    isRegistering,
    setIsRegistering,
    logout: handleLogout,
  };
};
