import { z } from 'zod';

export const TestAlertSchema = z.object({
  email: z.string().email(),
});
