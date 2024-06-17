import { ReactNode } from 'react';

import { cn } from '@kit/ui/utils';

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      // light styles
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      className,
    )}
  >
    <div className="overflow-hidden">{background}</div>

    <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
