import { notFound } from "next/navigation";
import { fetchTrendingMovies } from "@/lib/tmdb/movie-api";
import InfiniteScroll from "@/shared/components/InfiniteScroll";

export default async function MoviesPage() {
  const movies = await fetchTrendingMovies(1);
  if (!movies) return notFound();
  return (
    <div className="my-10">
      <h1 className="text-2xl ml-3 my-2">Películas</h1>
      <InfiniteScroll type="MOVIES" data={movies} />
    </div>
  );
}
