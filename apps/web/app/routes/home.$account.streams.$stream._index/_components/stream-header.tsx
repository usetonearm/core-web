import { useMemo } from 'react';

import { TeamAccountLayoutPageHeader } from '~/routes/home.$account/_components/team-account-layout-page-header';

export function StreamHeader({
  stream,
  account,
}: {
  account: string;
  stream: {
    status: Status;
    title: string;
    url: string;
  };
}) {
  return (
    <div className="mb-2 mt-3 flex items-center gap-3">
      <StatusIcon status={stream.status} />
      <TeamAccountLayoutPageHeader
        account={account}
        title={stream.title}
        description={stream.url}
      ></TeamAccountLayoutPageHeader>
    </div>
  );
}

type Status = 'online' | 'pending' | 'silence' | 'error' | 'down';

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
    <div className="flex w-8 justify-center">
      <div className="relative flex h-4 w-4">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex h-4 w-4 rounded-full ${color}`}
        ></span>
      </div>
    </div>
  );
}
