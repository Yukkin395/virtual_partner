import { CreateProfileView } from "./CreateProfileView";
import { useCreateProfile } from "../hooks/useCreateProfile";

export const CreateProfileContainer = () => {
  const {
    nickname,
    setNickname,
    isLoading,
    error,
    handleSubmit,
    handleFileChange,
  } = useCreateProfile();

  return (
    <CreateProfileView
      nickname={nickname}
      setNickname={setNickname}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
      error={error}
    />
  );
};
