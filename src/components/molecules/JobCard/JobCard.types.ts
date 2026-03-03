import { Job } from '@/types/job.types';

export interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  featured?: boolean;
}
