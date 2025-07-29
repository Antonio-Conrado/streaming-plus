import { StateCreator } from "zustand";

export type UserState = {
  user: { id: string; name: string } | null;
  setUser: (userId: string, userName: string) => void;
  clearUser: () => void;
};

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (userId, userName) => set({ user: { id: userId, name: userName } }),
  clearUser: () => set({ user: null }),
});
