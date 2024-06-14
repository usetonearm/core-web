import { Heading } from '@kit/ui/heading';

export function EmptyChecksPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
      <div className="flex flex-col items-center space-y-1">
        <Heading level={3}>
          We're waiting for your first check to complete
        </Heading>

        <Heading
          className="text-muted-foreground font-sans font-medium"
          level={5}
        >
          We'll be one moment while we get the status of your stream
        </Heading>
      </div>
      <div className="mt-8 flex w-8 justify-center">
        <div className="relative flex h-8 w-8">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-500 opacity-75`}
          ></span>
          <span
            className={`relative inline-flex h-8 w-8 rounded-full bg-yellow-500`}
          ></span>
        </div>
      </div>
    </div>
  );
}
