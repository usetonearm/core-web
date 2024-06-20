import * as process from 'node:process';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { TestAlertSchema } from '../test-email.schema';

export const sendTestEmailNotification = async (
  data: z.infer<typeof TestAlertSchema>,
) => {
  const logger = await getLogger();

  const ctx = {
    email: data.email,
    namespace: 'test.notifications',
  };

  logger.info(ctx, 'Sending test notification');

  const { getMailer } = await import('@kit/mailers');
  const { getStreamDownEmailHtml } = await import('@kit/email-templates');
  const supabase = await getSupabaseServerAdminClient();

  const { data: stream, error: streamError } = await supabase
    .from('streams')
    .select('*')
    .eq('id', data.streamId)
    .single();

  if (streamError) logger.error(ctx, streamError.message);

  if (!stream) {
    logger.warn(ctx, 'No stream found. Exiting');
    return;
  }

  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', stream?.account_id)
    .single();

  if (accountError) logger.error(ctx, accountError.message);

  if (!account) {
    logger.warn(ctx, 'No account found. Exiting');
    return;
  }

  const { data: contacts, error: contactError } = await supabase
    .from('stream_alert_contact')
    .select('*')
    .eq('stream', data.streamId);

  if (contactError) logger.error(ctx, contactError.message);

  if (!contacts) {
    logger.warn(ctx, 'No contacts found for stream. Exiting');
    return;
  }

  const mailer = await getMailer();
  const html = getStreamDownEmailHtml(
    account.name,
    account.slug as string,
    stream.id,
    stream.title,
    stream.last_check as unknown as Date,
  );

  const emailSettings = getEmailSettings();

  contacts.forEach(async (contact) => {
    await mailer.sendEmail({
      to: contact.email as string,
      from: emailSettings.fromEmail,
      subject: '[Test] Your stream is down!',
      html: html,
    });
  });

  return new Response(null, { status: 200 });
};

const getEmailSettings = () => {
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
};
