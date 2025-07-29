"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { toggleFavorite } from "@/app/(public)/_actions/favorites/toggleFavorite-action";
import { Heart } from "lucide-react";
import { Media } from "../interfaces/mediaInformation";
import { useStore } from "@/lib/store/useStore";
import { useRouter } from "next/navigation";
import { getFavoritesMedia } from "@/lib/supabase/favorites-media";
import { User } from "../interfaces/user";

const initialState = {
  message: "",
  isSuccess: false,
};

type CardProps<T extends Media> = {
  data: T;
  isFavorite: boolean;
  user: User;
};

export default function AddFavorite<T extends Media>({
  data,
  isFavorite,
  user,
}: CardProps<T>) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);
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
    formData.append("mediaId", data.id.toString());
    formData.append("title", data.title ?? data.name ?? "Sin título");
    formData.append("poster_path", data.poster_path ?? "");
    formData.append("vote_average", data.vote_average.toString());

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.isSuccess && user) {
      getFavoritesMedia(user.id).then((data) => {
        if (data) setFavoritesMedia(data);
      });
    }
  }, [state.isSuccess]);

  useEffect(() => {
    if (state.isSuccess && state.message) {
      setToastSuccess(true);
      setToastMessage(state.message);
      router.refresh();
      const timer = setTimeout(() => {
        setToastSuccess(false);
        setToastMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="absolute top-2 right-2 text-red-500 cursor-pointer transition-transform duration-200 hover:scale-125"
      >
        {isFavorite ? (
          <Image src="/MdiHeart.png" alt="heart" width={30} height={20} />
        ) : (
          <Heart className="text-white" size={30} />
        )}
      </button>

      {toastSuccess && toastMessage && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              state.isSuccess ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
