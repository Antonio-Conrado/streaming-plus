import { MovieDetail, movieDetailSchema } from "@/shared/interfaces/movie";
import { fetchMoviesResponseSchema } from "@/shared/interfaces/movies";
import type { FetchMoviesResponse } from "@/shared/interfaces/movies";
import { Videos, videosSchema } from "@/shared/interfaces/videos";
import { customFetch } from "../config/fetch";

export async function fetchTrendingMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  return await customFetch<FetchMoviesResponse>(url, fetchMoviesResponseSchema);
}

export async function fetchNowPlayingMovies() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_release_type=2|3";

  return await customFetch<FetchMoviesResponse>(url, fetchMoviesResponseSchema);
}

export async function fetchDetailsMovie(movie_id: number) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=es-ES`;

  return await customFetch<MovieDetail>(url, movieDetailSchema);
}

export async function fetchMovieVideos(movie_id: number) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=es-ES`;

  return await customFetch<Videos>(url, videosSchema);
}
export async function fetchLatetsMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=es-ES`;

  return await customFetch<FetchMoviesResponse>(url, fetchMoviesResponseSchema);
}
