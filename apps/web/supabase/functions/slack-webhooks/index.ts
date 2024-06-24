const DISCORD_WEBHOOK_URL_SUBSCRIPTION =
  'https://discord.com/api/webhooks/1254346750425038868/1wwOdGABtS4cI_U_Gbd4FggEATOfPAoDiXEi5JKJBfeHwehqiAEGSRJ8Hf2pphEfZraR';
const DISCORD_WEBHOOK_URL_ACCOUNT =
  'https://discord.com/api/webhooks/1252809200871018518/EYbLwBzd5yAVdXahgGgWP5hWOIF6zBIwb4oQK1e9L1k6_cwrkvg8S_RSO7DuOgjZZSQS';

Deno.serve(async (req) => {
  const { type, table, record } = await req.json();

  if (type === 'INSERT' && table === 'subscription_items') {
    const amount = record.amount; // Adjust according to your schema
    const message = {
      content: `A new subscriber has signed up for $${amount}.`,
    };

    await fetch(DISCORD_WEBHOOK_URL_SUBSCRIPTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  if (type === 'INSERT' && table === 'accounts') {
    const isPersonalAccount = record.is_personal_account; // Adjust according to your schema
    const email = record.email; // Adjust according to your schema

    if (isPersonalAccount) {
      const message = {
        content: `A new user has signed up with email: ${email}.`,
      };

      await fetch(DISCORD_WEBHOOK_URL_ACCOUNT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  }

  return new Response('OK', { status: 200 });
});
