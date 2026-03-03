import React from 'react';
import Container from '@/components/atoms/Container';
import JobCard from '@/components/molecules/JobCard';
import { LatestJobsProps } from './LatestJobs.types';

const LatestJobs: React.FC<LatestJobsProps> = ({ jobs, onApply, onSave }) => {
  return (
    <section className="bg-gray-50 py-14">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-gray-900">Latest jobs</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApply} onSave={onSave} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestJobs;