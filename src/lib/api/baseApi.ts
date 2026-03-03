import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { env } from '@/lib/env';
import { pushToast } from '@/features/ui/uiSlice';
import { AUTH_STORAGE_KEY } from '@/lib/constants';

type FetchBaseQueryErrorData = {
  message?: string;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiUrl,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }

    return headers;
  },
});

export const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if ('error' in result && result.error) {
    const data = result.error as { data?: FetchBaseQueryErrorData };
    const message =
      data.data?.message ??
      (typeof result.error.status === 'number'
        ? `Request failed with status ${result.error.status}`
        : 'Network error');

    api.dispatch(
      pushToast({
        type: 'error',
        title: message,
      })
    );
  }

  return result;
};
