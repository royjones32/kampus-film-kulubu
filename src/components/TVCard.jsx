import React from 'react';
import { useNavigate } from 'react-router-dom';

const TVCard = ({ show, onAddToWatchlist, isInWatchlist }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/show/${show.id}`);
  };

  const handleAddToWatchlist = () => {
    onAddToWatchlist(show);
  };

  return (
    <div className="tv-card">
      <div className="tv-card-image" onClick={handleDetail} style={{ cursor: 'pointer' }}>
        {show.image ? (
          <img src={show.image.medium || show.image.original} alt={show.name} />
        ) : (
          <div className="no-image">Resim Yok</div>
        )}
      </div>
      <div className="tv-card-content">
        <h3 className="tv-card-title" onClick={handleDetail} style={{ cursor: 'pointer' }}>
          {show.name}
        </h3>
        <div className="tv-card-info">
          {show.genres && show.genres.length > 0 && (
            <div className="tv-card-genre">
              {show.genres.join(', ')}
            </div>
          )}
          {show.language && (
            <div className="tv-card-language">Dil: {show.language}</div>
          )}
          {show.rating?.average && (
            <div className="tv-card-rating">
              ⭐ {show.rating.average}/10
            </div>
          )}
        </div>
        {show.summary && (
          <div 
            className="tv-card-summary" 
            dangerouslySetInnerHTML={{ __html: show.summary.slice(0, 100) + '...' }}
          />
        )}
        <div className="tv-card-actions">
          <button onClick={handleDetail} className="btn-detail">
            Detay
          </button>
          <button 
            onClick={handleAddToWatchlist} 
            className={`btn-watchlist ${isInWatchlist ? 'in-watchlist' : ''}`}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? 'Listede' : 'Kısa Listeye Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;


