import { lazy } from 'react';

import { MetaFunction, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { PlusCircle } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
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

  const { data: stream, error } = await supabase
    .from('streams')
    .select('*')
    .eq('id', args.params.stream as string)
    .single();

  if (!stream) return;

  const account = args.params.account as string;
  const title = i18n.t('teams:home.pageTitle');

  return {
    title,
    account,
    stream,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

export default function StreamPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-12">
      <TeamAccountLayoutPageHeader
        account={data.account}
        title={data.stream.title}
        description={data.stream.url}
      ></TeamAccountLayoutPageHeader>

      <ClientOnly>
        <PageBody>
          <div
            className={
              'grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3' +
              ' mt-12 2xl:grid-cols-3'
            }
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Currently up for
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last checked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">41 seconds ago</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last outage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Never</div>
              </CardContent>
            </Card>
          </div>
        </PageBody>
      </ClientOnly>
    </div>
  );
}
