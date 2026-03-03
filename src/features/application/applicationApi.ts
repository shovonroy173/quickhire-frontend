import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from '@/lib/api/baseApi';
import { ApiResponse } from '@/lib/api/types';

export interface CreateApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

interface ApplicationResult {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

interface ApplicationJobSummary {
  id: string;
  title?: string;
  company?: string;
  location?: string;
  category?: string;
  type?: string;
}

export interface MyApplicationResult {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  notes?: string;
  job?: ApplicationJobSummary;
}

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Application'],
  endpoints: (builder) => ({
    createApplication: builder.mutation<ApplicationResult, CreateApplicationPayload>({
      query: (body) => ({
        url: '/applications',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<ApplicationResult>) => response.data,
      invalidatesTags: [{ type: 'Application', id: 'LIST' }],
    }),
    getMyApplications: builder.query<MyApplicationResult[], void>({
      query: () => ({
        url: '/applications/me',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<MyApplicationResult[]>) =>
        response.data.map((application) => {
          const rawJob = application.job as
            | { _id?: string; id?: string; title?: string; company?: string; location?: string; category?: string; type?: string }
            | undefined;

          return {
            ...application,
            job: rawJob
              ? {
                  id: rawJob.id ?? rawJob._id ?? '',
                  title: rawJob.title,
                  company: rawJob.company,
                  location: rawJob.location,
                  category: rawJob.category,
                  type: rawJob.type,
                }
              : undefined,
          };
        }),
      providesTags: [{ type: 'Application', id: 'LIST' }],
    }),
  }),
});

export const { useCreateApplicationMutation, useGetMyApplicationsQuery } = applicationApi;
