import Link from "next/link";
import { fetchSeriesGenres } from "@/lib/tmdb/movie-api";
import { genreTranslations } from "@/shared/data/genreTransalations";

type Props = {
  type: "SERIES" | "MOVIES";
};
export default async function Genres({ type }: Props) {
  const genres = await fetchSeriesGenres();
  const url = type === "SERIES" ? "/series/genre" : "/movies/genre";
  return (
    <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 px-5">
      {genres &&
        genres.genres.map((genre) => (
          <li
            key={genre.id}
            className="btn btn-default rounded-lg hover:btn-success"
          >
            <Link href={`${url}/${genre.id}`}>
              {genreTranslations[genre.name] ?? genre.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
