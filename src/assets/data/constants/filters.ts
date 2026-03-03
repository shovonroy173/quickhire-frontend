export const JOB_CATEGORIES = [
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Technology',
  'Engineering',
  'Business',
  'Human Resource',
] as const;

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote',
] as const;

export const LOCATIONS = [
  'Madrid, Spain',
  'San Francisco, US',
  'Marseille, France',
  'Paris, France',
  'Hamburg, Germany',
  'Lucern, Switzerland',
] as const;

export const SORT_OPTIONS = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Company Name', value: 'company' },
  { label: 'Location', value: 'location' },
] as const;
