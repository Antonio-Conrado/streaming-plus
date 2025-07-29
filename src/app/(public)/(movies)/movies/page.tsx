import { notFound } from "next/navigation";
import { fetchTrendingMovies } from "@/lib/tmdb/movie-api";
import InfiniteScroll from "@/shared/components/InfiniteScroll";
import Genres from "@/shared/components/media/genres/Genres";

export default async function MoviesPage() {
  const movies = await fetchTrendingMovies(1);
  if (!movies) return notFound();
  return (
    <div className="my-10">
      <Genres type="MOVIES" />
      <h1 className="text-2xl ml-3 mt-10 mb-5">Películas</h1>
      <InfiniteScroll type="MOVIES" data={movies} />
    </div>
  );
}
