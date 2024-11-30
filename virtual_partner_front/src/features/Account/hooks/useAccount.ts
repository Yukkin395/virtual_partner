import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtom";
import { useLogin } from "../../Login/hooks/useLogin";
import { db, storage } from "../../../utils/firebase";

export const useAccount = () => {
  const [user] = useAtom(userAtom);
  const { logout, updateUser } = useLogin();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.displayName || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let newIconUrl = user.photoURL;

      // 画像がアップロードされた場合
      if (selectedFile) {
        const storageRef = ref(storage, `users/${user.uid}/profile`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        newIconUrl = await getDownloadURL(snapshot.ref);
      }

      // Firestoreのユーザー情報を更新
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        nickname,
        iconUrl: newIconUrl,
      });

      updateUser({
        displayName: nickname,
        photoURL: newIconUrl || "",
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    user,
    nickname,
    isEditing,
    isLoading,
    handleLogout,
    handleFileChange,
    handleSubmit,
    setNickname,
    setIsEditing,
  };
};
