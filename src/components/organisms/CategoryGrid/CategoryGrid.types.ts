import { Category } from '@/types/category.types';

export interface CategoryGridProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
}
