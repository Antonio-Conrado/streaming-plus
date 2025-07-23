import {
  fetchLatetsMovies,
  fetchTrendingMovies,
  fetchNowPlayingMovies,
} from "@/lib/tmdb/movie-api";
import { fetchOnTheAirSeries, fetchTopRatedSeries } from "@/lib/tmdb/serie-api";
import Carrousel from "@/shared/components/Carrousel";
import HeroCarousel from "@/shared/components/Hero/HeroCarousel";
import { imageLink } from "@/shared/data/const";

export default async function Home() {
  const [
    latetsMovies,
    trendingMovies,
    nowPlayingMovies,
    onTheAirSeries,
    topRatedSeries,
  ] = await Promise.all([
    fetchLatetsMovies(),
    fetchTrendingMovies(),
    fetchNowPlayingMovies(),
    fetchOnTheAirSeries(),
    fetchTopRatedSeries(),
  ]);

  const moviesCarousels = [
    { title: "Mejores películas", data: trendingMovies },
    { title: "Últimas películas", data: nowPlayingMovies },
  ].filter((item) => item.data !== false);

  const seriesCarousels = [
    { title: "Últimas series", data: onTheAirSeries },
    { title: "Series mejores valoradas", data: topRatedSeries },
  ].filter((item) => item.data !== false);

  return (
    <>
      {latetsMovies && (
        <div className="relative">
          <HeroCarousel
            imageLink={imageLink}
            latetsMovies={latetsMovies.results}
          />
        </div>
      )}

      <div className="flex flex-col gap-5 px-4 my-10">
        {moviesCarousels.map(
          ({ title, data }) =>
            data && <Carrousel key={title} title={title} data={data} />
        )}
        {seriesCarousels.map(
          ({ title, data }) =>
            data && <Carrousel key={title} title={title} data={data} />
        )}
      </div>
    </>
  );
}
