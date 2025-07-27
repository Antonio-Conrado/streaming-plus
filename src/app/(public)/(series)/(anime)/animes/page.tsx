import { notFound } from "next/navigation";
import InfiniteScroll from "@/shared/components/InfiniteScroll";
import { fetchAnimes } from "@/lib/tmdb/anime-api";

export default async function AnimesPage() {
  const animes = await fetchAnimes();

  if (!animes) return notFound();
  return (
    <div className="my-10">
      <h1 className="text-2xl ml-3 my-2">Animes</h1>
      <InfiniteScroll type="SERIES" data={animes} />
    </div>
  );
}
