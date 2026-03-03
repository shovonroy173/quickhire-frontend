import React from 'react';
import Container from '@/components/atoms/Container';
import NewsletterForm from '@/components/molecules/NewsletterForm';
import { NewsletterSectionProps } from './NewsletterSection.types';

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubmit }) => {
  return (
    <section className="bg-blue-50 py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Get job updates every week</h2>
          <p className="mt-3 text-gray-600">Subscribe to our newsletter and receive curated opportunities.</p>
          <div className="mt-6">
            <NewsletterForm onSubmit={onSubmit} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;