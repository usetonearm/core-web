import { z } from 'zod';

export const EditStreamSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});
