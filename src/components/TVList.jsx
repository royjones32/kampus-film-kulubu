import React from 'react';
import TVCard from './TVCard';

const TVList = ({ shows, currentPage, pageSize, onAddToWatchlist, watchlist }) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedShows = shows.slice(startIndex, endIndex);

  if (paginatedShows.length === 0) {
    return (
      <div className="empty-state">
        <p>Sonuç bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="tv-list">
      {paginatedShows.map((show) => (
        <TVCard
          key={show.id}
          show={show}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={watchlist.some(w => w.id === show.id)}
        />
      ))}
    </div>
  );
};

export default TVList;


