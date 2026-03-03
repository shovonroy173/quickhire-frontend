import { Job } from '@/types/job.types';

export interface LatestJobsProps {
  jobs: Job[];
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
}