import { Link, MetaFunction } from '@remix-run/react';
import {
  ArrowRight,
  Bell,
  ChevronRight,
  CreditCard,
  Grid2x2Check,
  LayoutDashboard,
  Lock,
  Quote,
  Radio,
  Sparkle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PricingTable } from '@kit/billing-gateway/marketing';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';

import { SitePageHeader } from '../_marketing/_components/site-page-header';

export const meta = () => {
  return [
    {
      title: 'About · Tonearm',
    },
  ];
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col space-y-4 xl:space-y-8'}>
      <SitePageHeader
        title={t('marketing:about')}
        subtitle={t('marketing:aboutSubtitle')}
      />
      <div className="container columns-1 gap-6 space-y-6 pb-16 md:columns-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="rounded-lg bg-purple-100 px-3 py-1 text-purple-800">
                  Who we are
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In 2019 me and my best mate built and launched an internet radio
                station called{' '}
                <a
                  className="underline"
                  href="https://nomad.radio"
                  target="_blank"
                >
                  Nomad Radio
                </a>
                . We ran this station for over five years and at our peak had
                over <b>eighty</b> residents in our community
              </p>
              <p>
                Both of us were dedicating our evenings and weekends to the
                operating of the station, and the larger we grew, the more
                technical issues we ran into. With so many residents coming and
                going from our studio, there were times when the stream was
                accidentally disconnected, or our volume was set too low!
              </p>
              <p>
                So we built a tool that would listen to our stream 24/7 and let
                us know instantly if our stream was having issues. That tool was
                the foundation upon which Tonearm was created. Built by radio
                operators, for for radio operators.
              </p>
              <div>
                <p>
                  <b>Oscar (The redhead)</b>
                </p>
                <p>
                  <b>Founder of Tonearm & Nomad Radio</b>
                </p>
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
        <img
          src="/images/about/oscar.jpg"
          className="min-h-60 rounded-lg object-cover"
          alt="Oscar at the studio"
        />
        <img
          src="/images/about/jake-studio.jpg"
          className="min-h-60 rounded-lg"
          alt="Jake behind the decks"
        />
        <img
          src="/images/about/oscar-and-isaac.jpg"
          className="min-h-60 rounded-lg"
          alt="Nomad Radio's co-founders"
        />
        <img
          src="/images/about/77.jpeg"
          className="min-h-60 rounded-lg object-cover"
          alt="Our launch party at 77"
        />
        <img
          src="/images/about/eddy-avenue.jpeg"
          className="min-h-60 rounded-lg object-cover"
          alt="The eddy avenue studio"
        />
        <img
          src="/images/about/isaac-bike.jpeg"
          className="min-h-60 rounded-lg object-cover"
          alt="Isaac getting around the studio"
        />
        <img
          src="/images/about/marrickville-penthouse.jpeg"
          className="min-h-60 rounded-lg object-cover"
          alt="The marrickville penthouse"
        />
        <img
          src="/images/about/marrickville.jpeg"
          className="min-h-60 rounded-lg object-cover"
          alt="Our marrickville studio"
        />
      </div>

      <div className={'container flex flex-col space-y-8 pb-16'}>
        <div>
          <Button asChild variant={'outline'}>
            <Link to={'/contact'}>
              <span>
                <Trans i18nKey={'marketing:contactFaq'} />
              </span>

              <ArrowRight className={'ml-2 w-4'} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
