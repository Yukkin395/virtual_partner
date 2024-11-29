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
import { useEffect } from "react";

export const useFirebase = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  return { user, login, register, logout, loginWithGoogle };
};
