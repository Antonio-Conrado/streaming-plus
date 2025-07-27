import { notFound } from "next/navigation";
import { fetchSeriesByGenres } from "@/lib/tmdb/serie-api";
import InfiniteScroll from "@/shared/components/InfiniteScroll";
import Genres from "@/shared/components/media/genres/Genres";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function SeriesGenrePage({ params }: Props) {
  const { id } = await params;
  const seriesByGenres = await fetchSeriesByGenres(+id);
  if (!seriesByGenres) return notFound();
  return (
    <div className="my-10">
      <Genres type="SERIES" />
      <h1 className="text-2xl ml-3 my-2">Series</h1>
      <InfiniteScroll type="SERIES" data={seriesByGenres} />
    </div>
  );
}
