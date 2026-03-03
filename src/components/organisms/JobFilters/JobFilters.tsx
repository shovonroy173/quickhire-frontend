import React from 'react';
import { Category } from '@/types/category.types';

interface JobFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelectCategory?.('')}
        className={`rounded-full px-3 py-1 text-sm ${selectedCategory ? 'bg-gray-100 text-gray-700' : 'bg-blue-600 text-white'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory?.(category.name)}
          className={`rounded-full px-3 py-1 text-sm ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default JobFilters;