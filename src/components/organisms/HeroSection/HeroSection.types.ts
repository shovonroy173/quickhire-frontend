export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  locationPlaceholder?: string;
  popularSearches?: string[];
  onSearch?: (query: string) => void;
  onLocationChange?: (location: string) => void;
}
