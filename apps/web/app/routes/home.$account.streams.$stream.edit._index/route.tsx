import { lazy, useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { verifyCsrfToken } from '@kit/csrf/server';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { ClientOnly } from '@kit/ui/client-only';
import { Form } from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { requireUserLoader } from '~/lib/require-user-loader';
import { updateContactsAction } from '~/lib/streams/streams-actions-service';

import { StreamHeader } from '../home.$account.streams.$stream._index/_components/stream-header';
import { AddContactsForm } from './_components/add-contacts-form';
import { EditStreamForm } from './_components/edit-stream-form';
import { UpdateContactsSchema } from './_lib/add-contacts-schema';
import { EditStreamSchema } from './_lib/edit-stream-schema';

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: stream, error } = await supabase
    .from('streams')
    .select('*, stream_alert_contact(*)')
    .eq('id', args.params.stream as string)
    .single();

  if (!stream) return;

  const account = args.params.account as string;
  const title = 'Edit: ' + stream.title;

  return {
    contacts: stream.stream_alert_contact,
    title,
    account,
    stream,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title + ' · Tonearm',
    },
  ];
};

export default function StreamEditPage() {
  const { stream, account, contacts } = useLoaderData<typeof loader>();

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
            <BreadcrumbLink asChild>
              <Link to={`/home/${account}/streams/${stream.id}`}>
                {stream.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Edit</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <StreamHeader account={account} stream={stream} />
      <ClientOnly>
        <EditStreamForm account={account} stream={stream} />
        <AddContactsForm
          //@ts-ignore
          existingContacts={contacts}
          streamId={stream.id}
        />
      </ClientOnly>
    </>
  );
}

export const action = async function (args: ActionFunctionArgs) {
  const client = getSupabaseServerClient(args.request);
  const json = await args.request.json();
  const data = await UpdateContactsSchema.parseAsync(json);

  await verifyCsrfToken(args.request, data.payload.csrfToken);

  switch (data.intent) {
    case 'update-contacts': {
      return updateContactsAction({ client, data });
    }
  }
};
