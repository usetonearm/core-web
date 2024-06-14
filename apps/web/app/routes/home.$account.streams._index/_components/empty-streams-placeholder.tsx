import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';

import AddStreamDialog from './add-stream';

interface Props {
  accountId: string;
  account: string;
}

export function EmptyStreamsPlaceholder({ accountId, account }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-24">
      <div className="flex flex-col items-center space-y-1">
        <Heading level={2}>
          <Trans i18nKey={'account:noStreamsYet'} />
        </Heading>

        <Heading
          className="text-muted-foreground font-sans font-medium"
          level={4}
        >
          <Trans i18nKey={'account:createStream'} />
        </Heading>
      </div>

      <AddStreamDialog account={account} accountId={accountId} />
    </div>
  );
}
