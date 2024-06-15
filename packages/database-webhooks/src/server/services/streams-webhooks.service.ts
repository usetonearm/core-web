import process from 'node:process';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';

type Stream = Database['public']['Tables']['streams']['Row'];
type Status = Database['public']['Enums']['check_status'];

export function createStreamsWebhooksService() {
  return new StreamsWebhooksService();
}

class StreamsWebhooksService {
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

    // if (account.is_personal_account) {
    //   logger.info(ctx, `Account is personal. We send an email to the user.`);

    //   await this.sendDeleteAccountEmail(account);
    // }
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
    const mailer = await getMailer();

    const emailSettings = this.getEmailSettings();

    await mailer.sendEmail({
      to: 'oscar@watsonsmith.com.au',
      from: emailSettings.fromEmail,
      subject: 'Your stream is down!',
      html: `<p>Your stream ${stream.title} is down!</p>`,
    });
  }

  //   private async sendAccountDeletionEmail(params: {
  //     fromEmail: string;
  //     userEmail: string;
  //     userDisplayName: string;
  //     productName: string;
  //   }) {
  //     const { renderAccountDeleteEmail } = await import('@kit/email-templates');
  //     const { getMailer } = await import('@kit/mailers');
  //     const mailer = await getMailer();

  //     const { html, subject } = await renderAccountDeleteEmail({
  //       userDisplayName: params.userDisplayName,
  //       productName: params.productName,
  //     });

  //     return mailer.sendEmail({
  //       to: params.userEmail,
  //       from: params.fromEmail,
  //       subject,
  //       html,
  //     });
  //   }

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
