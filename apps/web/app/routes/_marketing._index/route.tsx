import { Link } from '@remix-run/react';
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

import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';

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
            <Pill>
              <span>
                Internet radio monitoring for radio lovers, by radio lovers
              </span>
            </Pill>

            <div className={'flex flex-col items-center space-y-8'}>
              <HeroTitle>
                <span>No more dead air.</span>
              </HeroTitle>

              <div className={'flex flex-col'}>
                <Heading
                  level={2}
                  className={
                    'text-muted-foreground p-0 text-center font-sans text-2xl font-normal'
                  }
                >
                  <span>Ensure the best experience for all of</span>
                </Heading>

                <Heading
                  level={2}
                  className={
                    'text-muted-foreground p-0 text-center font-sans text-2xl font-normal'
                  }
                >
                  <span>your listeners. Detect silence and</span>
                </Heading>

                <Heading
                  level={2}
                  className={
                    'text-muted-foreground p-0 text-center font-sans text-2xl font-normal'
                  }
                >
                  outages in realtime.
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
            src={`/images/dashboard-demo.webp`}
            alt={`App`}
          />
        </div>
      </div>

      <div className={'container mx-auto'}>
        <div
          className={
            'flex flex-col items-center justify-center space-y-8 py-8 xl:space-y-16 xl:py-16'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-8 text-center'
            }
          >
            <Pill>
              <span>A modern, scalable, and secure SaaS Starter Kit</span>
            </Pill>

            <div className={'flex flex-col space-y-2'}>
              <Heading level={1}>The best tool in the space</Heading>

              <Heading
                level={2}
                className={'text-muted-foreground font-sans font-normal'}
              >
                Trusted by radio station operators around the world
              </Heading>
            </div>
          </div>
          {/* <div className="text-primary max-sm max-w-lg flex-col gap-2 rounded-lg bg-green-50 p-4 shadow-md">
            <Quote />
            <div>
              Broadcast Hound was pivotal in running Nomad Radio. We had
              residents coming in and out of our studio and needed a way to
              ensure there was no dead air as shows changed hosts.
            </div>
            <div className="flex items-center gap-3 text-sm">
              <img
                className="h-12 w-12 rounded-full"
                src="https://media.licdn.com/dms/image/D5603AQERKhAF1LaBZQ/profile-displayphoto-shrink_200_200/0/1667265040428?e=2147483647&v=beta&t=p8u7RuiinqbR2Zaha3t0ew-mM1jsth0Smm1T9NvskbU"
              />
              <div className="flex-column">
                <div className="font-semibold">Isaac Scott</div>
                <div>Operations Director at Nomad Radio</div>
              </div>
            </div>
          </div> */}
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-16">
              <figure className="mx-auto max-w-screen-md">
                <svg
                  className="mx-auto mb-3 h-12 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="text-2xl font-medium text-gray-900 dark:text-white">
                    Broadcast Hound was pivotal in running Nomad Radio. We had
                    residents coming in and out of our studio and needed a way
                    to ensure there was no dead air as shows changed hosts.
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    // src="https://media.licdn.com/dms/image/D5603AQERKhAF1LaBZQ/profile-displayphoto-shrink_200_200/0/1667265040428?e=2147483647&v=beta&t=p8u7RuiinqbR2Zaha3t0ew-mM1jsth0Smm1T9NvskbU"
                    alt="profile picture"
                  />
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">
                      {/* Isaac Scott */}
                    </div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                      Operations Director at Nomad Radio
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      </div>

      <div className={'container mx-auto'}>
        <div
          className={'flex flex-col space-y-16 xl:space-y-32 2xl:space-y-36'}
        >
          <FeatureShowcaseContainer>
            <FeatureContainer>
              <div className={'flex flex-col space-y-6'}>
                <IconContainer className={'bg-green-50 dark:bg-green-500/10'}>
                  <Radio className={'h-5 text-green-500'} />
                </IconContainer>

                <div className={'flex flex-col'}>
                  <Heading level={2}>Enterprise ready monitoring</Heading>

                  <Heading
                    level={3}
                    className={'text-muted-foreground font-sans font-normal'}
                  >
                    Highly robust monitoring for your station
                  </Heading>
                </div>
              </div>

              <div>
                Monitor unlimited streams for downtime and detect silence
                instantly. Ensure your streams are always online and your
                listeners never miss a beat with our automated monitoring
                solution.
              </div>
            </FeatureContainer>

            <FeatureContainer>
              <img
                className="rounded-2xl"
                src={'/images/sign-in.webp'}
                width={'1760'}
                height={'1680'}
                alt={'Sign In'}
              />
            </FeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <FeatureContainer reverse>
              <img
                src={'/images/notifications.png'}
                width={'300'}
                height={'auto'}
                alt={'Dashboard'}
              />
            </FeatureContainer>

            <FeatureContainer>
              <div className={'flex flex-col space-y-6'}>
                <IconContainer className={'bg-indigo-50 dark:bg-indigo-500/10'}>
                  <Bell className={'h-5 text-indigo-500'} />
                </IconContainer>

                <div className={'flex flex-col'}>
                  <Heading level={2}>Alerts & Notifications</Heading>

                  <Heading
                    level={3}
                    className={'text-muted-foreground font-sans font-normal'}
                  >
                    Integrate into your existing notification platform
                  </Heading>
                </div>
              </div>

              <div>
                Stay informed with real-time notifications. Receive push alerts
                via email, text, Slack, or Discord whenever there's an issue
                with your streams. Never miss an important update about your
                stream's status.
              </div>
            </FeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <FeatureContainer>
              <div className={'flex flex-col space-y-6'}>
                <IconContainer className={'bg-blue-50 dark:bg-blue-500/10'}>
                  <Grid2x2Check className={'h-5 text-blue-500'} />
                </IconContainer>

                <div className={'flex flex-col'}>
                  <Heading level={2}>Ready to use</Heading>

                  <Heading
                    level={3}
                    className={'text-muted-foreground font-sans font-normal'}
                  >
                    Built in support for the biggest radio platforms
                  </Heading>
                </div>
              </div>

              <div>
                Out-of-the-box compatibility with popular platforms like
                Radio.co, Airtime.pro, Libretime, and Radio Cult. Integrate
                seamlessly and start monitoring your streams right away.
              </div>
            </FeatureContainer>

            <FeatureContainer>
              <img
                className="rounded-2xl"
                src={'/images/billing.webp'}
                width={'1916'}
                height={'1392'}
                alt={'Billing'}
              />
            </FeatureContainer>
          </FeatureShowcaseContainer>
        </div>
      </div>

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
      {/* <Button asChild variant={'link'}>
        <Link to={'/docs'}>
          <Trans i18nKey={'common:documentation'} />
        </Link>
      </Button> */}

      <Button asChild>
        <Link to={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>
              <Trans i18nKey={'common:getStartedForFree'} />
            </span>

            <ChevronRight
              className={
                'animate-in fade-in slide-in-from-left-8 h-4' +
                'delay-800 zoom-in fill-mode-both duration-1000'
              }
            />
          </span>
        </Link>
      </Button>
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
