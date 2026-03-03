'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/atoms/Button';
import { useCreateApplicationMutation } from '@/features/application/applicationApi';
import { useMeQuery } from '@/features/user/userApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { pushToast } from '@/features/ui/uiSlice';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email'),
  resumeLink: z.url('Enter a valid resume URL'),
  coverNote: z.string().min(10, 'Cover note must be at least 10 characters'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  jobId: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { data: me } = useMeQuery(undefined, { skip: !token || Boolean(currentUser) });
  const loggedInUser = currentUser ?? me ?? null;
  const [expanded, setExpanded] = useState(false);
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const appliedStorageKey = loggedInUser?.email
    ? `quickhire_applied_${jobId}_${loggedInUser.email.toLowerCase()}`
    : null;
  const isApplied =
    typeof window !== 'undefined' && appliedStorageKey
      ? window.localStorage.getItem(appliedStorageKey) === '1'
      : false;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      resumeLink: '',
      coverNote: '',
    },
  });

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    setValue('name', loggedInUser.name);
    setValue('email', loggedInUser.email);
  }, [loggedInUser, setValue]);

  const extractErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const data = (error as { data?: { message?: string } }).data;
      if (typeof data?.message === 'string') {
        return data.message;
      }
    }
    return 'Failed to submit application';
  };

  const startApplication = () => {
    if (!token) {
      dispatch(pushToast({ type: 'info', title: 'Please log in first to apply' }));
      const redirectPath = pathname || '/';
      router.push(`/auth?mode=login&redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }

    if (!loggedInUser) {
      dispatch(pushToast({ type: 'info', title: 'Loading your profile, please try again' }));
      return;
    }

    if (isApplied) {
      return;
    }

    setExpanded(true);
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createApplication({
        jobId,
        name: values.name,
        email: values.email,
        resumeLink: values.resumeLink,
        coverNote: values.coverNote,
      }).unwrap();

      dispatch(pushToast({ type: 'success', title: 'Application submitted successfully' }));
      if (appliedStorageKey && typeof window !== 'undefined') {
        window.localStorage.setItem(appliedStorageKey, '1');
      }
      setExpanded(false);
      reset({
        name: loggedInUser?.name ?? '',
        email: loggedInUser?.email ?? '',
        resumeLink: '',
        coverNote: '',
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      const alreadyApplied = message.toLowerCase().includes('already applied');

      if (alreadyApplied) {
        if (appliedStorageKey && typeof window !== 'undefined') {
          window.localStorage.setItem(appliedStorageKey, '1');
        }
        setExpanded(false);
      }

      dispatch(pushToast({ type: 'error', title: message }));
    }
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Apply for this job</h2>
      {!expanded ? (
        <Button onClick={startApplication} fullWidth disabled={isApplied}>
          {isApplied ? 'Already Applied' : token ? 'Start Application' : 'Login to Apply'}
        </Button>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              readOnly
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              readOnly
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Resume link (URL)</label>
            <input
              type="url"
              {...register('resumeLink')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.resumeLink ? <p className="mt-1 text-xs text-red-600">{errors.resumeLink.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cover note</label>
            <textarea
              {...register('coverNote')}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.coverNote ? <p className="mt-1 text-xs text-red-600">{errors.coverNote.message}</p> : null}
          </div>
          <div className="flex gap-2">
            <Button type="submit" loading={isLoading}>
              Apply Now
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setExpanded(false);
                reset({
                  name: loggedInUser?.name ?? '',
                  email: loggedInUser?.email ?? '',
                  resumeLink: '',
                  coverNote: '',
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplicationForm;
