import { z } from 'zod';

export const envSchema = z.object({
  CACHE_MAX: z.coerce.number().optional().default(10),
  CACHE_TTL: z.coerce.number().optional().default(5),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.coerce.number().optional().default(100000),
  AWS_REGION: z.string().optional().default('us-east-1'),
  DYNAMODB_ENDPOINT: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  REDIS_CONNECTION_STRING: z.string(),
});

export type Env = z.infer<typeof envSchema>;
