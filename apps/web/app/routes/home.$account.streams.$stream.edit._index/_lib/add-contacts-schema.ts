import { z } from 'zod';

import { CsrfTokenSchema } from '@kit/csrf/schema';

const ContactSchema = z.object({
  email: z.string().email(),
});

export const ContactsSchema = CsrfTokenSchema.extend({
  contacts: ContactSchema.array().min(1).max(5),
  streamId: z.string(),
}).refine(
  (data) => {
    const emails = data.contacts.map((member) => member.email.toLowerCase());

    const uniqueEmails = new Set(emails);

    return emails.length === uniqueEmails.size;
  },
  {
    message: 'Duplicate emails are not allowed',
    path: ['contacts'],
  },
);

export const UpdateContactsSchema = z.object({
  intent: z.literal('update-contacts'),
  payload: ContactsSchema,
});
