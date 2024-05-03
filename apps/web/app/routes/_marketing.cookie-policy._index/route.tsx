import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { SitePageHeader } from '~/routes/_marketing/_components/site-page-header';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

export const loader = async function ({ request }: LoaderFunctionArgs) {
  const { t } = await createI18nServerInstance(request);

  return {
    title: t('marketing:cookiePolicy'),
    subtitle: t('marketing:cookiePolicyDescription'),
  };
};

export default function CookiePolicyPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <SitePageHeader title={data.title} subtitle={data.subtitle} />

      <div className={'container mx-auto py-8'}>
        <div>Your content here</div>
      </div>
    </div>
  );
}
