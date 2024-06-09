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

const DashboardDemo = lazy(() => import('./_components/dashboard-demo'));

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  await requireUserLoader(args.request);

  const account = args.params.account as string;
  const title = i18n.t('teams:streams.pageTitle');

  return {
    title,
    account,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

export default function TeamAccountHomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={data.account}
        title={<Trans i18nKey={'common:dashboardTabLabel'} />}
        description={<Trans i18nKey={'common:dashboardTabDescription'} />}
      >
        <Button>
          <PlusCircle className={'mr-1 h-4'} />
          <span>Add Widget</span>
        </Button>
      </TeamAccountLayoutPageHeader>

      <PageBody>
        <ClientOnly>
          <DashboardDemo />
        </ClientOnly>
      </PageBody>
    </>
  );
}
