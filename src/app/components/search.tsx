// SearchFilter.tsx
"use client";

import React, { useState } from "react";

interface SearchFilterProps {
  onSearch: (searchText: string) => void;
  onFilter: (filterTag: string | null) => void;
  tags: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter, tags }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleFilter = (tag: string | null) => {
    setSelectedTag(tag);
    onFilter(tag);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleFilter(null)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            selectedTag === null
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleFilter(tag)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedTag === tag
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
