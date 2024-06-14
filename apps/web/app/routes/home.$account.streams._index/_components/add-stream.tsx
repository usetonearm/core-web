import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@remix-run/react';
import { PlusCircle } from 'lucide-react';
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

import { AddStreamSchema } from '../_lib';

type AddStreamProps = {
  account: string;
  accountId: string;
};

interface FormValues {
  name: string;
  url: string;
}

export default function AddStreamDialog({
  account,
  accountId,
}: AddStreamProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const supabase = useSupabase();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(AddStreamSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, url } = data;

    try {
      const { data, error } = await supabase
        .from('streams')
        .insert([{ title: name, url: url, account_id: accountId }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting data:', error);
        toast.error('Something went wrong inserting your stream');
      } else {
        toast.success('Successfully added your stream to be monitored');
        //@ts-ignore
        navigate(`/home/${account}/streams/${data.id}`);
      }
    } catch (error) {
      console.error('Unexpected error inserting data:', error);
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

        <Form {...form}>
          <form
            className={'flex flex-col space-y-4'}
            // onSubmit={form.handleSubmit((data) => {
            //   fetcher.submit(data, {
            //     method: 'POST',
            //     encType: 'application/json',
            //   });
            // })}
          >
            <FormField
              name={'name'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>label</FormLabel>

                    <FormControl>
                      <Input maxLength={200} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name={'email'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>label</FormLabel>

                    <FormControl>
                      <Input type={'email'} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button disabled={false} type={'submit'}>
              Send
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
