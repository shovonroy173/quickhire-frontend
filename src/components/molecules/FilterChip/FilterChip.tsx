import React from 'react';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );
};

export default FilterChip;