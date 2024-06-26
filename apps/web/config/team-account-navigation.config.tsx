import {
  CreditCard,
  LayoutDashboard,
  Plug,
  RadioTower,
  Settings,
  Users,
} from 'lucide-react';

import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import featureFlagsConfig from './feature-flags.config';
import pathsConfig from './paths.config';

const iconClasses = 'w-4';

const getRoutes = (account: string) => [
  // {
  //   label: 'common:dashboardTabLabel',
  //   path: pathsConfig.app.accountHome.replace('[account]', account),
  //   Icon: <LayoutDashboard className={iconClasses} />,
  //   end: true,
  // },
  {
    label: 'common:streamsTabLabel',
    path: pathsConfig.app.accountStreams.replace('[account]', account),
    Icon: <RadioTower className={iconClasses} />,
    end: false,
  },
  {
    label: 'common:integrationsTabLabel',
    path: pathsConfig.app.accountIntegrations.replace('[account]', account),
    Icon: <Plug className={iconClasses} />,
    end: true,
  },
  {
    label: 'common:settingsTabLabel',
    collapsible: false,
    children: [
      {
        label: 'common:settingsTabLabel',
        path: createPath(pathsConfig.app.accountSettings, account),
        Icon: <Settings className={iconClasses} />,
      },
      {
        label: 'common:accountMembers',
        path: createPath(pathsConfig.app.accountMembers, account),
        Icon: <Users className={iconClasses} />,
      },
      featureFlagsConfig.enableTeamAccountBilling
        ? {
            label: 'common:billingTabLabel',
            path: createPath(pathsConfig.app.accountBilling, account),
            Icon: <CreditCard className={iconClasses} />,
          }
        : undefined,
    ].filter(Boolean),
  },
];

export function getTeamAccountSidebarConfig(account: string) {
  return NavigationConfigSchema.parse({
    routes: getRoutes(account),
    style: import.meta.env.VITE_TEAM_NAVIGATION_STYLE,
  });
}

function createPath(path: string, account: string) {
  return path.replace('[account]', account);
}
