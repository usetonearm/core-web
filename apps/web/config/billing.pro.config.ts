/**
 * This is a sample billing configuration file. You should copy this file to `billing.config.ts` and then replace
 * the configuration with your own billing provider and products.
 */
import { BillingProviderSchema, createBillingSchema } from '@kit/billing';

// The billing provider to use. This should be set in the environment variables
// and should match the provider in the database. We also add it here so we can validate
// your configuration against the selected provider at build time.
const provider = BillingProviderSchema.parse(
  import.meta.env.VITE_BILLING_PROVIDER,
);

export default createBillingSchema({
  // also update config.billing_provider in the DB to match the selected
  provider,
  // products configuration
  products: [
    {
      id: 'pro',
      name: 'Pro',
      description: 'Comprehensive uptime coverage of your broadcasts',
      currency: 'USD',
      badge: `Premium`,
      plans: [
        {
          name: 'Pro Monthly',
          id: 'pro-monthly',
          trialDays: 14,
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              // id: 'price_1PPGMqBkJgtEM3ooQwlrsMK2',
              id: 'price_1PPG54BkJgtEM3ooEKtCzfYG',
              name: 'Pro Monthly',
              cost: 15.0,
              type: 'flat' as const,
            },
          ],
        },
        {
          name: 'Pro Yearly',
          id: 'pro-yearly',
          trialDays: 14,
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              // id: 'price_1PPGMlBkJgtEM3oota3367wa',
              id: 'price_1PPGCMBkJgtEM3oorPj2RFGi',
              name: 'Pro Yearly',
              cost: 150,
              type: 'flat' as const,
            },
          ],
        },
      ],
      features: [
        'Unlimited streams to monitor',
        'Slack, Discord, and Email alerts',
        'Checks every minute',
        'Silence detection',
      ],
    },
    // {
    //   id: 'pro',
    //   name: 'Pro',
    //   badge: `Popular`,
    //   highlighted: true,
    //   description: 'The perfect plan for professionals',
    //   currency: 'USD',
    //   plans: [
    //     {
    //       name: 'Pro Monthly',
    //       id: 'pro-monthly',
    //       paymentType: 'recurring',
    //       interval: 'month',
    //       lineItems: [
    //         {
    //           id: 'price_1PGOAVI1i3VnbZTqc69xaypm',
    //           name: 'Base',
    //           cost: 19.99,
    //           type: 'flat',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'Pro Yearly',
    //       id: 'pro-yearly',
    //       paymentType: 'recurring',
    //       interval: 'year',
    //       lineItems: [
    //         {
    //           id: 'price_pro_yearly',
    //           name: 'Base',
    //           cost: 199.99,
    //           type: 'flat',
    //         },
    //       ],
    //     },
    //   ],
    //   features: [
    //     'Feature 1',
    //     'Feature 2',
    //     'Feature 3',
    //     'Feature 4',
    //     'Feature 5',
    //   ],
    // },
    // {
    //   id: 'enterprise',
    //   name: 'Enterprise',
    //   description: 'The perfect plan for enterprises',
    //   currency: 'USD',
    //   plans: [
    //     {
    //       name: 'Enterprise Monthly',
    //       id: 'enterprise-monthly',
    //       paymentType: 'recurring',
    //       interval: 'month',
    //       lineItems: [
    //         {
    //           id: 'price_enterprise-monthly',
    //           name: 'Base',
    //           cost: 29.99,
    //           type: 'flat',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'Enterprise Yearly',
    //       id: 'enterprise-yearly',
    //       paymentType: 'recurring',
    //       interval: 'year',
    //       lineItems: [
    //         {
    //           id: 'price_enterprise_yearly',
    //           name: 'Base',
    //           cost: 299.99,
    //           type: 'flat',
    //         },
    //       ],
    //     },
    //   ],
    //   features: [
    //     'Feature 1',
    //     'Feature 2',
    //     'Feature 3',
    //     'Feature 4',
    //     'Feature 5',
    //     'Feature 6',
    //     'Feature 7',
    //   ],
    // },
  ],
});
