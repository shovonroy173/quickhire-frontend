'use client';

import dynamic from 'next/dynamic';

const UsersPage = dynamic(() => import('@/features/user/pages/UsersPage'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-64 animate-pulse rounded bg-gray-100" />
    </div>
  ),
});

export default function UsersRoutePage() {
  return <UsersPage />;
}
