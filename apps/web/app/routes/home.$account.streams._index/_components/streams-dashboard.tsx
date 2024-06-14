import { useMemo } from 'react';

import { Link } from '@remix-run/react';
import {
  ArrowDown,
  ArrowUp,
  CircleCheck,
  CircleX,
  LoaderCircle,
  Menu,
  Target,
} from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';

import { Database } from '@kit/supabase/database';
import { Badge } from '@kit/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { CardButton } from '@kit/ui/card-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';

import AddStreamDialog from './add-stream';
import { EmptyStreamsPlaceholder } from './empty-streams-placeholder';

type Stream = Database['public']['Tables']['streams']['Row'];

type StreamsDashboardProps = {
  streams: Stream[] | null;
  account: string;
  accountId: string;
};

export default function StreamsDashboard({
  streams,
  account,
  accountId,
}: StreamsDashboardProps) {
  return (
    <div>
      {streams && streams.length > 0 ? (
        <div className={'flex flex-col space-y-6 pb-36'}>
          <div className={'grid grid-cols-1 gap-4'}>
            {streams?.map((stream: Stream) => StreamListItem(stream, account))}
          </div>
        </div>
      ) : (
        <EmptyStreamsPlaceholder accountId={accountId} />
      )}
    </div>
  );
}

function StreamListItem(stream: Stream, account: string) {
  const color = useMemo(() => {
    switch (stream.status) {
      case 'online':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'silence':
      case 'error':
      case 'down':
        return 'text-red-600';
    }
  }, [stream.status]);

  return (
    <Link to={`/home/${account}/streams/${stream.id}`} key={stream.id}>
      <Card
        key={stream.id}
        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-900"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="flex w-16 items-center justify-center">
              <StatusIcon status={stream.status} />
            </div>
            <div className="justify-self-start">
              <div className="font-medium">
                <span>{stream.title}</span>
              </div>
              <div className={`text-sm`}>
                <span className={`${color} font-medium`}>
                  {stream.status.charAt(0).toUpperCase() +
                    stream.status.slice(1)}
                  {' · '}
                </span>
                <span className="text-gray-400">{'23h'}</span>
              </div>
              <div className="text-sm text-gray-400">
                <span>{stream.url}</span>
              </div>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span
                  className={'flex items-center gap-2 text-xs text-gray-400'}
                >
                  <Target size="20px" />
                  <span>1m</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Checks every 1 minute</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </Link>
  );
}

function StatusIcon(
  props: React.PropsWithChildren<{
    status: 'online' | 'pending' | 'silence' | 'error' | 'down';
  }>,
) {
  const color = useMemo(() => {
    switch (props.status) {
      case 'online':
        return 'bg-green-400';
      case 'pending':
        return 'bg-yellow-400';
      case 'silence':
      case 'error':
      case 'down':
        return 'bg-red-400';
    }
  }, [props.status]);

  return (
    // <div>
    //   <span className={`flex items-center gap-2 font-normal text-${color}`}>
    <div className={`h-3 w-3 ${color} rounded-full`}></div>
    //     <span>{props.status}</span>
    //   </span>
    // </div>
  );
}
