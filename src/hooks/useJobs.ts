import { useState, useEffect, useCallback, useMemo } from 'react';
import { Job } from '@/types/job.types';
import { useGetJobsQuery } from '@/features/job/jobApi';
import { PAGINATION } from '@/lib/constants';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(PAGINATION.defaultPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const queryArgs = useMemo(
    () => ({
      page,
      limit: PAGINATION.defaultLimit,
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      location: selectedLocation || undefined,
    }),
    [page, searchQuery, selectedCategory, selectedLocation]
  );

  const { data, isLoading, isFetching, isError } = useGetJobsQuery(queryArgs, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setPage(1);
    setJobs([]);
  }, [searchQuery, selectedCategory, selectedLocation]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setJobs((previous) => {
      const map = new Map(previous.map((item) => [item.id, item]));
      data.items.forEach((item) => map.set(item.id, item));
      return Array.from(map.values());
    });
  }, [data]);

  const loadMore = useCallback(() => {
    if (!data || isFetching || page >= data.pages) {
      return;
    }

    setPage((previous) => previous + 1);
  }, [data, isFetching, page]);

  const searchJobs = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filterByCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filterByLocation = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  const getJobById = useCallback((id: string) => {
    return jobs.find(job => job.id === id);
  }, [jobs]);

  return {
    jobs,
    loading: isLoading,
    isFetching,
    error: isError ? 'Failed to fetch jobs' : null,
    searchJobs,
    filterByCategory,
    filterByLocation,
    loadMore,
    hasMore: data ? page < data.pages : false,
    getJobById,
    selectedCategory,
    selectedLocation,
    searchQuery,
  };
};

export default useJobs;
