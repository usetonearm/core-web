import { useState } from 'react';

import { Link } from '@remix-run/react';

import { CreateTeamAccountDialog } from '@kit/team-accounts/components';
import { Button } from '@kit/ui/button';
import {
  CardButton,
  CardButtonHeader,
  CardButtonTitle,
} from '@kit/ui/card-button';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';

import { UserWorkspace } from '../_lib/load-user-workspace.server';

export function HomeAccountsList({
  accounts,
}: {
  accounts: UserWorkspace['accounts'];
}) {
  return <HomeAccountsListEmptyState />;
}

function HomeAccountsListEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-24">
      <div className="flex flex-col items-center space-y-1">
        <Heading level={2}>
          <Trans i18nKey={'account:noTeamsYet'} />
        </Heading>

        <Heading
          className="text-muted-foreground font-sans font-medium"
          level={4}
        >
          <Trans i18nKey={'account:createTeam'} />
        </Heading>
      </div>

      <HomeAddAccountButton />
    </div>
  );
}

function HomeAddAccountButton() {
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  return (
    <>
      <Button onClick={() => setIsAddingAccount(true)}>
        <Trans i18nKey={'account:createTeamButtonLabel'} />
      </Button>

      <CreateTeamAccountDialog
        isOpen={isAddingAccount}
        setIsOpen={setIsAddingAccount}
      />
    </>
  );
}
