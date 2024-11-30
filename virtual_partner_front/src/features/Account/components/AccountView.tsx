import { Logout } from "@mui/icons-material";
import type { User } from "firebase/auth";
import { Button } from "../../../components/Button/Button";
import { useAtom } from "jotai";
import { backgroundImageAtom } from "../../../atoms/backgroundAtom";

type AccountViewProps = {
  user: User | null;
  nickname: string;
  isEditing: boolean;
  isLoading: boolean;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onEditingToggle: () => void;
  onLogout: () => void;
};

export const AccountView = ({
  user,
  nickname,
  isEditing,
  isLoading,
  onNicknameChange,
  onFileChange,
  onSubmit,
  onEditingToggle,
  onLogout,
}: AccountViewProps) => {
  const [backgroundImage] = useAtom(backgroundImageAtom);
  if (!user) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md px-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* ヘッダー */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">アカウント設定</h1>
          </div>

          {/* コンテンツ */}
          <div className="p-6 space-y-6">
            {isEditing ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    プロフィール画像
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="w-full text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    ニックネーム
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={onNicknameChange}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-full"
                  >
                    {isLoading ? "更新中..." : "保存"}
                  </Button>
                  <Button
                    type="button"
                    onClick={onEditingToggle}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-full"
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="プロフィール画像"
                      className="w-16 h-16 rounded-full border-2 border-gray-600"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">
                        {user.displayName?.[0] || "U"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {user.displayName}
                    </h2>
                    <p className="text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={onEditingToggle}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    プロフィールを編集
                  </Button>
                  <Button
                    onClick={onLogout}
                    className="w-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center space-x-2"
                  >
                    <Logout sx={{ fontSize: 20 }} />
                    <span>ログアウト</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
