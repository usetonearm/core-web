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

import { StreamHeader } from '../home.$account.streams.$stream._index/_components/stream-header';
import { EditStreamForm } from './_components/edit-stream-form';
import { EditStreamSchema } from './_lib/edit-stream-schema';

export const loader = async (args: LoaderFunctionArgs) => {
  const i18n = await createI18nServerInstance(args.request);

  await requireUserLoader(args.request);
  const supabase = getSupabaseServerClient(args.request);

  const { data: stream, error } = await supabase
    .from('streams')
    .select('*')
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

interface FormValues {
  title: string;
  url: string;
}

export default function StreamEditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { stream, account } = useLoaderData<typeof loader>();

  const supabase = useSupabase();

  const form = useForm({
    resolver: zodResolver(EditStreamSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const validateURL = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      return contentType?.includes('audio/mpeg') ?? false;
    } catch (error) {
      console.error('Error validating URL:', error);
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //   console.log(data);
  //   const { title, url } = data;

  //   const isValidURL = await validateURL(url);
  //   if (!isValidURL) {
  //     toast.error('The provided URL does not return audio content.');
  //     return;
  //   }

  // try {
  //   const { data, error } = await supabase
  //     .from('streams')
  //     .update([{ title: title, url: url }])
  //     .eq('id', stream.id);

  //   if (error) {
  //     console.error('Error updating data:', error);
  //   } else {
  //     console.log('Stream updated successfully');
  //     toast.success('Successfully updated your stream');
  //   }
  // } catch (error) {
  //   console.error('Unexpected error updating data:', error);
  //   toast.error('Something went wrong when updating your stream');
  // }
  // };

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
      </ClientOnly>
    </>
  );
}
