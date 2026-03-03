import React from 'react';
import { CategoryGridProps } from './CategoryGrid.types';
import Container from '@/components/atoms/Container';
import CategoryCard from '@/components/molecules/CategoryCard';

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategoryClick,
}) => {
  const firstRow = categories.slice(0, 4);
  const secondRow = categories.slice(4, 8);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore by category
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstRow.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategoryClick?.(category)}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondRow.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategoryClick?.(category)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(CategoryGrid);
