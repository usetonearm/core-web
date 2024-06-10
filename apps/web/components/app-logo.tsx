import { Link } from '@remix-run/react';

import { cn } from '@kit/ui/utils';

function LogoImage({
  className,
  width = 105,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <img src="/images/bh-logo.png" className={className} width={width}></img>
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
