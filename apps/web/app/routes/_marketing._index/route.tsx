import { Link, MetaFunction } from '@remix-run/react';
import {
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

import { PricingTable } from '@kit/billing-gateway/marketing';
import { Button } from '@kit/ui/button';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

import ShimmerButton from '~/components/ui/shimmer-button';
import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';

import { FeatureGrid } from './_components/feature-grid';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Tonearm',
    },
  ];
};

export default function Index() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-16'}>
      <div className={'container mx-auto flex flex-col space-y-20'}>
        <div
          className={
            'flex flex-col items-center md:flex-row' +
            'animate-in fade-in mx-auto flex-1 justify-center' +
            'zoom-in-95 slide-in-from-top-24 duration-500'
          }
        >
          <div
            className={
              'flex w-full flex-1 flex-col items-center space-y-8 xl:space-y-12 2xl:space-y-14'
            }
          >
            {/* <Pill>
              <span>Internet radio monitoring for music lovers</span>
            </Pill> */}

            <div className={'flex flex-col items-center space-y-8'}>
              <HeroTitle>
                <span>No more dead air.</span>
              </HeroTitle>

              <div className={'flex flex-col'}>
                <Heading
                  level={2}
                  className={
                    'text-muted-foreground max-w-md p-0 text-center font-sans text-2xl font-normal'
                  }
                >
                  <span>
                    Best-in-class internet radio monitoring and silence
                    detection. Keep your streams online, and your listeners
                    locked-in.
                  </span>
                </Heading>
              </div>

              <MainCallToActionButton />
            </div>
          </div>
        </div>

        <div
          className={
            'animate-in fade-in mx-auto flex max-w-6xl justify-center py-12' +
            'slide-in-from-top-16 fill-mode-both delay-300 duration-1000'
          }
        >
          <img
            className={
              'delay-250 animate-in fade-in zoom-in-50 fill-mode-both rounded-lg border duration-1000 ease-out'
            }
            width={1689}
            height={1057}
            src={'/images/features/showcase.png'}
            alt={`App`}
          />
        </div>
      </div>

      <FeatureGrid />

      <div className={'container mx-auto'}>
        <div
          className={
            'flex flex-col items-center justify-center space-y-16 py-16'
          }
        >
          <div className={'flex flex-col items-center space-y-8 text-center'}>
            <Pill>Get started for free. No credit card required.</Pill>

            <div className={'flex flex-col space-y-2'}>
              <Heading level={1}>Fair pricing for all stations</Heading>

              <Heading
                level={2}
                className={'text-muted-foreground font-sans font-normal'}
              >
                Monitoring that won't break the budget
              </Heading>
            </div>
          </div>

          <div className={'w-full'}>
            <PricingTable
              config={billingConfig}
              paths={{
                signUp: pathsConfig.auth.signUp,
                return: pathsConfig.app.home,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'font-heading flex flex-col text-center text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl'
      }
    >
      {children}
    </h1>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'text-muted-foreground dark:shadow-primary/20 rounded-full border-2 border-green-300 bg-green-50 px-4 py-2 text-center text-sm text-green-700 shadow'
      }
    >
      <Sparkle className={'inline-block h-4 text-green-700'} />
      {props.children}
    </h2>
  );
}

function FeatureShowcaseContainer(props: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0' +
        ' lg:space-x-24'
      }
    >
      {props.children}
    </div>
  );
}

function FeatureContainer(
  props: React.PropsWithChildren<{
    className?: string;
    reverse?: boolean;
  }>,
) {
  return (
    <div
      className={cn(
        props.className,
        'flex w-full flex-col space-y-6 lg:w-6/12',
        {
          'order-2 mt-8 lg:order-none lg:mt-0': props.reverse,
        },
      )}
    >
      {props.children}
    </div>
  );
}

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-2'}>
      <Link to={'/auth/sign-up'}>
        <ShimmerButton>Sign up for free</ShimmerButton>
      </Link>
    </div>
  );
}

function IconContainer(
  props: React.PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <div className={'flex'}>
      <span
        className={cn(
          'flex items-center justify-center rounded-lg p-3',
          props.className,
        )}
      >
        {props.children}
      </span>
    </div>
  );
}
