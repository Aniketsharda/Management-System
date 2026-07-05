import React, { useState, useEffect } from 'react';

/**
 * Search Bar Component
 * Provides search functionality with debouncing for better performance
 */
const SearchBar = ({ onSearch, placeholder = "Search students..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms delay

    // Cleanup timeout on component unmount or when searchTerm changes
    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-search-btn"
            title="Clear search"
          >
            ✕
          </button>
        )}
        <div className="search-icon">
          🔍
        </div>
      </div>
    </div>
  );
};

export default SearchBar;