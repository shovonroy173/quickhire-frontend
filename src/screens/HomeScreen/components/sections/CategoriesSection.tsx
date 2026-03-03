import Link from 'next/link';
import React from 'react';
import { Category } from '@/types/category.types';
import { toCategorySlug } from '@/utils/jobRouting';
import { CategoryCardSkeleton, HomeSectionShell, LoadableCollection, categoryIconMap } from '../shared/HomePrimitives';

interface CategoriesSectionProps {
  categories: Category[];
  loading?: boolean;
  onCategoryClick?: (category: Category) => void;
}

export function CategoriesSection({ categories, loading = false, onCategoryClick }: CategoriesSectionProps) {
  return (
    <HomeSectionShell
      title="Explore by"
      accent="category"
      containerClassName="mx-auto w-full max-w-315 px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <LoadableCollection
          loading={loading}
          items={categories.slice(0, 8)}
          skeletonCount={8}
          renderSkeleton={(index) => <CategoryCardSkeleton key={`category-skeleton-${index}`} />}
          renderItem={(category) => (
            <Link
              key={category.id}
              href={`/jobs/category/${toCategorySlug(category.name)}`}
              onClick={() => onCategoryClick?.(category)}
              className="group block border border-[#e4e5ef] bg-white p-5 text-left text-[#1f2a44] transition hover:border-[#4f46e5] hover:bg-[#4f46e5] hover:text-white"
            >
              <div className="mb-5 inline-flex h-8 w-8 items-center justify-center text-[#4f46e5] group-hover:text-white">
                {categoryIconMap[category.name]}
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-[#7a7f92] group-hover:text-white/80">{category.jobCount} jobs available</p>
                <span className="text-sm text-[#4f46e5] group-hover:text-white">{'->'}</span>
              </div>
            </Link>
          )}
        />
      </div>
    </HomeSectionShell>
  );
}
