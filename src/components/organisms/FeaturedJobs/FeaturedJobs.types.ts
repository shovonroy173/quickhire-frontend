import { Job } from '@/types/job.types';

export interface FeaturedJobsProps {
  jobs: Job[];
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
}