"use client";
import { toggleFavorite } from "@/app/(public)/_actions/favorites/toggleFavorite-action";
import { useStore } from "@/lib/store/useStore";
import { getFavoritesMedia } from "@/lib/supabase/favorites-media";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";

const initialState = {
  message: "",
  isSuccess: false,
};

type Props = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function FavoriteMedia({
  id,
  title,
  poster_path,
  vote_average,
}: Props) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const favoritesMedia = useStore((state) => state.favoritesMedia);
  const isFavorite = favoritesMedia.some((item) => item.media_id === id);
  const setFavoritesMedia = useStore((state) => state.setFavoritesMedia);

  const [state, formAction] = useActionState(toggleFavorite, initialState);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("mediaId", id.toString());
    formData.append("title", title ?? "");
    formData.append("poster_path", poster_path ?? "");
    formData.append("vote_average", vote_average.toString());

    startTransition(async () => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.isSuccess && user) {
      getFavoritesMedia(user.id).then((data) => {
        if (data) setFavoritesMedia(data);
      });
    }
  }, [state]);

  return (
    <>
      {isFavorite ? (
        <button
          onClick={handleClick}
          className="btn btn-success w-fit rounded-lg mx-auto"
        >
          Favorito
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="btn btn-secondary  w-fit rounded-lg mx-auto"
        >
          Agregar a favorito
        </button>
      )}
    </>
  );
}
