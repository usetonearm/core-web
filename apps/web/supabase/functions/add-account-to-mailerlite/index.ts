// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const API_KEY = Deno.env.get('MAILER_LITE_API_KEY');
const group_id = '124007010819638356';

Deno.serve(async (req) => {
  const payload = await req.json();
  const account = payload.record;

  try {
    // Check if it is a personal account
    if (account.is_personal_account) {
      const email = account.email;
      const apiUrl = 'https://api.mailerlite.com/api/v2/subscribers';

      // First, add the subscriber
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': API_KEY,
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        console.error(
          'Failed to add subscriber to MailerLite:',
          response.statusText,
        );
        return new Response('Error adding subscriber', { status: 500 });
      }

      console.log('Successfully added subscriber to MailerLite');

      // Now, add the subscriber to the 'trials' group
      const subscriber = await response.json();
      const subscriber_id = subscriber.id;
      const groupUrl = `https://connect.mailerlite.com/api/subscribers/${subscriber_id}/groups/${group_id}`;

      const groupResponse = await fetch(groupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': API_KEY,
        },
      });

      if (!groupResponse.ok) {
        console.error(
          'Failed to add subscriber to the "trials" group:',
          groupResponse.statusText,
        );
        return new Response('Error adding subscriber to the group', {
          status: 500,
        });
      }

      console.log('Successfully added subscriber to the "trials" group');
    }

    return new Response('Function executed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});
