import React from 'react';
import { Company } from '@/types/company.types';
import { CompaniesLogos } from '../shared/HomePrimitives';

export function CompaniesSection({ companies }: { companies: Company[] }) {
  return (
    <section className="mx-auto flex w-full max-w-315 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm text-[#8f94a8] md:text-xl lg:text-2xl">Companies we helped grow</p>
      <CompaniesLogos companies={companies} />
    </section>
  );
}
