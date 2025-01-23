import { z } from 'zod';

export const envSchema = z.object({
  CACHE_MAX: z.coerce.number().optional().default(10),
  CACHE_TTL: z.coerce.number().optional().default(5),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
});

export type Env = z.infer<typeof envSchema>;
