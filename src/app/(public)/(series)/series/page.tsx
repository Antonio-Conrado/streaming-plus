import { notFound } from "next/navigation";
import { fetchTopRatedSeries } from "@/lib/tmdb/serie-api";
import InfiniteScroll from "@/shared/components/InfiniteScroll";

export default async function SeriesPage() {
  const series = await fetchTopRatedSeries(1);
  if (!series) return notFound();
  return (
    <div className="my-10">
      <h1 className="text-2xl ml-3 my-2">Series</h1>
      <InfiniteScroll type="SERIES" data={series} />
    </div>
  );
}
