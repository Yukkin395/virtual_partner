import { atom } from "jotai";
import type { User } from "firebase/auth";

export const userAtom = atom<User | null>(null);
