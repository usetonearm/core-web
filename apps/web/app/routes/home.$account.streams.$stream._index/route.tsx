import { lazy, useEffect, useMemo, useState } from 'react';

import {
  Link,
  MetaFunction,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from '@remix-run/server-runtime';
import { format, formatDistance } from 'date-fns';
import { BadgeHelp, Cog, Pause, PlusCircle, Send, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Database } from '@kit/supabase/database';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@kit/ui/alert-dialog';
import { Badge } from '@kit/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@kit/ui/breadcrumb';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { ClientOnly } from '@kit/ui/client-only';
import { PageBody } from '@kit/ui/page';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requireUserLoader } from '~/lib/require-user-loader';
import { TeamAccountLayoutPageHeader } from '~/routes/home.$account/_components/team-account-layout-page-header';

import { EmptyChecksPlaceholder } from './_components/empty-checks-placeholder';
import { LatestChecks } from './_components/latest-checks';
import StatusHistory from './_components/status-history';
import { StreamHeader } from './_components/stream-header';
import { StreamStatCards } from './_components/stream-stat-cards';
import { sendTestEmailNotification } from './_lib/server/send-test-notification-email-action.server';

type StatusChange =
  Database['public']['Functions']['get_status_changes_for_stream']['Returns'];
type Check = Database['public']['Tables']['checks']['Row'];

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  const { email } = await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: stream, error } = await supabase
    .from('streams')
    .select('*, checks(*)')
    .eq('id', args.params.stream as string)
    .single();

  if (!stream) return;

  const { data: statusChanges, error: eventError } = await supabase.rpc(
    'get_status_changes_for_stream',
    { p_stream: args.params.stream as string },
  );

  const account = args.params.account as string;
  const title = i18n.t('teams:home.pageTitle');

  return {
    email,
    title,
    account,
    stream,
    statusChanges,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

export default function StreamPage() {
  const { stream, account, email, title, statusChanges } =
    useLoaderData<typeof loader>();
  const supabase = useSupabase();
  const navigate = useNavigate();

  const deleteStream = async (id: string) => {
    try {
      const { error } = await supabase.from('streams').delete().eq('id', id);

      if (error) {
        console.error('Error deleting data:', error);
      } else {
        console.log('Stream deleted successfully');
        toast.success('Successfully deleted stream');
        navigate(`/home/${account}/streams`);
      }
    } catch (error) {
      console.error('Unexpected error deleting data:', error);
    }
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/home/${account}/streams`}>Streams</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{stream.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <StreamHeader account={account} stream={stream} />
      <ClientOnly>
        <div className="flex flex-wrap gap-1 text-slate-500">
          <TestAlertButton email={email as string} />
          {/* <Button variant="ghost">
            <Pause size="18" className="mr-2" />
            Pause
          </Button> */}

          <Link to={`/home/${account}/streams/${stream.id}/edit`}>
            <Button variant="ghost">
              <Cog size="18" className="mr-2" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <Trash size="18" className="mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting this stream can not be undone. Please make sure you
                  want to delete this before continuing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive"
                  onClick={() => deleteStream(stream.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {stream.checks && stream?.checks.length > 0 ? (
          <div className="flex-row gap-4">
            <StreamStatCards stream={stream} />
            {/*@ts-ignore*/}
            <StatusHistory statusChanges={statusChanges} />
            <LatestChecks checks={stream.checks} />
          </div>
        ) : (
          <EmptyChecksPlaceholder />
        )}
        <Alert className="m-auto mt-16 max-w-xl p-4">
          <BadgeHelp />
          <div className="ml-2">
            <AlertTitle className="text-md">Need a hand?</AlertTitle>
            <AlertDescription className="text-sm text-gray-600">
              Need some support? Reach out to our team at
              support@broadcasthound.com
            </AlertDescription>
          </div>
        </Alert>
      </ClientOnly>
    </>
  );
}

export const action = async function ({ request }: ActionFunctionArgs) {
  const json = await request.json();

  return sendTestEmailNotification(json);
};

interface TestAlertButtonProps {
  email: string;
}

export function TestAlertButton({ email }: TestAlertButtonProps) {
  const [state, setState] = useState({
    success: false,
    error: false,
  });

  const fetcher = useFetcher<{
    success: boolean;
  }>();

  const pending = fetcher.state === 'submitting';

  const data = {
    email: email,
  };

  const onSubmit = () => {
    fetcher.submit(data, {
      method: 'POST',
      encType: 'application/json',
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      const success = fetcher.data.success;
      setState({ success, error: !success });
    }
  }, [fetcher.data]);

  if (state.success) {
    toast.success('Test notification sent!');
  }

  if (state.error) {
    toast.error('Failed to send test notification');
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" type="submit">
          <Send size="18" className="mr-2" />
          Send a test alert
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to send?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to send a test notification to
            {/* {email} */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={onSubmit}>
            <AlertDialogAction type="submit" disabled={pending}>
              Send
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
