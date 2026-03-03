import React from 'react';
import { CompanyLogoProps } from './CompanyLogo.types';

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company }) => {
  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
      {company.name}
      {company.verified ? <span className="ml-2 text-green-600">Verified</span> : null}
    </div>
  );
};

export default CompanyLogo;