import { z } from "zod";

export const SerieCastMemberSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string().optional(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  character: z.string().optional(),
  credit_id: z.string(),
  order: z.number().optional(),
});

export const SerieCastSchema = z.object({
  id: z.number(),
  cast: z.array(SerieCastMemberSchema),
});

export type SerieCastMember = z.infer<typeof SerieCastMemberSchema>;
export type SerieCast = z.infer<typeof SerieCastSchema>;
