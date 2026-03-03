import React from 'react';
import { HeroSectionProps } from './HeroSection.types';
import SearchBar from '@/components/molecules/SearchBar';
import Container from '@/components/atoms/Container';
import Text from '@/components/atoms/Text';

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Discover more than 5000+ Jobs',
  subtitle = 'Great platform for the job seeker that searching for new career heights and passionate about startups.',
  searchPlaceholder = 'Job title or keyword',
  locationPlaceholder = 'Florence, Italy',
  popularSearches = ['UI Designer', 'UX Researcher', 'Android', 'Admin'],
  onSearch,
  onLocationChange,
}) => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="max-w-3xl mx-auto">
            <SearchBar
              searchPlaceholder={searchPlaceholder}
              locationPlaceholder={locationPlaceholder}
              onSearch={onSearch}
              onLocationChange={onLocationChange}
            />
          </div>
          
          <div className="mt-6">
            <span className="text-sm text-gray-500 mr-2">Popular:</span>
            {popularSearches.map((term, index) => (
              <button
                key={term}
                onClick={() => onSearch?.(term)}
                className="text-sm text-blue-600 hover:text-blue-800 mx-1 px-2 py-1"
              >
                {term}
                {index < popularSearches.length - 1 ? ',' : ''}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(HeroSection);
