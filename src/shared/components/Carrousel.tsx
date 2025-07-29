"use client";

import { useEffect, useMemo, useRef } from "react";
import Card from "./Card";
import CarouselNavigation from "./CarouselNavigation";
import { Media } from "../interfaces/mediaInformation";
import { useStore } from "@/lib/store/useStore";
import { getFavoritesMedia } from "@/lib/supabase/favorites-media";

type CarrouselProps<T extends Media> = {
  title: string;
  data: { results: T[] };
};

export default function Carrousel<T extends Media>({
  title,
  data,
}: CarrouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToPrev = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const goToNext = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const user = useStore((state) => state.user);
  const setFavoritesMedia = useStore((state) => state.setFavoritesMedia);
  const favoritesMedia = useStore((state) => state.favoritesMedia);

  useEffect(() => {
    if (!user) return;
    getFavoritesMedia(user.id).then((data) => {
      if (data) setFavoritesMedia(data);
    });
  }, [user]);

  const favoritesId = useMemo(() => {
    return new Set(favoritesMedia.map((fav) => fav.media_id));
  }, [favoritesMedia]);

  return (
    <>
      <div className="relative">
        <CarouselNavigation goToPrev={goToPrev} goToNext={goToNext} />
        <h1 className="absolute text-white text-xl top-[-10]  px-10">
          {title}
        </h1>
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth scrollbar-hide "
        >
          <div className="flex gap-4 px-10 py-8">
            {data.results.map((item) => (
              <Card
                key={item.id}
                data={item}
                isFavorite={favoritesId.has(item.id)}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
