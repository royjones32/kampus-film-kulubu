import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);
  const handleLast = () => onPageChange(totalPages);

  return (
    <div className="pagination">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        İlk
      </button>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Geri
      </button>
      <span className="pagination-info">
        Sayfa {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        İleri
      </button>
      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Son
      </button>
    </div>
  );
};

export default Pagination;

