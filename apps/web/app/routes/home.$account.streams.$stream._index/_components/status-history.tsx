import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { format, formatDistance } from 'date-fns';
import {
  Check,
  CircleAlert,
  CircleArrowDown,
  DoorClosed,
  Ellipsis,
  Loader,
  Volume1Icon,
  VolumeX,
} from 'lucide-react';

import { Database } from '@kit/supabase/database';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';

type StatusChange =
  Database['public']['Functions']['get_status_changes_for_stream']['Returns'];

interface StatusHistoryProps {
  statusChanges: StatusChange;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: CircleArrowDown,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: DoorClosed,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: Volume1Icon,
    iconBackground: 'bg-green-500',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online':
      return <Check className="h-4 w-4 text-white" aria-hidden="true" />;
    case 'down':
      return <CircleAlert className="h-4 w-4 text-white" aria-hidden="true" />;
    case 'silence':
      return <VolumeX className="h-4 w-4 text-white" aria-hidden="true" />;
    default:
      return (
        <QuestionMarkIcon className="h-4 w-4 text-white" aria-hidden="true" />
      );
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'down':
      return 'bg-red-500';
    case 'silence':
      return 'bg-yellow-500';
    default:
      return 'bg-blue-500';
  }
};

const getStatusMessage = (status: string) => {
  switch (status) {
    case 'online':
      return 'Stream is live';
    case 'down':
      return 'Stream is unresponsive or erroring';
    case 'silence':
      return 'Stream is up but sending no audio';
    default:
      return 'Stream is in a pending state';
  }
};

export default function StatusHistory({ statusChanges }: StatusHistoryProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Status history</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {statusChanges.map((event, i) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {i !== statusChanges.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          getStatusColor(event.status),
                          'flex h-7 w-7 items-center justify-center rounded-full ring-8 ring-white',
                        )}
                      >
                        {getStatusIcon(event.status)}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm">
                          {getStatusMessage(event.status)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                className={
                                  'flex items-center gap-2 text-xs text-gray-400'
                                }
                              >
                                <time dateTime={event.created_at}>
                                  {formatDistance(
                                    new Date(event.created_at),
                                    new Date(),
                                    {
                                      includeSeconds: true,
                                    },
                                  )}
                                  {' ago'}
                                </time>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>
                                {format(event.created_at, 'yyyy-MM-dd')}
                              </span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
