export interface SearchBarProps {
  searchPlaceholder?: string;
  locationPlaceholder?: string;
  onSearch?: (query: string) => void;
  onLocationChange?: (location: string) => void;
}