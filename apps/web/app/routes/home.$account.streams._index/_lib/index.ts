import { z } from 'zod';

export const AddStreamSchema = z.object({
  name: z.string().min(1).max(200),
  url: z.string().url(),
});
