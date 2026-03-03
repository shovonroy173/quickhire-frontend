import React from 'react';
import Container from '@/components/atoms/Container';
import JobCard from '@/components/molecules/JobCard';
import { FeaturedJobsProps } from './FeaturedJobs.types';

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ jobs, onApply, onSave }) => {
  return (
    <section className="bg-white py-14">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured jobs</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApply} onSave={onSave} featured />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedJobs;