import {
  Bell,
  CalendarCheck,
  Cog,
  Dog,
  File,
  Pill,
  StarIcon,
} from 'lucide-react';

import { Calendar } from '@kit/ui/calendar';
import { Heading } from '@kit/ui/heading';

import { BentoCard, BentoGrid } from '~/components/ui/bento-grid';

import { IntegrationsFeature } from './integrations';
import { NotificationsFeature } from './notifications';

const features = [
  {
    name: 'Out-of-the-box compatibility',
    description:
      'Integrate with Airtime Pro, Radio.co, Icecast and many more providers in minutes',
    background: <IntegrationsFeature />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2',
  },
  {
    name: 'Custom alerting',
    description:
      "Only operate 2 days a week? No worries. Configure your stream to only be monitored when you're on air",
    background: (
      <img
        src="/images/features/calendar.png"
        width="400"
        height="400"
        className="scale-110 object-cover object-top transition-all duration-300 ease-out hover:scale-125"
        alt="Calendar feature"
      />
    ),
    className: 'lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    name: 'Notifications',
    description:
      'Get immediately notified via Email, Discord or Slack when your stream encounters issues',
    background: <NotificationsFeature />,
    className: 'lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2',
  },
];

export function FeatureGrid() {
  return (
    <div className="container mx-auto">
      <div
        className={'flex flex-col items-center justify-center space-y-16 py-16'}
      >
        <div className={'flex flex-col items-center space-y-8 text-center'}>
          <div className={'flex flex-col space-y-2'}>
            <Heading level={1}>The radio operator's toolkit</Heading>

            <Heading
              level={3}
              className={'text-muted-foreground max-w-xl font-sans font-normal'}
            >
              Functionality for every radio. From the hole in the wall
              independent station, to the nationwide broadcaster.
            </Heading>
          </div>
        </div>
      </div>
      <BentoGrid>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
