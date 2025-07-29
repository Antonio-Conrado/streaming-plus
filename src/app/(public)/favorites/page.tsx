import { getFavoritesMedia } from "@/lib/supabase/favorites-media";
import Card from "@/shared/components/Card";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const cookie = await cookies();
  const userObj = cookie.get("streaming-user")?.value;
  const user = userObj ? JSON.parse(userObj) : null;
  if (!user) redirect("/login");

  const favoritesMediaRaw = await getFavoritesMedia(user.id);

  const favoritesMedia =
    favoritesMediaRaw?.map((fav) => ({
      id: fav.media_id,
      title: fav.title,
      poster_path: fav.poster_path,
      vote_average: fav.vote_average,
    })) ?? [];

  return (
    <div className="my-20">
      {favoritesMedia ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {favoritesMedia.map((item) => (
            <Card key={item.id} data={item} isFavorite={true} user={user} />
          ))}
        </div>
      ) : (
        <div className=" text-center">
          No hay favoritos{" "}
          <Link href={"/"} className="text-cyan-600 hover:text-cyan-700">
            empieza agregando
          </Link>
        </div>
      )}
    </div>
  );
}
