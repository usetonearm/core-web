import type { User } from '@supabase/supabase-js';

import { AppLogo } from '~/components/app-logo';

import { SiteHeaderAccountSection } from './site-header-account-section';
import { SiteNavigation } from './site-navigation';

export function SiteHeader(props: { user?: User | null }) {
  return (
    <div
      className={
        'bg-background/80 dark:bg-background/50 dark:shadow-primary/10 sticky top-0 z-10 w-full shadow-sm backdrop-blur-md'
      }
    >
      <div className={'px-4 lg:px-8'}>
        <div className="grid h-14 grid-cols-3 items-center">
          <div>
            <AppLogo className={'w-[140px]'} />
          </div>

          <div className={'order-first md:order-none'}>
            <SiteNavigation />
          </div>

          <div className={'flex items-center justify-end space-x-1'}>
            <SiteHeaderAccountSection user={props.user ?? null} />
          </div>
        </div>
      </div>
    </div>
  );
}
