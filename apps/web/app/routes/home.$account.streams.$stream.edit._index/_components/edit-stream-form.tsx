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

import { EditStreamSchema } from '../_lib/edit-stream-schema';

interface FormValues {
  title: string;
  url: string;
}

type Status = 'online' | 'pending' | 'silence' | 'error' | 'down';

export function EditStreamForm({
  stream,
  account,
}: {
  account: string;
  stream: {
    id: string;
    status: Status;
    title: string;
    url: string;
  };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, url } = data;

    const isValidURL = await validateURL(url);
    if (!isValidURL) {
      toast.error('The provided URL does not return audio content.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('streams')
        .update({ title: title, url: url })
        .eq('id', stream.id);

      if (error) {
        console.error('Error updating data:', error);
      } else {
        console.log('Stream updated successfully');
        toast.success('Successfully updated your stream');
      }
    } catch (error) {
      console.error('Unexpected error updating data:', error);
      toast.error('Something went wrong when updating your stream');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Where is your stream hosted?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Title</Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full"
                  defaultValue={stream.title}
                  {...register('title', { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">URL</Label>
                <Input
                  id="url"
                  type="url"
                  className="w-full"
                  defaultValue={stream.url}
                  {...register('url', { required: true })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Update Stream</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
