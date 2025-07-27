import { Series, SeriesSchema } from "@/shared/interfaces/series";
import { customFetch } from "../config/fetch";

export async function fetchAnimes() {
  const url =
    "https://api.themoviedb.org/3/discover/tv?with_genres=16&with_origin_country=JP&sort_by=vote_average.desc";

  return await customFetch<Series>(url, SeriesSchema);
}
