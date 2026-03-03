'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useGetMyApplicationsQuery } from '@/features/application/applicationApi';
import { useMeQuery } from '@/features/user/userApi';
import { clearCredentials } from '@/features/user/userSlice';
import { pushToast } from '@/features/ui/uiSlice';

const statusClassByValue: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  reviewed: 'bg-sky-50 text-sky-700 border-sky-200',
  accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { data: me } = useMeQuery(undefined, { skip: !token || Boolean(currentUser) });
  const user = currentUser ?? me ?? null;

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useGetMyApplicationsQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!token) {
      router.push('/auth?mode=login&redirect=%2Fprofile');
    }
  }, [router, token]);

  if (!token) return null;

  const acceptedCount = applications.filter((item) => item.status === 'accepted').length;
  const pendingCount = applications.filter((item) => item.status === 'pending' || item.status === 'reviewed').length;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-600">Track your applications and account details.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/jobs" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
            Browse Jobs
          </Link>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              dispatch(clearCredentials());
              dispatch(pushToast({ type: 'info', title: 'Logged out successfully' }));
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Account</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">{user?.name ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium text-gray-900">{user?.email ?? 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Role</dt>
              <dd className="font-medium capitalize text-gray-900">{user?.role ?? 'user'}</dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-4 lg:col-span-2 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{applications.length}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">In Review</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Accepted</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{acceptedCount}</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
          <button
            type="button"
            className="text-sm font-medium text-blue-600"
            onClick={() => refetch()}
          >
            Refresh
          </button>
        </div>

        {isLoading ? <p className="text-sm text-gray-500">Loading applications...</p> : null}
        {isError ? <p className="text-sm text-red-600">Failed to load applications.</p> : null}

        {!isLoading && !isError && applications.length === 0 ? (
          <p className="text-sm text-gray-500">You have not applied to any jobs yet.</p>
        ) : null}

        {!isLoading && !isError && applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((application) => (
              <article key={application.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{application.job?.title ?? 'Job'}</h3>
                    <p className="text-sm text-gray-600">
                      {application.job?.company ?? 'Company'}{application.job?.location ? ` - ${application.job.location}` : ''}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                      statusClassByValue[application.status] ?? 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Applied on {new Date(application.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <a
                    href={application.resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                  <Link
                    href={`/jobs/${application.jobId}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View Job
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default ProfileScreen;
