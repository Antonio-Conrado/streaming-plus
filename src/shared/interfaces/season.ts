import { z } from "zod";

// 1. Define los schemas más pequeños primero:

const GuestStarSchema = z.object({
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
});

const CrewMemberSchema = z.object({
  job: z.string(),
  department: z.string(),
  credit_id: z.string(),
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
});

const EpisodeSchema = z.object({
  air_date: z.string(),
  episode_number: z.number(),
  episode_type: z.string(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  production_code: z.string(),
  runtime: z.number(),
  season_number: z.number(),
  show_id: z.number(),
  still_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  crew: z.array(CrewMemberSchema),
  guest_stars: z.array(GuestStarSchema),
});

export const ShowSeasonSchema = z.object({
  _id: z.string(),
  air_date: z.string(),
  episodes: z.array(EpisodeSchema),
  name: z.string(),
  overview: z.string(),
  id: z.number(),
  poster_path: z.string(),
  season_number: z.number(),
  vote_average: z.number(),
});

export type ShowSeason = z.infer<typeof ShowSeasonSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
