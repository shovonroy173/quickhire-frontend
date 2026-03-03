import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from '@/lib/api/baseApi';
import { ApiResponse, PaginatedResult } from '@/lib/api/types';
import { Job } from '@/types/job.types';

export interface JobsQueryArgs {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  location?: string;
}

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getJobs: builder.query<PaginatedResult<Job>, JobsQueryArgs>({
      query: ({ page, limit, search, category, location }) => ({
        url: '/jobs',
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
          ...(category ? { category } : {}),
          ...(location ? { location } : {}),
        },
      }),
      transformResponse: (response: ApiResponse<Job[]>) => ({
        items: response.data,
        page: response.meta?.page ?? 1,
        pages: response.meta?.pages ?? 1,
        total: response.meta?.total ?? response.data.length,
        limit: response.meta?.limit ?? response.data.length,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((job) => ({ type: 'Job' as const, id: job.id })),
              { type: 'Job' as const, id: 'LIST' },
            ]
          : [{ type: 'Job' as const, id: 'LIST' }],
    }),
    getFeaturedJobs: builder.query<Job[], void>({
      query: () => '/jobs/featured',
      transformResponse: (response: ApiResponse<Job[]>) => response.data,
      providesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => `/jobs/${id}`,
      transformResponse: (response: ApiResponse<Job>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Job', id }],
    }),
  }),
});

export const { useGetJobsQuery, useGetFeaturedJobsQuery, useGetJobByIdQuery } = jobApi;
