import { AccountView } from "./AccountView";
import { useAccount } from "../hooks/useAccount";

export const AccountContainer = () => {
  const {
    user,
    nickname,
    isEditing,
    isLoading,
    handleLogout,
    handleFileChange,
    handleSubmit,
    setNickname,
    setIsEditing,
  } = useAccount();

  return (
    <AccountView
      user={user}
      nickname={nickname}
      isEditing={isEditing}
      isLoading={isLoading}
      onNicknameChange={(e) => setNickname(e.target.value)}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      onEditingToggle={() => setIsEditing(!isEditing)}
      onLogout={handleLogout}
    />
  );
};
