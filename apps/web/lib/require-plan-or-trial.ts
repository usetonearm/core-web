import { redirect } from '@remix-run/react';
import {
  addDays,
  differenceInCalendarDays,
  isBefore,
  parseISO,
  subDays,
} from 'date-fns';

import { getLogger } from '@kit/shared/logger';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

/**
 * @name requirePlanOrTrial
 * @description Shortcut to check if a team is in a trial or has a plan
 * @param {Request} request - The incoming request object
 * @param {string} accountSlug - The slug of the account to check
 * @returns {Promise<void>} - Redirects to the homepage if the account is not within a trial or does not have an active subscription
 */
export async function requirePlanOrTrial(
  request: Request,
  accountSlug: string,
): Promise<void> {
  const client = getSupabaseServerClient(request);
  const logger = await getLogger();

  // Fetch account details
  const { data, error } = await client
    .from('accounts')
    .select('created_at, subscriptions(status, active)')
    .eq('slug', accountSlug)
    .single();

  // Log and handle error if the query fails
  if (error) {
    logger.error('Failed to fetch account details', error);
    throw new Error('Failed to fetch account details');
  }

  // Check if account data was retrieved
  if (!data) {
    throw new Error('Account not found');
  }

  // Extract created_at and subscription information
  const { created_at, subscriptions } = data;

  // Check if the account is within the trial window
  const createdAtDate = parseISO(created_at);
  const today = new Date();
  const date14DaysAgo = subDays(today, 14);

  const isTrialActive = isBefore(createdAtDate, date14DaysAgo)
    ? false
    : differenceInCalendarDays(today, createdAtDate) < 14;

  // Check if the account has an active subscription
  const hasActiveSubscription = subscriptions.some(
    (sub) => sub.status === 'active' && sub.active,
  );

  // If neither a trial nor an active subscription is present, redirect to the homepage
  if (!isTrialActive && !hasActiveSubscription) {
    throw redirect(`/home/${accountSlug}/billing?planExpired=true`);
  }
}
