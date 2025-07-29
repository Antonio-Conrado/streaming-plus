import { supabase } from "../config/supabase";
import { FavoriteMedia } from "@/shared/interfaces/favoriteMedia";

export async function getFavoritesMedia(
  userId: string
): Promise<FavoriteMedia[] | null> {
  const { data, error } = await supabase
    .from("favorites_media")
    .select("*")
    .eq("user_id", userId);

  if (error) return null;

  return data;
}
