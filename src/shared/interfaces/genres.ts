import { z } from "zod";

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export type Genre = z.infer<typeof genreSchema>;
export type Genres = z.infer<typeof genresResponseSchema>;
