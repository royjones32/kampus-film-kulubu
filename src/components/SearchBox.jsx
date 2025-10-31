import React from 'react';

const SearchBox = ({ query, onQueryChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Dizi ara... (örn: Breaking Bad, Stranger Things)"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Ara
      </button>
    </form>
  );
};

export default SearchBox;

