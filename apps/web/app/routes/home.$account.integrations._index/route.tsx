import { lazy } from 'react';
// SlackIntegrationCard.jsx
import React from 'react';

import { MetaFunction, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { PlusCircle } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { createTeamAccountsApi } from '@kit/team-accounts/api';
import { Button } from '@kit/ui/button';
import { Card, CardHeader } from '@kit/ui/card';
import { ClientOnly } from '@kit/ui/client-only';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requireUserLoader } from '~/lib/require-user-loader';
import { TeamAccountLayoutPageHeader } from '~/routes/home.$account/_components/team-account-layout-page-header';

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: streamsData, error } = await supabase
    .from('streams')
    .select('*');

  const account = args.params.account as string;
  const title = 'Integrations';

  const api = createTeamAccountsApi(supabase);
  const workspace = await api.getAccountWorkspace(account);

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

export default function TeamIntegrationsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={data.account}
        title={<Trans i18nKey={'common:integrationsTabLabel'} />}
        description={<Trans i18nKey={'common:integrationsTabDescription'} />}
      ></TeamAccountLayoutPageHeader>

      <ClientOnly>
        <div
          className={
            'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2' +
            ' 2xl:grid-cols-2'
          }
        >
          {integrations.map((integration) => (
            <IntegrationCard key={integration.title} {...integration} />
          ))}
        </div>
      </ClientOnly>
    </>
  );
}

interface IntegrationProps {
  title: string;
  description: string;
  Logo: React.ComponentType;
}

function IntegrationCard({ title, description, Logo }: IntegrationProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <Logo />
        </div>
        <div>
          <div className="text-md font-bold">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </div>
        </div>
        <Button>Coming soon</Button>
      </CardHeader>
    </Card>
  );
}

const SlackSvg = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-lg bg-white p-1"
  >
    <path
      d="M26.5002 14.9996C27.8808 14.9996 29 13.8804 29 12.4998C29 11.1192 27.8807 10 26.5001 10C25.1194 10 24 11.1193 24 12.5V14.9996H26.5002ZM19.5 14.9996C20.8807 14.9996 22 13.8803 22 12.4996V5.5C22 4.11929 20.8807 3 19.5 3C18.1193 3 17 4.11929 17 5.5V12.4996C17 13.8803 18.1193 14.9996 19.5 14.9996Z"
      fill="#2EB67D"
    />
    <path
      d="M5.49979 17.0004C4.11919 17.0004 3 18.1196 3 19.5002C3 20.8808 4.1193 22 5.49989 22C6.8806 22 8 20.8807 8 19.5V17.0004H5.49979ZM12.5 17.0004C11.1193 17.0004 10 18.1197 10 19.5004V26.5C10 27.8807 11.1193 29 12.5 29C13.8807 29 15 27.8807 15 26.5V19.5004C15 18.1197 13.8807 17.0004 12.5 17.0004Z"
      fill="#E01E5A"
    />
    <path
      d="M17.0004 26.5002C17.0004 27.8808 18.1196 29 19.5002 29C20.8808 29 22 27.8807 22 26.5001C22 25.1194 20.8807 24 19.5 24L17.0004 24L17.0004 26.5002ZM17.0004 19.5C17.0004 20.8807 18.1197 22 19.5004 22L26.5 22C27.8807 22 29 20.8807 29 19.5C29 18.1193 27.8807 17 26.5 17L19.5004 17C18.1197 17 17.0004 18.1193 17.0004 19.5Z"
      fill="#ECB22E"
    />
    <path
      d="M14.9996 5.49979C14.9996 4.11919 13.8804 3 12.4998 3C11.1192 3 10 4.1193 10 5.49989C10 6.88061 11.1193 8 12.5 8L14.9996 8L14.9996 5.49979ZM14.9996 12.5C14.9996 11.1193 13.8803 10 12.4996 10L5.5 10C4.11929 10 3 11.1193 3 12.5C3 13.8807 4.11929 15 5.5 15L12.4996 15C13.8803 15 14.9996 13.8807 14.9996 12.5Z"
      fill="#36C5F0"
    />
  </svg>
);

const DiscordSvg = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 -28.5 256 256"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className="rounded-lg bg-white p-1"
  >
    <g>
      <path
        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
        fill="#5865F2"
        fillRule="nonzero"
      ></path>
    </g>
  </svg>
);

const integrations = [
  {
    title: 'Slack',
    description:
      'Create, acknowledge, and resolve Better Stack incidents from Slack',
    Logo: SlackSvg,
  },
  {
    title: 'Discord',
    description: 'Push notifications into your Discord channels',
    Logo: DiscordSvg,
  },
];
