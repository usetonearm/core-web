import { lazy, useMemo } from 'react';

import { Link, MetaFunction, useLoaderData } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
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

type Check = Database['public']['Tables']['checks']['Row'];

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  // require user
  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: stream, error } = await supabase
    .from('streams')
    .select('*, checks(*)')
    .eq('id', args.params.stream as string)
    .single();

  if (!stream) return;

  const account = args.params.account as string;
  const title = i18n.t('teams:home.pageTitle');

  return {
    title,
    account,
    stream,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
    },
  ];
};

function StatusIcon(
  props: React.PropsWithChildren<{
    status: 'online' | 'pending' | 'silence' | 'error' | 'down';
  }>,
) {
  const color = useMemo(() => {
    switch (props.status) {
      case 'online':
        return 'bg-green-400';
      case 'pending':
        return 'bg-yellow-400';
      case 'silence':
      case 'error':
      case 'down':
        return 'bg-red-400';
    }
  }, [props.status]);

  return (
    <div className="flex w-8 justify-center">
      <div className="relative flex h-4 w-4">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex h-4 w-4 rounded-full ${color}`}
        ></span>
      </div>
    </div>
  );
}

export default function StreamPage() {
  const data = useLoaderData<typeof loader>();
  const supabase = useSupabase();
  const navigate = useNavigate();

  const deleteStream = async (id: string) => {
    try {
      const { error } = await supabase.from('streams').delete().eq('id', id);

      if (error) {
        console.error('Error deleting data:', error);
      } else {
        console.log('Stream deleted successfully');
        toast('Successfully deleted stream');
        navigate(`/home/${data.account}/streams`);
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
            <Link to={`/home/${data.account}/streams`}>
              <BreadcrumbLink>Streams</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{data.stream.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-3 pt-2">
        <StatusIcon status={data.stream.status} />
        <TeamAccountLayoutPageHeader
          account={data.account}
          title={data.stream.title}
          description={data.stream.url}
        ></TeamAccountLayoutPageHeader>
      </div>
      <ClientOnly>
        <div>
          <div className="flex gap-2 text-slate-500">
            <Button variant="ghost">
              <Send size="18" className="mr-2" />
              Send a test alert
            </Button>
            <Button variant="ghost">
              <Pause size="18" className="mr-2" />
              Pause
            </Button>
            <Button variant="ghost">
              <Cog size="18" className="mr-2" />
              Edit
            </Button>
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
                    onClick={() => deleteStream(data.stream.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div
            className={
              'grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3' +
              ' mt-4 2xl:grid-cols-3'
            }
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Currently {data.stream.status === 'online' ? 'up' : 'down'}{' '}
                  for
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.stream.last_outage ? (
                    <div>
                      {data.stream.last_online ? (
                        <span>
                          {formatDistance(
                            new Date(data.stream.last_outage),
                            new Date(),
                            { includeSeconds: true },
                          )}
                        </span>
                      ) : (
                        <span>Forever</span>
                      )}
                    </div>
                  ) : (
                    <div>
                      {formatDistance(
                        new Date(data.stream.created_at),
                        new Date(),
                        { includeSeconds: true },
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last checked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.stream.last_check ? (
                    <span>
                      {formatDistance(
                        new Date(data.stream.last_check),
                        new Date(),
                        { includeSeconds: true },
                      )}
                      {' ago'}
                    </span>
                  ) : (
                    <span>Never</span>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last outage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.stream.last_outage ? (
                    <div>
                      {formatDistance(
                        new Date(data.stream.last_outage),
                        new Date(),
                        { includeSeconds: true },
                      )}
                      {' ago'}
                    </div>
                  ) : (
                    <div>Never</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Latest checks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[240px]">Time</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.stream.checks.map((item) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {format(item.created_at, 'MMMM dd, yyyy hh:mm:ss a')}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Alert className="m-auto mt-16 max-w-xl p-4">
          <BadgeHelp />
          <div className="ml-2">
            <AlertTitle>Need a hand?</AlertTitle>
            <AlertDescription>
              Need some support? Reach out to our team at
              support@broadcasthound.com
            </AlertDescription>
          </div>
        </Alert>
      </ClientOnly>
    </>
  );
}
