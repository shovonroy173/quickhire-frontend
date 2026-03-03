'use client';

import React, { useEffect, useRef } from 'react';
import Container from '@/components/atoms/Container';
import JobCard from '@/components/molecules/JobCard';
import JobFilters from '@/components/organisms/JobFilters';
import JobCardSkeleton from '@/components/skeletons/JobCardSkeleton';
import { MOCK_CATEGORIES } from '@/assets/data/mock/categories';
import useJobs from '@/hooks/useJobs';

const JobsScreen: React.FC = () => {
  const {
    jobs,
    loading,
    isFetching,
    error,
    searchJobs,
    filterByCategory,
    selectedCategory,
    loadMore,
    hasMore,
  } = useJobs();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isFetching) {
      return;
    }

    const current = sentinelRef.current;
    if (!current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore();
          }
        });
      },
      { rootMargin: '260px' }
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [hasMore, isFetching, loadMore]);

  return (
    <Container className="py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Browse jobs</h1>
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search jobs"
          onChange={(event) => searchJobs(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="mb-8">
        <JobFilters
          categories={MOCK_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={filterByCategory}
        />
      </div>
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <JobCardSkeleton key={`job-skeleton-${index}`} />)
          : null}
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div ref={sentinelRef} />
      {isFetching && !loading ? <p className="mt-4 text-center text-sm text-gray-500">Loading more...</p> : null}
      {!hasMore && jobs.length > 0 ? <p className="mt-4 text-center text-sm text-gray-500">You reached the end.</p> : null}
    </Container>
  );
};

export default JobsScreen;
