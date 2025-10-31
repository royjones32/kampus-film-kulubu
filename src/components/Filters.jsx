import React from 'react';
import { getAllGenres, getAllLanguages } from '../utils/filters';

const Filters = ({ filters, shows, onFilterChange }) => {
  const genres = getAllGenres(shows);
  const languages = getAllLanguages(shows);

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="genre">Tür:</label>
        <select
          id="genre"
          value={filters.genre}
          onChange={(e) => onFilterChange({ genre: e.target.value })}
          className="filter-select"
        >
          <option value="">Tümü</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="language">Dil:</label>
        <select
          id="language"
          value={filters.language}
          onChange={(e) => onFilterChange({ language: e.target.value })}
          className="filter-select"
        >
          <option value="">Tümü</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minRating">Min Puan:</label>
        <input
          id="minRating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={filters.minRating}
          onChange={(e) => onFilterChange({ minRating: e.target.value })}
          placeholder="0.0"
          className="filter-input"
        />
      </div>
    </div>
  );
};

export default Filters;

