import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice, UserState } from "./userSlice";
import {
  createFavoritesMediaSlice,
  FavoritesMediaState,
} from "./favoritesMediaSlice";

type Store = UserState & FavoritesMediaState;

export const useStore = create<Store>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
    ...createFavoritesMediaSlice(...a),
  }))
);
