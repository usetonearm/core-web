import * as process from 'node:process';
import { z } from 'zod';

import { getMailer } from '@kit/mailers';
import { getLogger } from '@kit/shared/logger';

import { TestAlertSchema } from '../test-email.schema';

export const sendTestEmailNotification = async (
  data: z.infer<typeof TestAlertSchema>,
) => {
  const mailer = await getMailer();
  const logger = await getLogger();

  logger.info(data.email, 'Sending test email notification');

  await mailer.sendEmail({
    to: data.email,
    from: 'notifications@broadcasthound.com',
    subject: '[Alert] Your stream is down!',
    html: `
        <p>
        Your stream is down!
        </p>
      `,
  });

  return new Response(null, { status: 200 });
};
