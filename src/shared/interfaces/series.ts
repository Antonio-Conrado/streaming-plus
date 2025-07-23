import { z } from "zod";

export const serieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  origin_country: z.array(z.string()),
});

export const SeriesSchema = z.object({
  page: z.number(),
  results: z.array(serieSchema),
  total_pages: z.number().optional(),
  total_results: z.number().optional(),
});

// Infer the types
export type Serie = z.infer<typeof serieSchema>;
export type Series = z.infer<typeof SeriesSchema>;
