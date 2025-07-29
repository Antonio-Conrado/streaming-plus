import { notFound } from "next/navigation";
import { fetchTopRatedSeries } from "@/lib/tmdb/serie-api";
import InfiniteScroll from "@/shared/components/InfiniteScroll";
import Genres from "@/shared/components/media/genres/Genres";

export default async function SeriesPage() {
  const series = await fetchTopRatedSeries(1);

  if (!series) return notFound();
  return (
    <div className="my-10">
      <Genres type="SERIES" />
      <h1 className="text-2xl ml-3 mt-10 mb-5">Series</h1>
      <InfiniteScroll type="SERIES" data={series} />
    </div>
  );
}
