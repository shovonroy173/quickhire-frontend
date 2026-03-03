import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  searchPlaceholder = 'Search jobs',
  locationPlaceholder = 'Location',
  onSearch,
  onLocationChange,
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch?.(query);
    onLocationChange?.(location);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
      />
      <Input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder={locationPlaceholder}
      />
      <Button type="submit" className="whitespace-nowrap">Search</Button>
    </form>
  );
};

export default SearchBar;