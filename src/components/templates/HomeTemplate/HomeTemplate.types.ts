import { Job } from '@/types/job.types';
import { Category } from '@/types/category.types';
import { Company } from '@/types/company.types';

export interface HomeTemplateProps {
  onSearch?: (query: string) => void;
  onLocationChange?: (location: string) => void;
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
  featuredJobs: Job[];
  latestJobs: Job[];
  companies: Company[];
  onJobApply?: (jobId: string) => void;
  onJobSave?: (jobId: string) => void;
  onNewsletterSubmit?: (email: string) => void;
}
