'use client';

import Link from 'next/link';
import React from 'react';
import Container from '@/components/atoms/Container';
import JobCard from '@/components/molecules/JobCard';
import JobCardSkeleton from '@/components/skeletons/JobCardSkeleton';
import { MOCK_CATEGORIES } from '@/assets/data/mock/categories';
import { useGetJobsQuery } from '@/features/job/jobApi';
import { fromCategorySlug } from '@/utils/jobRouting';

interface CategoryJobsScreenProps {
  categorySlug: string;
}

const CategoryJobsScreen: React.FC<CategoryJobsScreenProps> = ({ categorySlug }) => {
  const normalizedCategoryName = fromCategorySlug(categorySlug);
  const matchedCategory = MOCK_CATEGORIES.find(
    (category) => category.name.toLowerCase() === normalizedCategoryName
  );

  const title = matchedCategory?.name ?? 'Unknown Category';
  const { data, isLoading } = useGetJobsQuery({
    page: 1,
    limit: 20,
    category: title,
  });

  const jobs = data?.items ?? [];

  return (
    <Container className="py-10">
      <Link href="/jobs" className="mb-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700">
        {'<- '}Back to jobs
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title} Jobs</h1>
      <p className="mb-8 text-sm text-gray-600">{jobs.length} jobs found in this category.</p>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <JobCardSkeleton key={`category-skeleton-${index}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && jobs.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
          No jobs found for this category.
        </div>
      ) : null}

      {!isLoading && jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default CategoryJobsScreen;
