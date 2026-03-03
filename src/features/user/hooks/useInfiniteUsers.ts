'use client';

import { useMemo } from 'react';
import { useGetUsersQuery, UsersQueryArgs } from '../userApi';
import { PAGINATION } from '@/lib/constants';

interface UseInfiniteUsersArgs {
  page: number;
  search: string;
}

export const useInfiniteUsers = ({ page, search }: UseInfiniteUsersArgs) => {
  const query = useMemo<UsersQueryArgs>(
    () => ({
      page,
      limit: PAGINATION.defaultLimit,
      search: search || undefined,
    }),
    [page, search]
  );

  return useGetUsersQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
};
