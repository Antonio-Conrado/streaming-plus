import { notFound } from "next/navigation";
import { fetchSearchMedia } from "@/lib/tmdb/media-api";
import Card from "@/shared/components/Card";

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

  if (!query) return notFound();
  const data = await fetchSearchMedia(query);

  return (
    <div className="relative  my-10">
      <h1 className="text-2xl mb-2">Resultados de búsqueda</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {(data.results as MediaItem[])
          .filter(
            (item) =>
              (item.media_type === "movie" || item.media_type === "tv") &&
              item.popularity > 3 &&
              item.vote_average > 3
          )
          .map((item) => (
            <Card key={item.id} data={item} />
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
