'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { pushToast } from '@/features/ui/uiSlice';
import UserForm from '@/features/user/components/UserForm';
import UserListItem from '@/features/user/components/UserListItem';
import { User } from '@/features/user/types';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useMeQuery,
  useUpdateUserMutation,
} from '@/features/user/userApi';
import { UserFormValues } from '@/features/user/hooks/useUserForm';
import { useInfiniteUsers } from '@/features/user/hooks/useInfiniteUsers';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useMeQuery(undefined, { skip: !token });
  const { data, isFetching, isLoading, error } = useInfiniteUsers({ page, search });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const selectedUserResult = useGetUserByIdQuery(selectedUserId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [search]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setUsers((prev) => {
      const map = new Map(prev.map((item) => [item.id, item]));
      data.items.forEach((item) => map.set(item.id, item));
      return Array.from(map.values());
    });
  }, [data]);

  const hasMore = useMemo(() => {
    if (!data) {
      return false;
    }

    return page < data.pages;
  }, [data, page]);

  useEffect(() => {
    if (!hasMore || isFetching) {
      return;
    }

    const current = sentinelRef.current;
    if (!current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prev) => prev + 1);
          }
        });
      },
      { rootMargin: '240px' }
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  const handleCreate = useCallback(
    async (values: UserFormValues) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password || 'User123!',
        role: values.role,
      };

      await createUser(payload).unwrap();
      dispatch(pushToast({ type: 'success', title: 'User created successfully' }));
      setUsers([]);
      setPage(1);
    },
    [createUser, dispatch]
  );

  const handleUpdate = useCallback(
    async (values: UserFormValues) => {
      if (!selectedUserId) {
        return;
      }

      await updateUser({
        id: selectedUserId,
        name: values.name,
        email: values.email,
        password: values.password || undefined,
        role: values.role,
      }).unwrap();
      dispatch(pushToast({ type: 'success', title: 'User updated successfully' }));
      setUsers([]);
      setPage(1);
    },
    [dispatch, selectedUserId, updateUser]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteUser({
        id,
        query: { page, limit: 10, search: search || undefined },
      }).unwrap();
      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (selectedUserId === id) {
        setSelectedUserId(null);
      }
      dispatch(pushToast({ type: 'success', title: 'User deleted successfully' }));
    },
    [deleteUser, dispatch, page, search, selectedUserId]
  );

  if (!token) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-3 text-gray-600">Login as admin to manage users.</p>
        <Link href="/auth?mode=login" className="mt-4 inline-block text-blue-600 underline">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.35fr_1fr]">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-3">
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              isActive={selectedUserId === user.id}
              onSelect={setSelectedUserId}
              onDelete={handleDelete}
            />
          ))}
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-16 animate-pulse rounded-lg border border-gray-200 bg-gray-100"
                />
              ))}
            </div>
          ) : null}
          <div ref={sentinelRef} />
          {isFetching && !isLoading ? (
            <p className="text-center text-sm text-gray-500">Loading more...</p>
          ) : null}
          {!hasMore && users.length > 0 ? (
            <p className="text-center text-sm text-gray-500">End of list</p>
          ) : null}
          {error ? <p className="text-sm text-red-600">Failed to load users.</p> : null}
        </div>
      </section>
      <aside className="space-y-4">
        <UserForm
          title="Create user"
          submitLabel="Create"
          loading={isCreating}
          onSubmit={handleCreate}
        />
        {selectedUserResult.data ? (
          <UserForm
            title="Update user"
            initialUser={selectedUserResult.data}
            submitLabel="Update"
            loading={isUpdating}
            onSubmit={handleUpdate}
            onReset={() => setSelectedUserId(null)}
          />
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
            Select a user to update details.
          </div>
        )}
      </aside>
    </div>
  );
}
