import { lazy } from 'react';

import { MetaFunction, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { PlusCircle } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Button } from '@kit/ui/button';
import { ClientOnly } from '@kit/ui/client-only';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requireUserLoader } from '~/lib/require-user-loader';
import { TeamAccountLayoutPageHeader } from '~/routes/home.$account/_components/team-account-layout-page-header';

const StreamsDashboard = lazy(() => import('./_components/streams-dashboard'));

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: streamsData, error } = await supabase
    .from('streams')
    .select('*');

  console.log(streamsData);

  const account = args.params.account as string;
  const title = i18n.t('teams:home.pageTitle');

  return {
    title,
    account,
    streams: streamsData,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

export default function TeamStreamsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-12">
      <TeamAccountLayoutPageHeader
        account={data.account}
        title={<Trans i18nKey={'common:streamsTabLabel'} />}
        description={<Trans i18nKey={'common:streamsTabDescription'} />}
      >
        <Button>
          <PlusCircle className={'mr-1 h-4'} />
          <span>Add Stream</span>
        </Button>
      </TeamAccountLayoutPageHeader>

      <PageBody>
        <ClientOnly>
          <StreamsDashboard streams={data.streams} account={data.account} />
        </ClientOnly>
      </PageBody>
    </div>
  );
}