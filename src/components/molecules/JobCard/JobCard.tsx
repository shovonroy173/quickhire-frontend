import React from 'react';
import Link from 'next/link';
import { JobCardProps } from './JobCard.types';
import Badge from '@/components/atoms/Badge';

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  onSave,
  featured = false,
}) => {
  const {
    id,
    title,
    company,
    location,
    category,
    type,
    description,
    verified,
    salary,
  } = job;

  return (
    <div className={`
      bg-white rounded-lg border border-gray-200 p-6
      hover:shadow-lg transition-shadow duration-200
      ${featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
    `}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              <Link href={`/jobs/${id}`} className="hover:text-blue-600">
                {title}
              </Link>
            </h3>
            {verified && (
              <Badge variant="success" size="sm">Verified</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 9h6m-6 4h6m-6 4h6" />
              </svg>
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        {featured && (
          <Badge variant="primary" size="sm">Featured</Badge>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary" size="sm">{category}</Badge>
          <Badge variant="secondary" size="sm">{type}</Badge>
          {salary && (
            <Badge variant="secondary" size="sm">{salary}</Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          {onSave && (
            <button
              onClick={() => onSave(id)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="sr-only">Save job</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          )}
          {onApply && (
            <button
              onClick={() => onApply(id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(JobCard);
