import { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';

import { Button } from '@kit/ui/button';
import { Card, CardHeader } from '@kit/ui/card';
import { PageBody, PageHeader } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requireUserLoader } from '~/lib/require-user-loader';

import { HomeAccountsList } from '../home._user/_components/home-accounts-list';
import { loadUserWorkspace } from '../home._user/_lib/load-user-workspace.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: 'Home · Tonearm',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserLoader(request);

  const workspace = await loadUserWorkspace(request);
  const i18n = await createI18nServerInstance(request);
  const title = i18n.t('account:homePage');

  return {
    title,
    workspace,
  };
};

export default function UserHomePage() {
  const { workspace } = useLoaderData<typeof loader>();

  console.log(workspace.accounts);

  return (
    <>
      <PageHeader
        title={<Trans i18nKey={'common:homeTabLabel'} />}
        description={<Trans i18nKey={'common:homeTabDescription'} />}
      />
      {workspace.accounts.length > 0 ? (
        <div
          className={
            'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2' +
            ' 2xl:grid-cols-2'
          }
        >
          {workspace.accounts.map((account) => (
            //@ts-ignore
            <AccountCard {...account} />
          ))}
        </div>
      ) : (
        <HomeAccountsList accounts={workspace.accounts} />
      )}
    </>
  );
}

type AccountCardProps = {
  image: string;
  label: string;
  value: string;
};

function AccountCard({ image, label, value }: AccountCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-row items-center gap-2">
          {image ? (
            <img
              src={image}
              className="h-12 w-12 rounded-full border bg-neutral-300"
              alt="Company image"
            />
          ) : (
            <div className="h-12 w-12 rounded-full border bg-gradient-to-r from-blue-500 to-purple-500"></div>
          )}
          <span>{label}</span>
        </div>
        <div className="justify-start">
          <Link to={`/home/${value}/streams`}>
            <Button>Streams</Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
