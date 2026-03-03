import { createApi } from '@reduxjs/toolkit/query/react';
import { setCredentials, setCurrentUser } from './userSlice';
import { ApiResponse, PaginatedResult } from '@/lib/api/types';
import { baseQueryWithInterceptor } from '@/lib/api/baseApi';
import { AuthResult, LoginPayload, RegisterPayload, UpsertUserPayload, User } from './types';

export interface UsersQueryArgs {
  page: number;
  limit: number;
  search?: string;
}

export interface DeleteUserPayload {
  id: string;
  query: UsersQueryArgs;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResult, LoginPayload>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<AuthResult>) => response.data,
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch {
          return;
        }
      },
    }),
    register: builder.mutation<AuthResult, RegisterPayload>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<AuthResult>) => response.data,
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch {
          return;
        }
      },
    }),
    me: builder.query<User, void>({
      query: () => '/auth/me',
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch {
          dispatch(setCurrentUser(null));
        }
      },
    }),
    getUsers: builder.query<PaginatedResult<User>, UsersQueryArgs>({
      query: ({ page, limit, search }) => ({
        url: '/users',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
        },
      }),
      transformResponse: (response: ApiResponse<User[]>) => ({
        items: response.data,
        page: response.meta?.page ?? 1,
        pages: response.meta?.pages ?? 1,
        total: response.meta?.total ?? response.data.length,
        limit: response.meta?.limit ?? response.data.length,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((user) => ({ type: 'User' as const, id: user.id })),
              { type: 'User' as const, id: 'LIST' },
            ]
          : [{ type: 'User' as const, id: 'LIST' }],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<User, UpsertUserPayload>({
      query: ({ id: _id, ...body }) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<User, UpsertUserPayload>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: (_result, _error, payload) => [{ type: 'User', id: payload.id }, { type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation<{ success: true }, DeleteUserPayload>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      transformResponse: () => ({ success: true as const }),
      async onQueryStarted({ id, query }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', query, (draft) => {
            draft.items = draft.items.filter((user) => user.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, payload) => [{ type: 'User', id: payload.id }, { type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
