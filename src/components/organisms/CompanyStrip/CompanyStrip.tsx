import React from 'react';
import { CompanyStripProps } from './CompanyStrip.types';
import Container from '@/components/atoms/Container';
import CompanyLogo from '@/components/molecules/CompanyLogo';

export const CompanyStrip: React.FC<CompanyStripProps> = ({
  companies,
  title = 'Companies we helped grow',
}) => {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <Container>
        <h2 className="text-lg font-medium text-gray-500 text-center mb-8">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company) => (
            <CompanyLogo key={company.id} company={company} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(CompanyStrip);
