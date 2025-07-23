import { z } from "zod";

export const videoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

export const videosSchema = z.object({
  id: z.number(),
  results: z.array(videoSchema),
});

export type Video = z.infer<typeof videoSchema>;
export type Videos = z.infer<typeof videosSchema>;
