import { useAtom } from "jotai";
import { auth, googleProvider } from "../utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { userAtom } from "../atoms/userAtom";
import { useEffect, useState } from "react";

export const useFirebase = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // 明示的にユーザー状態をクリア
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  return { user, login, register, logout, loginWithGoogle, isLoading };
};
