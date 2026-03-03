import { Category } from '@/types/category.types';

export interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}