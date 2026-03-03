import React from 'react';
import { HomeTemplateProps } from './HomeTemplate.types';
import MainLayout from '../MainLayout';
import HeroSection from '@/components/organisms/HeroSection';
import CompanyStrip from '@/components/organisms/CompanyStrip';
import CategoryGrid from '@/components/organisms/CategoryGrid';
import FeaturedJobs from '@/components/organisms/FeaturedJobs';
import LatestJobs from '@/components/organisms/LatestJobs';
import NewsletterSection from '@/components/organisms/NewsletterSection';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  onSearch,
  onLocationChange,
  categories,
  onCategoryClick,
  featuredJobs,
  latestJobs,
  companies,
  onJobApply,
  onJobSave,
  onNewsletterSubmit,
}) => {
  return (
    <MainLayout>
      <HeroSection
        onSearch={onSearch}
        onLocationChange={onLocationChange}
      />
      
      <CompanyStrip companies={companies} />
      
      <CategoryGrid
        categories={categories}
        onCategoryClick={onCategoryClick}
      />
      
      <Container>
        <div className="py-8">
          <Divider />
        </div>
      </Container>
      
      <FeaturedJobs
        jobs={featuredJobs}
        onApply={onJobApply}
        onSave={onJobSave}
      />
      
      <LatestJobs
        jobs={latestJobs}
        onApply={onJobApply}
        onSave={onJobSave}
      />
      
      <NewsletterSection onSubmit={onNewsletterSubmit} />
    </MainLayout>
  );
};

export default React.memo(HomeTemplate);
