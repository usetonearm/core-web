import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { ExternalLink, Loader2, PlusCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { createTeamAccountsApi } from '@kit/team-accounts/api';
import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';

import { AddStreamSchema } from '../_lib';

type AddStreamProps = {
  account: string;
  accountId: string;
};

interface FormValues {
  title: string;
  url: string;
  email: string;
}

export default function AddStreamDialog({
  accountId,
  account,
}: AddStreamProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const supabase = useSupabase();
  const navigate = useNavigate();

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
    setLoading(true);
    const { title, url, email } = data;

    const isValidURL = await validateURL(url);
    if (!isValidURL) {
      toast.error('The provided URL does not return audio content.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('streams')
        .insert([{ title: title, url: url, account_id: accountId }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        const { error: insertError } = await supabase
          .from('stream_alert_contact')
          .insert({ email: email, stream: data?.id });

        setLoading(false);
        toast.success('Successfully added your stream to be monitored');
        navigate(`/home/${account}/streams/${data.id}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Unexpected error inserting data:', error);
      toast.error('Something went wrong when inserting your stream');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className={'mr-1 h-4'} />
          <span>Add stream</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add stream</DialogTitle>
          <DialogDescription>
            Enter your stream details here and we'll keep an eye on it for you
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-row space-y-4 pb-4">
            <div className="flex-row space-y-1">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="House Beats Radio"
                className="col-span-3"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span className="col-span-4 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex-row space-y-1">
              <div className="align-center inline-flex">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QuestionMarkCircledIcon className="ml-1 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        What URL does your radio stream from?{' '}
                        <a
                          className="underline"
                          target="_blank"
                          href="https://usetonearm.com/docs"
                        >
                          How do I find this
                        </a>
                        <ExternalLink className="ml-1 inline h-3 w-3" />
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="url"
                type="url"
                placeholder="https://yourstream.com/stream"
                className="col-span-3"
                {...register('url', { required: true })}
              />
              {errors.url && (
                <span className="col-span-4 text-sm text-red-500">
                  This field is required
                </span>
              )}
              <p className="pl-2 pt-1 text-xs text-gray-500">
                The URL of your stream
              </p>
            </div>
            <div className="flex-row space-y-1">
              <Label htmlFor="email" className="text-right">
                Contact Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="col-span-3"
                {...register('email', { required: true })}
              />
              {errors.title && (
                <span className="col-span-4 text-sm text-red-500">
                  This field is required
                </span>
              )}
              <p className="pl-2 pt-1 text-xs text-gray-500">
                This is the email we'll contact for any alerts
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add stream
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
