import { SerieDetail, serieDetailSchema } from "@/shared/interfaces/serie";
import { Series, SeriesSchema } from "@/shared/interfaces/series";
import { Videos, videosSchema } from "@/shared/interfaces/videos";
import { customFetch } from "../config/fetch";
import { ShowSeason, ShowSeasonSchema } from "@/shared/interfaces/season";
import { SerieCast, SerieCastSchema } from "@/shared/interfaces/castingSerie";
import { Genres, genresResponseSchema } from "@/shared/interfaces/genres";

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

export async function fetchTopRatedSeries(page = 1) {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=${page}&sort_by=vote_average.desc&vote_count.gte=200`;

  return await customFetch<Series>(url, SeriesSchema);
}

export async function fetchSeasonById(serie_id: number, season_id: number) {
  const url = `https://api.themoviedb.org/3/tv/${serie_id}/season/${season_id}?language=es-ES`;

  return await customFetch<ShowSeason>(url, ShowSeasonSchema);
}

export async function fetchSimilarSeries(serie_id: number) {
  const url = `https://api.themoviedb.org/3/tv/${serie_id}/similar?language=es-ES&page=1`;

  return await customFetch<Series>(url, SeriesSchema);
}

export async function fetchCastingBySerie(serie_id: number) {
  const url = `https://api.themoviedb.org/3/tv/${serie_id}/credits
`;

  return await customFetch<SerieCast>(url, SerieCastSchema);
}

export async function fetchSeriesGenres() {
  const url = "https://api.themoviedb.org/3/genre/tv/list";

  return await customFetch<Genres>(url, genresResponseSchema);
}

export async function fetchSeriesByGenres(genre_id: number) {
  const url = `https://api.themoviedb.org/3/discover/tv?with_genres=${genre_id}&language=es-ES&sort_by=popularity.desc&page=1`;

  return await customFetch<Series>(url, SeriesSchema);
}
