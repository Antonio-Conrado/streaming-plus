import { FavoriteMedia } from "@/shared/interfaces/favoriteMedia";
import { StateCreator } from "zustand";

export type FavoritesMediaState = {
  favoritesMedia: FavoriteMedia[];
  setFavoritesMedia: (favorites: FavoriteMedia[]) => void;
  clearFavoritesMedia: () => void;
};

export const createFavoritesMediaSlice: StateCreator<FavoritesMediaState> = (
  set
) => ({
  favoritesMedia: [],
  setFavoritesMedia: (favorites) => set({ favoritesMedia: favorites }),
  clearFavoritesMedia: () => set({ favoritesMedia: [] }),
});
