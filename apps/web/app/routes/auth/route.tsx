import { Outlet } from '@remix-run/react';
import { ThemeProvider } from 'next-themes';

import { AuthLayoutShell } from '@kit/auth/shared';

import { AppLogo } from '~/components/app-logo';

export default function AuthLayout() {
  return (
    <AuthLayoutShell Logo={AppLogo}>
      <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
        defaultTheme="light"
        enableColorScheme={false}
      >
        <Outlet />
      </ThemeProvider>
    </AuthLayoutShell>
  );
}
