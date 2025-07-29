import ShowVideo from "./components/ShowVideo";
import Poster from "@/shared/components/media/information/Poster";
import GeneralInformation from "@/shared/components/media/information/GeneralInformation";
import ShowTrailer from "@/shared/components/media/trailer/ShowTrailer";
import {
  fetchCastingByMovie,
  fetchDetailsMovie,
  fetchSimilarMovies,
} from "@/lib/tmdb/movie-api";
import { notFound } from "next/navigation";
import Carrousel from "@/shared/components/Carrousel";
import CarrouselCasting from "@/shared/components/CarrouselCasting";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function MoviePage({ params }: Props) {
  const { slug } = await params;
  const id = slug.split("-")[0];
  const movie = await fetchDetailsMovie(+id);

  const similar = await fetchSimilarMovies(+id);
  const casting = await fetchCastingByMovie(+id);
  if (!movie) return notFound();
  return (
    <div className="pb-10 relative">
      <Poster
        backdrop_path={movie.backdrop_path ?? ""}
        poster_path={movie.poster_path ?? ""}
      />

      <GeneralInformation
        id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path ?? ""}
        vote_average={movie.vote_average}
        overview={movie.overview}
        genres={movie.genres}
      />
      <section className="flex justify-around gap-5 md:pl-82 mt-5 mb-10">
        <ShowTrailer id={movie.id} type="MOVIE" />
        <ShowVideo id={movie.imdb_id} />
      </section>

      {casting && <CarrouselCasting title={"Reparto"} data={casting} />}
      {similar && <Carrousel title={"Similares"} data={similar} />}
    </div>
  );
}
