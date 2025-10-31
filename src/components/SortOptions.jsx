import React from 'react';

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-options">
      <label htmlFor="sort">Sırala:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="name">İsme Göre (A-Z)</option>
        <option value="rating">Puana Göre (Yüksek-Düşük)</option>
        <option value="premiered">Yayın Tarihine Göre (Yeni-Eski)</option>
      </select>
    </div>
  );
};

export default SortOptions;

