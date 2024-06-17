import { Link } from '@remix-run/react';

import { cn } from '@kit/ui/utils';

function LogoImage({
  className,
  width = 140,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <img
      src="/images/logo-transparent.png"
      className={className}
      width={width}
      alt="Tonearm logo"
    ></img>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link aria-label={label ?? 'Home Page'} to={href ?? '/'}>
      <LogoImage className={className} />
    </Link>
  );
}
