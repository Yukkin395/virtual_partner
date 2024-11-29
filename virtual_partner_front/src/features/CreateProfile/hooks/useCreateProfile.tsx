import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtom";
import { db, storage } from "../../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useCreateProfile = () => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [nickname, setNickname] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!nickname.trim()) {
      setError("ニックネームを入力してください");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let iconUrl = "";
      if (selectedFile) {
        const fileRef = ref(storage, `users/${user.uid}/icon.png`);
        await uploadBytes(fileRef, selectedFile);
        iconUrl = await getDownloadURL(fileRef);
      }

      // プロフィールデータを作成
      await setDoc(doc(db, "users", user.uid), {
        nickname: nickname.trim(),
        iconUrl,
        createdAt: new Date().toISOString(),
      });

      // クエリパラメータ付きでホームページに遷移
      navigate("/?profile=created", { replace: true });
    } catch (error) {
      console.error("プロフィール作成エラー:", error);
      setError("プロフィールの作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB制限
        setError("ファイルサイズは5MB以下にしてください");
        return;
      }
      setSelectedFile(file);
    }
  };

  return {
    nickname,
    setNickname,
    isLoading,
    error,
    handleSubmit,
    handleFileChange,
  };
};
