export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  salary?: string;
  experienceLevel?: string;
  postedAt: string;
  views?: number;
  applications?: number;
  status?: 'active' | 'closed' | 'draft';
  postedBy?: string;
  featured?: boolean;
  verified?: boolean;
  logo?: string;
  applyUrl?: string;
}
