"use server";
import { supabase } from "@/lib/config/supabase";

type InitialState = {
  message: string;
  isSuccess: boolean;
};

export async function toggleFavorite(
  prevState: InitialState,
  formData: FormData
) {
  const user_id = formData.get("userId");
  const media_id = Number(formData.get("mediaId"));
  const title = formData.get("title");
  const poster_path = formData.get("poster_path");
  const vote_average = Number(formData.get("vote_average"));

  const { data: existingFavorite } = await supabase
    .from("favorites_media")
    .select("*")
    .eq("user_id", user_id)
    .eq("media_id", media_id)
    .single();

  if (existingFavorite) {
    const { error: deleteError } = await supabase
      .from("favorites_media")
      .delete()
      .eq("id", existingFavorite.id);

    if (deleteError) {
      return {
        message: "Error al eliminar favorito",
        isSuccess: false,
      };
    }

    return {
      message: "Favorito eliminado",
      isSuccess: true,
    };
  }

  const { error: insertError } = await supabase.from("favorites_media").insert({
    user_id,
    media_id,
    title,
    poster_path,
    vote_average,
  });

  if (insertError) {
    return {
      message: "Error al agregar favorito: " + insertError.message,
      isSuccess: false,
    };
  }

  return {
    message: "Agregado a favoritos",
    isSuccess: true,
  };
}
