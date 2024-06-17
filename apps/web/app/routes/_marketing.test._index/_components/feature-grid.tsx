import {
  Bell,
  Calendar,
  CalendarCheck,
  Cog,
  Dog,
  File,
  StarIcon,
} from 'lucide-react';

import { BentoCard, BentoGrid } from '~/components/ui/bento-grid';

import { IntegrationsFeature } from './integrations';
import { NotificationsFeature } from './notifications';

const features = [
  {
    Icon: File,
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: Dog,
    name: 'Full text search',
    description: 'Search through all your files in one place.',
    href: '/',
    cta: 'Learn more',
    background: <NotificationsFeature />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: Calendar,
    name: 'Calendar',
    description: 'Use the calendar to filter your files by date.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: Bell,
    name: 'Notifications',
    description:
      'Get notified when someone shares a file or mentions you in a comment.',
    href: '/',
    cta: 'Learn more',
    background: <IntegrationsFeature />,
    className: 'lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-2',
  },
];

export function FeatureGrid() {
  return (
    <BentoGrid>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
