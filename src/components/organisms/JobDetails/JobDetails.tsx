import React from 'react';
import { Job } from '@/types/job.types';

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
      <p className="mt-2 text-gray-600">{job.company} - {job.location}</p>
      <p className="mt-4 text-gray-700">{job.description}</p>
      {job.requirements?.length ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Requirements</h2>
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
};

export default JobDetails;
