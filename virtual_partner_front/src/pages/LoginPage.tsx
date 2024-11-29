import LoginContainer from "../features/Login/components/LoginContainer";
import { useLogin } from "../features/Login/hooks/useLogin";

export const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleGoogleLogin,
    isRegistering,
    setIsRegistering,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginContainer
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLogin}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
      />
    </div>
  );
};
