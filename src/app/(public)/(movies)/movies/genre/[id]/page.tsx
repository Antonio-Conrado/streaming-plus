import { notFound } from "next/navigation";
import InfiniteScroll from "@/shared/components/InfiniteScroll";
import Genres from "@/shared/components/media/genres/Genres";
import { fetchMoviesByGenres } from "@/lib/tmdb/movie-api";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function MoviesGenrePage({ params }: Props) {
  const { id } = await params;
  const moviesByGenres = await fetchMoviesByGenres(+id);
  if (!moviesByGenres) return notFound();
  return (
    <div className="my-10">
      <Genres type="MOVIES" />
      <h1 className="text-2xl ml-3 my-2">Películas</h1>
      <InfiniteScroll type="MOVIES" data={moviesByGenres} />
    </div>
  );
}
