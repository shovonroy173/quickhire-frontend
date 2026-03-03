export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAIL: (id: string) => `/jobs/${id}`,
  APPLY: (id: string) => `/jobs/${id}/apply`,
  ADMIN: '/admin',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_ADD_JOB: '/admin/jobs/add',
} as const;
