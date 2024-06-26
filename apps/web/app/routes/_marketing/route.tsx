import { MetaFunction } from '@remix-run/node';
import { Outlet, json, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { ThemeProvider } from 'next-themes';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { SiteBanner } from './_components/site-banner';
// local imports
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  return json({
    user,
  });
}

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Tonearm · Internet radio silence & downtime monitoring',
    },
    {
      name: 'description',
      content:
        'Best in class internet radio silence & downtime monitoring. Built by radio operators, for radio operators. Realtime silence detection and outage alerts',
    },
  ];
};

export default function MarketingLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="light"
      enableColorScheme={false}
    >
      <div className={'light flex min-h-[100vh] flex-col'}>
        <SiteBanner />
        <SiteHeader user={data.user} />
        <Outlet />
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
