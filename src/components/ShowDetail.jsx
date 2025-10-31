import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowDetails, getShowEpisodes } from '../services/api';

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [showData, episodesData] = await Promise.all([
          getShowDetails(id),
          getShowEpisodes(id),
        ]);
        setShow(showData);
        setEpisodes(episodesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading-spinner">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <div className="error-state">
          <p>Hata: {error}</p>
          <button onClick={() => navigate('/')} className="btn-retry">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="detail-container">
        <div className="empty-state">Dizi bulunamadı.</div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="btn-back">
        🏠 Anasayfa
      </button>
      
      <div className="show-detail">
        <div className="show-detail-header">
          {show.image && (
            <img 
              src={show.image.original || show.image.medium} 
              alt={show.name}
              className="show-detail-image"
            />
          )}
          <div className="show-detail-info">
            <h1>{show.name}</h1>
            {show.genres && show.genres.length > 0 && (
              <div className="show-genres">
                {show.genres.map((genre, idx) => (
                  <span key={idx} className="genre-badge">{genre}</span>
                ))}
              </div>
            )}
            <div className="show-meta">
              {show.language && <span>Dil: {show.language}</span>}
              {show.rating?.average && (
                <span>⭐ Puan: {show.rating.average}/10</span>
              )}
              {show.premiered && (
                <span>Yayın: {new Date(show.premiered).getFullYear()}</span>
              )}
              {show.status && <span>Durum: {show.status}</span>}
            </div>
            {show.summary && (
              <div 
                className="show-summary" 
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            )}
            {show.url && (
              <a 
                href={show.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="show-tvmaze-link"
              >
                🌐 TVMaze'de Diziyi Görüntüle
              </a>
            )}
          </div>
        </div>

        <div className="show-episodes">
          <h2>Bölümler ({episodes.length})</h2>
          {episodes.length === 0 ? (
            <p>Bölüm bilgisi bulunamadı.</p>
          ) : (
            <div className="episodes-list">
              {episodes.map((episode) => (
                <div key={episode.id} className="episode-card">
                  <div className="episode-info">
                    <h3>
                      {episode.season}x{episode.number.toString().padStart(2, '0')} - {episode.name}
                    </h3>
                    {episode.airdate && (
                      <p className="episode-date">
                        Yayın Tarihi: {new Date(episode.airdate).toLocaleDateString('tr-TR')}
                      </p>
                    )}
                    {episode.summary && (
                      <div 
                        className="episode-summary"
                        dangerouslySetInnerHTML={{ __html: episode.summary }}
                      />
                    )}
                    {episode.url && (
                      <a 
                        href={episode.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="episode-link"
                      >
                        📺 TVMaze'de Görüntüle
                      </a>
                    )}
                  </div>
                  {episode.image && (
                    <img 
                      src={episode.image.medium} 
                      alt={episode.name}
                      className="episode-image"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;

