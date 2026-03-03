export const toCategorySlug = (categoryName?: string): string => {
  return (categoryName ?? "").trim().toLowerCase().replace(/\s+/g, "-");
};

export const fromCategorySlug = (categorySlug?: string): string => {
  return (categorySlug ?? "").trim().replace(/-/g, " ").toLowerCase();
};

export const isCategoryMatch = (
  jobCategory: string,
  categorySlug?: string
): boolean => {
  return jobCategory.trim().toLowerCase() === fromCategorySlug(categorySlug);
};
