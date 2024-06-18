import { SupabaseClient } from '@supabase/supabase-js';

import { z } from 'zod';

import { Database } from '@kit/supabase/database';

import { UpdateContactsSchema } from '~/routes/home.$account.streams.$stream.edit._index/_lib/add-contacts-schema';

import { createStreamsService } from './streams-service';

/**
 * @name updateContactsAction
 * @description Updates the contacts for a stream
 */
export const updateContactsAction = async (params: {
  client: SupabaseClient<Database>;
  data: z.infer<typeof UpdateContactsSchema>;
}) => {
  const data = UpdateContactsSchema.parse(params.data);

  // Create the service
  const service = createStreamsService(params.client);

  // Update contacts
  await service.updateContacts(data.payload);

  return {
    success: true,
  };
};
