// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const API_KEY = Deno.env.get('MAILER_LITE_API_KEY');

Deno.serve(async (req) => {
  const payload = await req.json();
  const account = payload.record;

  try {
    // Check if it is a personal account
    if (account.is_personal_account) {
      const email = account.email;
      const apiUrl = `https://api.mailerlite.com/api/v2/subscribers/${email}`;

      // First, fetch the subscriber to get their ID
      const fetchResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': API_KEY,
        },
      });

      if (fetchResponse.status === 404) {
        console.error('Subscriber not found in MailerLite');
        return new Response('Subscriber not found', { status: 404 });
      }

      if (!fetchResponse.ok) {
        console.error(
          'Failed to fetch subscriber from MailerLite:',
          fetchResponse.statusText,
        );
        return new Response('Error fetching subscriber', { status: 500 });
      }

      const subscriber = await fetchResponse.json();
      const subscriberId = subscriber.id;
      const deleteUrl = `https://api.mailerlite.com/api/v2/subscribers/${subscriberId}`;

      // Now, delete the subscriber
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': API_KEY,
        },
      });

      if (!deleteResponse.ok) {
        console.error(
          'Failed to delete subscriber from MailerLite:',
          deleteResponse.statusText,
        );
        return new Response('Error deleting subscriber', { status: 500 });
      }

      console.log('Successfully deleted subscriber from MailerLite');
    }

    return new Response('Function executed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});
