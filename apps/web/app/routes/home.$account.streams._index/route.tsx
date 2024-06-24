import { lazy } from 'react';

import { MetaFunction, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { PlusCircle } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { createTeamAccountsApi } from '@kit/team-accounts/api';
import { Button } from '@kit/ui/button';
import { ClientOnly } from '@kit/ui/client-only';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requirePlanOrTrial } from '~/lib/require-plan-or-trial';
import { requireUserLoader } from '~/lib/require-user-loader';
import { TeamAccountLayoutPageHeader } from '~/routes/home.$account/_components/team-account-layout-page-header';

import AddStreamDialog from './_components/add-stream';

const StreamsDashboard = lazy(() => import('./_components/streams-dashboard'));

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const account = args.params.account as string;
  const title = i18n.t('teams:home.pageTitle');

  const api = createTeamAccountsApi(supabase);
  const workspace = await api.getAccountWorkspace(account);

  if (!workspace.data?.account) {
    throw new Error();
  }

  const { data: streamsData, error } = await supabase
    .from('streams')
    .select('id, title, status, url')
    .eq('account_id', workspace.data?.account.id);

  await requirePlanOrTrial(
    args.request,
    workspace.data?.account.slug as string,
  );

  return {
    title,
    account,
    accountId: workspace.data?.account.id,
    streams: streamsData,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title + ' · Tonearm',
    },
  ];
};

export default function TeamStreamsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={data.account}
        title={<Trans i18nKey={'common:streamsTabLabel'} />}
        description={<Trans i18nKey={'common:streamsTabDescription'} />}
      >
        <AddStreamDialog
          accountId={data.accountId as string}
          account={data.account}
        />
      </TeamAccountLayoutPageHeader>
      <ClientOnly>
        <StreamsDashboard
          streams={data.streams}
          account={data.account}
          accountId={data.accountId as string}
        />
      </ClientOnly>
    </>
  );
}
