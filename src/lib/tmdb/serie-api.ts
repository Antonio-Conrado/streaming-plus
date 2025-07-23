import { SerieDetail, serieDetailSchema } from "@/shared/interfaces/serie";
import { Series, SeriesSchema } from "@/shared/interfaces/series";
import { Videos, videosSchema } from "@/shared/interfaces/videos";
import { customFetch } from "../config/fetch";

export async function fetchOnTheAirSeries() {
  const url =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc";

  return await customFetch<Series>(url, SeriesSchema);
}

export async function fetchDetailsSerie(serie_id: number) {
  const url = `https://api.themoviedb.org/3/tv/${serie_id}?language=es-ES`;

  return await customFetch<SerieDetail>(url, serieDetailSchema);
}

export async function fetchSerieVideos(serie_id: number) {
  const url = `https://api.themoviedb.org/3/tv/${serie_id}/videos?language=es-ES`;

  return await customFetch<Videos>(url, videosSchema);
}

export async function fetchTopRatedSeries() {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=1&sort_by=vote_average.desc&vote_count.gte=200`;

  return await customFetch<Series>(url, SeriesSchema);
}
