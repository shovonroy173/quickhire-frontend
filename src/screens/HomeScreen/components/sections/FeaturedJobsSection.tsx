import React from 'react';
import { Job } from '@/types/job.types';
import { JobCardSkeleton } from '@/components/skeletons';
import { HomeJobCard, HomeSectionShell, LoadableCollection } from '../shared/HomePrimitives';

interface FeaturedJobsSectionProps {
  jobs: Job[];
  loading?: boolean;
}

export function FeaturedJobsSection({ jobs, loading = false }: FeaturedJobsSectionProps) {
  return (
    <HomeSectionShell
      title="Featured"
      accent="jobs"
      containerClassName="mx-auto w-full max-w-315 px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LoadableCollection
          loading={loading}
          items={jobs}
          skeletonCount={8}
          renderSkeleton={(index) => <JobCardSkeleton key={`featured-skeleton-${index}`} />}
          renderItem={(job) => <HomeJobCard key={job.id} job={job} />}
        />
      </div>
    </HomeSectionShell>
  );
}
