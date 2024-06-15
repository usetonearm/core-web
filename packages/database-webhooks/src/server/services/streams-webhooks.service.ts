import { SupabaseClient } from '@supabase/supabase-js';

import process from 'node:process';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';

type Stream = Database['public']['Tables']['streams']['Row'];

export function createStreamsWebhooksService(client: SupabaseClient<Database>) {
  return new StreamsWebhooksService(client);
}

class StreamsWebhooksService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  private readonly namespace = 'streams.webhooks';

  async handleStreamStatusChange(currentStream: Stream, oldStream: Stream) {
    const logger = await getLogger();

    const ctx = {
      streamId: currentStream.id,
      namespace: this.namespace,
    };

    logger.info(ctx, 'Received stream change. Processing...');

    if (currentStream.status !== oldStream.status) {
      switch (currentStream.status) {
        case 'online':
          logger.info(ctx, 'Status has changed to online');
          this.sendStreamIsUpEmail(currentStream);
          break;
        case 'down':
          logger.info(ctx, 'Status has changed to down');
          this.sendStreamIsDownEmail(currentStream);
          break;
        case 'silence':
          logger.info(ctx, 'Status has changed to silence');
          break;
        case 'error':
          logger.info(ctx, 'Status has changed to error');
          break;
        default:
          break;
      }
    } else {
      logger.info(ctx, 'Stream status unchanged');
    }
  }

  private async sendStreamIsUpEmail(stream: Stream) {
    const { getMailer } = await import('@kit/mailers');
    const mailer = await getMailer();

    const emailSettings = this.getEmailSettings();

    await mailer.sendEmail({
      to: 'oscar@watsonsmith.com.au',
      from: emailSettings.fromEmail,
      subject: 'Your stream is up!',
      html: `<p>Your stream ${stream.title} is up!</p>`,
    });
  }

  private async sendStreamIsDownEmail(stream: Stream) {
    const { getMailer } = await import('@kit/mailers');
    const { getStreamDownEmailHtml } = await import('@kit/email-templates');

    const { data: account, error: accountError } = await this.client
      .from('accounts')
      .select('*')
      .eq('id', stream.account_id)
      .single();

    const { data: contact, error: contactError } = await this.client
      .from('stream_alert_contact')
      .select('*')
      .eq('stream', stream.id)
      .single();

    if (!contact) return;
    if (!account) return;

    const mailer = await getMailer();
    const html = getStreamDownEmailHtml(
      account.name,
      account.slug as string,
      stream.id,
      stream.title,
      stream.last_check as unknown as Date,
    );

    const emailSettings = this.getEmailSettings();

    await mailer.sendEmail({
      to: contact.email as string,
      from: emailSettings.fromEmail,
      subject: 'Your stream is down!',
      html: html,
    });
  }

  private getEmailSettings() {
    const productName = import.meta.env.VITE_PRODUCT_NAME;
    const fromEmail = process.env.EMAIL_SENDER;

    return z
      .object({
        productName: z.string(),
        fromEmail: z.string().email(),
      })
      .parse({
        productName,
        fromEmail,
      });
  }
}
