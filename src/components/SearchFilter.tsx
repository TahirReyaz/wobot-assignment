import { SearchIcon } from "lucide-react";
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
    <div className="mb-4 flex items-center rounded text-gray-600 bg-gray-100 pe-4">
      <input
        type="text"
        className="ps-4 py-2 text-gray-600 bg-gray-100"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <SearchIcon size={16} />
    </div>
  );
};

export default SearchFilter;
