import { MetaFunction, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { SitePageHeader } from '~/routes/_marketing/_components/site-page-header';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title + ' · Tonearm',
    },
    {
      content: 'description',
      description: data?.subtitle,
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

      <div
        className={
          'text-muted-foreground container mx-auto space-y-2 py-8 text-sm'
        }
      >
        <p>Welcome to usetonearm.com.</p>

        <p>
          This Cookie Policy is designed to inform you about our practices
          regarding the collection of information through cookies and other
          tracking technologies (like gifs, web beacons, etc.).
        </p>

        <p>
          The functionalities for which we use these technologies may include,
          but are not limited to, the following:
        </p>
        <ul>
          <li>Understanding how you navigate through our website</li>
          <li>Personalizing your experience on our site</li>
          <li>
            Providing you with customized content or offers on our site or
            within our advertising
          </li>
          <li>Optimizing your user experience on our site</li>
        </ul>

        <p>
          In the context of this policy, 'we', 'our', and 'us' refers to
          usetonearm.com and 'you' refers to you, as the user of this website.
        </p>

        <p>
          By using usetonearm.com, you accept our use of cookies in accordance
          with this Cookie Policy. If you do not accept the use of cookies,
          please disable them as instructed in this Cookie Policy, so they are
          not downloaded to your device when you use our website.
        </p>

        <p>
          We reserve the right to modify this Cookie Policy at any time. Any
          changes will be effective immediately upon posting to the website, so
          please review it frequently.
        </p>

        <h2>Cookie Policy</h2>

        <h3>How We Use Cookies</h3>
        <p>
          At usetonearm.com, we use cookies to enhance your browsing experience
          and provide personalized services. Cookies are small text files placed
          on your device when you visit our website. These files help us analyze
          website traffic, remember your preferences, and enable certain
          functionalities.
        </p>

        <p>
          By using our website, you consent to the use of cookies in accordance
          with this Cookie Policy. You can manage and modify your cookie
          preferences through your browser settings. However, please note that
          disabling certain cookies may restrict access to certain features and
          functionalities of our website.
        </p>

        <h3>Types of Cookies We Use</h3>
        <ul>
          <li>
            <strong>Analytics Cookies:</strong> We utilize analytics cookies to
            gather information about your usage of our website. These cookies
            help us understand how visitors interact with our site, providing us
            with valuable insights to improve our services and user experience.
            The data collected through analytics cookies is aggregated and does
            not personally identify you.
          </li>
          <li>
            <strong>Login Cookies:</strong> When you log in to our website, we
            may use login cookies to authenticate and remember your login
            information for future visits. These cookies make it more convenient
            for you to access our services and maintain your session.
          </li>
          <li>
            <strong>Preference Cookies:</strong> Preference cookies are used to
            remember your preferences and personalize your experience on our
            website. They enable us to remember your language preferences,
            display settings, and other customizable features.
          </li>
        </ul>

        <h3>Third-Party Cookies</h3>
        <p>
          We may also use third-party cookies on our website. These cookies are
          placed by external parties and serve various purposes. The third-party
          cookie used on our site is:
        </p>
        <ul>
          <li>
            <strong>Plausible (Analytics):</strong> Plausible is an analytics
            technology that helps us measure and analyze website traffic and
            user behavior. It provides us with statistical insights to optimize
            our website's performance and enhance user experience. The
            information collected by Plausible cookies is anonymized and does
            not contain any personally identifiable information.
          </li>
        </ul>
        <p>
          Please note that third-party cookies are subject to the respective
          third-party's privacy policies. We do not have control over the
          information collected by these cookies and recommend reviewing the
          privacy policies of the respective third parties.
        </p>

        <p>
          For further information on how we handle your data and protect your
          privacy, please refer to our Privacy Policy.
        </p>

        <p>
          <strong>Last updated: [Date]</strong>
        </p>

        <h3>How to Manage and Delete Cookies</h3>
        <p>
          Most web browsers allow you to manage your cookie preferences. You can
          set your browser to refuse cookies or delete certain cookies.
          Generally, you should also be able to manage similar technologies in
          the same way that you manage cookies – using your browsers'
          preferences.
        </p>

        <p>Here is how you can do it in different browsers:</p>
        <ul>
          <li>
            <strong>Google Chrome:</strong> Go to Settings → Privacy and
            security → Site Settings → Cookies and site data. Here, you can
            Clear cookies and site data as well as setting the browser to Block
            third-party cookies.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Go to Options → Privacy & Security
            → Cookies and Site Data. You can Clear Data here, or you can set the
            browser to delete cookies every time you quit the browser.
          </li>
          <li>
            <strong>Safari:</strong> Go to Preferences → Privacy → Cookies and
            website data. You can then Block all cookies or remove specific
            cookies.
          </li>
          <li>
            <strong>Internet Explorer:</strong> Go to Settings → Internet
            options → General → Browsing history → Settings → Temporary Internet
            Files and Website Files. Here, you can Delete files or set the
            browser to delete browser history on exit.
          </li>
        </ul>

        <p>
          Please be aware that if you choose to block cookies, you may not be
          able to sign in or use those features, and preferences that are
          dependent on cookies may be lost. If you choose to delete cookies,
          settings and preferences controlled by those cookies will be deleted
          and may need to be recreated.
        </p>

        <p>This cookie policy was generated with the help of biscuits.ai</p>
      </div>
    </div>
  );
}
