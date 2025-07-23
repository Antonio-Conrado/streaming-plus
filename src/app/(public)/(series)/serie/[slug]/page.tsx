import Poster from "@/shared/components/media/information/Poster";
import GeneralInformation from "@/shared/components/media/information/GeneralInformation";
import { fetchDetailsSerie } from "@/lib/tmdb/serie-api";
import ShowTrailer from "@/shared/components/media/trailer/ShowTrailer";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function SeriePage({ params }: Props) {
  const { slug } = await params;
  const id = slug.split("-")[0];
  const serie = await fetchDetailsSerie(+id);
  if (!serie) return notFound();
  return (
    <div className="pb-10 relative">
      <Poster
        backdrop_path={serie.backdrop_path ?? ""}
        poster_path={serie.poster_path ?? ""}
      />

      <GeneralInformation
        title={serie.name}
        vote_average={serie.vote_average}
        overview={serie.overview}
        genres={serie.genres}
      />

      <section className="flex justify-around gap-5 md:pl-82 mt-5">
        <ShowTrailer id={serie.id} type="SERIE" />

        <details className="dropdown relative">
          <summary className="btn btn-accent m-1 rounded-md">
            Temporadas
          </summary>
          <ul className="absolute top-full left-[-20] menu bg-base-100 rounded-box z-10 w-40 md:w-52 p-2 gap-2 shadow-sm max-h-52 flex flex-row overflow-y-auto">
            {serie.seasons.map((season) => (
              <li key={season.id} className="w-44">
                <Link
                  href={`/serie/${serie.id}/season/${season.season_number}`}
                  className="btn btn-success rounded-md"
                >
                  {season.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
