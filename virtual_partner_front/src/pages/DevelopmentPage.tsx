import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { useLogin } from "../features/Login/hooks/useLogin";

export const DevelopmentPage = () => {
  const [user] = useAtom(userAtom);
  const { logout } = useLogin();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {user && (
        <>
          <p>ようこそ、{user.displayName}さん！</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            ログアウト
          </button>
        </>
      )}
    </>
  );
};
