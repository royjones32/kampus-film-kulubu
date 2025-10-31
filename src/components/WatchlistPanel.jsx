import React from 'react';
import { useNavigate } from 'react-router-dom';

const WatchlistPanel = ({ watchlist, onRemoveFromWatchlist, onClearWatchlist }) => {
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-panel">
        <h3>Gösterime Girecekler</h3>
        <div className="watchlist-empty">
          <p>Henüz dizi eklenmedi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-panel">
      <div className="watchlist-header">
        <h3>Gösterime Girecekler ({watchlist.length})</h3>
        <button onClick={onClearWatchlist} className="btn-clear">
          Listeyi Temizle
        </button>
      </div>
      <div className="watchlist-items">
        {watchlist.map((show) => (
          <div key={show.id} className="watchlist-item">
            <div className="watchlist-item-image">
              {show.image ? (
                <img 
                  src={show.image.medium || show.image.original} 
                  alt={show.name}
                  onClick={() => navigate(`/show/${show.id}`)}
                />
              ) : (
                <div className="no-image-small">Resim Yok</div>
              )}
            </div>
            <div className="watchlist-item-content">
              <h4>{show.name}</h4>
              <button
                onClick={() => onRemoveFromWatchlist(show.id)}
                className="btn-remove"
              >
                Kaldır
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPanel;

