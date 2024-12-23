import { Login } from "../features/Login";
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
      <Login
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
