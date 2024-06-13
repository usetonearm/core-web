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
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

type AddStreamProps = {
  account: string;
};

interface FormValues {
  name: string;
  url: string;
}

export default function AddStreamDialog({ account }: AddStreamProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const supabase = useSupabase();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, url } = data;

    try {
      const { error } = await supabase
        .from('streams')
        .insert([{ title: name, url: url, account_id: account }]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Stream added successfully');
        toast('Successfully added your stream to be monitored');
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                placeholder="House Beats Radio"
                className="col-span-3"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="col-span-4 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="url" className="text-right">
                URL
              </label>
              <input
                id="url"
                placeholder="https://yourstream.com/stream"
                className="col-span-3"
                {...register('url', { required: true })}
              />
              {errors.url && (
                <span className="col-span-4 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add stream</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
