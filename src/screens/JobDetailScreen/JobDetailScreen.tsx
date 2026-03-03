'use client';

import React from 'react';
import Container from '@/components/atoms/Container';
import JobDetails from '@/components/organisms/JobDetails';
import ApplicationForm from '@/components/organisms/ApplicationForm';
import { useGetJobByIdQuery } from '@/features/job/jobApi';

interface JobDetailScreenProps {
  jobId: string;
}

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ jobId }) => {
  const { data: job, isLoading, isError } = useGetJobByIdQuery(jobId);

  if (isLoading) {
    return (
      <Container className="py-10">
        <p className="text-gray-600">Loading job...</p>
      </Container>
    );
  }

  if (isError || !job) {
    return (
      <Container className="py-10">
        <h1 className="text-2xl font-semibold text-gray-900">Job not found</h1>
      </Container>
    );
  }

  return (
    <Container className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[2fr_1fr]">
      <JobDetails job={job} />
      <ApplicationForm jobId={job.id} />
    </Container>
  );
};

export default JobDetailScreen;
