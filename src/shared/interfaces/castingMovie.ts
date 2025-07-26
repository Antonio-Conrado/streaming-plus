import { z } from "zod";

export const MovieCastMemberSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

export const MovieCastSchema = z.object({
  id: z.number(),
  cast: z.array(MovieCastMemberSchema),
});

export type MovieCastMember = z.infer<typeof MovieCastMemberSchema>;
export type MovieCast = z.infer<typeof MovieCastSchema>;
