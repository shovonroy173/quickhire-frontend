import React from 'react';
import { Job } from '@/types/job.types';
import { HomeSectionShell, LatestJobRow, LatestJobRowSkeleton, LoadableCollection } from '../shared/HomePrimitives';

interface LatestJobsSectionProps {
  jobs: Job[];
  loading?: boolean;
}

export function LatestJobsSection({ jobs, loading = false }: LatestJobsSectionProps) {
  return (
    <HomeSectionShell
      title="Latest"
      accent="jobs open"
      sectionClassName="relative bg-[#f0f2fb] py-12 lg:[clip-path:polygon(80px_0%,100%_0%,100%_100%,0%_100%,0%_80px)]"
      containerClassName="relative z-10 mx-auto w-full max-w-315 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-25 top-15 z-0 h-37.5 w-85 -rotate-26 border border-[#c5c8e8] opacity-70" />
      <div className="pointer-events-none absolute -right-22.5 top-37.5 z-0 h-42.5 w-135 -rotate-26 border border-[#c5c8e8] opacity-70" />
      <div className="pointer-events-none absolute -right-12.5 top-67.5 z-0 h-52.5 w-145 -rotate-26 border border-[#c5c8e8] opacity-70" />
      <div className="pointer-events-none absolute -right-10 top-115 z-0 h-52.5 w-140 -rotate-26 border border-[#c5c8e8] opacity-70" />

      <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LoadableCollection
          loading={loading}
          items={jobs}
          skeletonCount={6}
          renderSkeleton={(index) => <LatestJobRowSkeleton key={`latest-skeleton-${index}`} />}
          renderItem={(job) => <LatestJobRow key={job.id} job={job} />}
        />
      </div>
    </HomeSectionShell>
  );
}
