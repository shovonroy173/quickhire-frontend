import React from 'react';
import { CategoryCardProps } from './CategoryCard.types';

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 text-2xl" aria-hidden="true">{category.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{category.jobCount} jobs available</p>
    </button>
  );
};

export default CategoryCard;