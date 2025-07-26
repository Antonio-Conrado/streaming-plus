import Poster from "@/shared/components/media/information/Poster";
import GeneralInformation from "@/shared/components/media/information/GeneralInformation";
import {
  fetchCastingBySerie,
  fetchDetailsSerie,
  fetchSimilarSeries,
} from "@/lib/tmdb/serie-api";
import { notFound } from "next/navigation";
import ShowEpisodes from "./components/ShowEpisodes";
import Carrousel from "@/shared/components/Carrousel";
import CarrouselCasting from "@/shared/components/CarrouselCasting";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function SeriePage({ params }: Props) {
  const { slug } = await params;
  const id = slug.split("-")[0];
  const serie = await fetchDetailsSerie(+id);
  const similar = await fetchSimilarSeries(+id);
  const casting = await fetchCastingBySerie(+id);
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

      <ShowEpisodes serie={serie} />

      {casting && <CarrouselCasting title={"Reparto"} data={casting} />}
      {similar && <Carrousel title={"Similares"} data={similar} />}
    </div>
  );
}
