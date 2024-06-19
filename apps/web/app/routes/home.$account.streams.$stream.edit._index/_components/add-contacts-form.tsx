import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from '@remix-run/react';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useCsrfToken } from '@kit/csrf/client';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { If } from '@kit/ui/if';
import { Input } from '@kit/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import { Trans } from '@kit/ui/trans';

import { ContactsSchema } from '../_lib/add-contacts-schema';

type ContactModel = ReturnType<typeof createEmptyContactModel>;

const MAX_INVITES = 5;

export function AddContactsForm({
  existingContacts,
  streamId,
  // onSubmit,
}: {
  existingContacts: ContactModel[];
  // onSubmit: (data: { contacts: ContactModel[]; streamId: string }) => void;
  streamId: string;
}) {
  const { t } = useTranslation('teams');
  const csrfToken = useCsrfToken();

  const fetcher = useFetcher<{
    success: boolean;
  }>();

  const pending = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        toast.success('Updated your alert contacts');
      } else {
        toast.error('Failed to update alert contacts');
      }
    }
  }, [fetcher.data, t]);

  const form = useForm({
    resolver: zodResolver(ContactsSchema),
    shouldUseNativeValidation: true,
    reValidateMode: 'onSubmit',
    defaultValues: {
      contacts: existingContacts,
      streamId,
      csrfToken,
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'contacts',
  });

  const onSubmit = (payload: {
    contacts: ContactModel[];
    streamId: string;
  }) => {
    console.log(payload);
    fetcher.submit(
      {
        intent: 'update-contacts',
        payload,
      },
      {
        method: 'POST',
        encType: 'application/json',
      },
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Alert Contacts</CardTitle>
        <CardDescription>
          Who should we notify when your stream goes down?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className={'flex flex-col space-y-8'}
            data-test={'add-contacts-form'}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-4">
              {fieldArray.fields.map((field, index) => {
                const isFirst = index === 0;

                const emailInputName = `contacts.${index}.email` as const;

                return (
                  <div data-test={'add-contacts-form-item'} key={field.id}>
                    <div className={'flex items-end space-x-0.5 md:space-x-2'}>
                      <div className={'w-7/12'}>
                        <FormField
                          name={emailInputName}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <If condition={isFirst}>
                                  <FormLabel>{t('emailLabel')}</FormLabel>
                                </If>

                                <FormControl>
                                  <Input
                                    data-test={'contact-email-input'}
                                    placeholder={t('emailPlaceholder')}
                                    type="email"
                                    required
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      <div className={'flex w-[40px] justify-end'}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={'ghost'}
                                size={'icon'}
                                type={'button'}
                                disabled={fieldArray.fields.length <= 1}
                                data-test={'remove-contact-button'}
                                aria-label={t('removeInviteButtonLabel')}
                                onClick={() => {
                                  fieldArray.remove(index);
                                  form.clearErrors(emailInputName);
                                }}
                              >
                                <X className={'h-4 lg:h-5'} />
                              </Button>
                            </TooltipTrigger>

                            <TooltipContent>Remove contact</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                );
              })}

              <If condition={fieldArray.fields.length < MAX_INVITES}>
                <div>
                  <Button
                    data-test={'add-new-invite-button'}
                    type={'button'}
                    variant={'link'}
                    size={'sm'}
                    disabled={pending}
                    onClick={() => {
                      fieldArray.append(createEmptyContactModel());
                    }}
                  >
                    <Plus className={'mr-1 h-3'} />

                    <span>
                      <Trans i18nKey={'teams:addAnotherMemberButtonLabel'} />
                    </span>
                  </Button>
                </div>
              </If>
            </div>

            <Button type={'submit'} disabled={pending} className="w-min">
              {pending ? 'Saving...' : 'Save contacts'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function createEmptyContactModel() {
  return { email: '' };
}
