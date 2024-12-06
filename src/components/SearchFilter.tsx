import React from "react";

interface SearchFilterProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearch,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="border px-4 py-2 rounded w-full"
        placeholder="Search cameras..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
