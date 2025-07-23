import { z } from "zod";

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const companySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export const countrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const languageSchema = z.object({
  iso_639_1: z.string(),
  name: z.string(),
});

export const collectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
});

export const movieDetailSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: collectionSchema.nullable(),
  budget: z.number(),
  genres: z.array(genreSchema),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(companySchema),
  production_countries: z.array(countrySchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(languageSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Genre = z.infer<typeof genreSchema>;
export type Company = z.infer<typeof companySchema>;
export type Country = z.infer<typeof countrySchema>;
export type Language = z.infer<typeof languageSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type MovieDetail = z.infer<typeof movieDetailSchema>;
