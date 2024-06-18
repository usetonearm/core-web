import { SupabaseClient } from '@supabase/supabase-js';

import { addDays, formatISO } from 'date-fns';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';

import { UpdateContactsSchema } from '~/routes/home.$account.streams.$stream.edit._index/_lib/add-contacts-schema';

export function createStreamsService(client: SupabaseClient<Database>) {
  return new StreamsService(client);
}

/**
 * @name AccountInvitationsService
 * @description Service for managing account invitations.
 */
class StreamsService {
  private readonly namespace = 'streams';

  constructor(private readonly client: SupabaseClient<Database>) {}

  /**
   * @name updateContacts
   * @description updates the contacts for a stream
   * @param params
   */
  async updateContacts(
    params: z.infer<typeof UpdateContactsSchema>['payload'],
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      ...params,
    };

    // TODO: This is a dangerous way of updating contacts
    const { error: cleanError } = await this.client
      .from('stream_alert_contact')
      .delete()
      .eq('stream', params.streamId);

    if (cleanError) {
      logger.error(ctx, `Failed to update contacts: ${cleanError.message}`);

      throw cleanError;
    }

    const alertContacts = params.contacts.map((item) => ({
      email: item.email,
      stream: params.streamId,
    }));

    logger.info(ctx, 'Updating contacts');

    const { error: insertError } = await this.client
      .from('stream_alert_contact')
      .insert(alertContacts);

    if (insertError) {
      logger.error(ctx, `Failed to update contacts: ${insertError.message}`);

      throw insertError;
    }

    logger.info(ctx, 'Contacts successfully updated');
  }
}
