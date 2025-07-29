import { notFound } from "next/navigation";
import { fetchSearchMedia } from "@/lib/tmdb/media-api";
import Card from "@/shared/components/Card";
import { cookies } from "next/headers";
import { getFavoritesMedia } from "@/lib/supabase/favorites-media";
import { User } from "@/shared/interfaces/user";

type MediaItem = {
  id: number;
  media_type: "movie" | "tv";
  popularity: number;
  vote_average: number;
  poster_path: string;
};

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function MediaPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.query;

  const cookieStore = await cookies();
  const userObj = cookieStore.get("streaming-user")?.value;
  const user: User = userObj ? JSON.parse(userObj) : null;
  const favoritesMedia = user ? await getFavoritesMedia(user.id) : null;

  if (!query) return notFound();
  const data = await fetchSearchMedia(query);

  return (
    <div className="relative  my-10">
      <h1 className="text-2xl mb-2">Resultados de búsqueda</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-4">
        {(data.results as MediaItem[])
          .filter(
            (item) =>
              (item.media_type === "movie" || item.media_type === "tv") &&
              item.popularity > 3 &&
              item.vote_average > 3
          )
          .map((item) => (
            <Card
              key={item.id}
              data={item}
              user={user}
              isFavorite={
                favoritesMedia
                  ? favoritesMedia.some(
                      (favorite) => favorite.media_id === item.id
                    )
                  : false
              }
            />
          ))}
      </div>

      {data.results.length === 0 && (
        <p className="text-center">
          No se encontraron datos. Intente con otro palabra relacionada.
        </p>
      )}
    </div>
  );
}
