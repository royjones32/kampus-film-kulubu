import React, { useEffect, useReducer } from 'react';
import { appReducer, initialState, FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE, SET_QUERY, SET_FILTERS, ADD_WATCHLIST, REMOVE_WATCHLIST, CLEAR_WATCHLIST, SET_PAGE } from '../context/AppReducer';
import { searchShows } from '../services/api';
import { filterShows } from '../utils/filters';
import SearchBox from './SearchBox';
import Filters from './Filters';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // İlk yüklemede ve query değiştiğinde arama yap
  const fetchShows = async () => {
    if (!state.query.trim()) return;

    dispatch({ type: FETCH_INIT });
    try {
      const shows = await searchShows(state.query);
      dispatch({ type: FETCH_SUCCESS, payload: shows });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE, payload: error.message });
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  // Filtre değiştiğinde sayfayı sıfırla
  useEffect(() => {
    dispatch({ type: SET_PAGE, payload: 1 });
  }, [state.filters.genre, state.filters.language, state.filters.minRating]);

  // Filtrelenmiş diziler
  const filteredShows = filterShows(state.shows, state.filters);
  const totalPages = Math.ceil(filteredShows.length / state.pageSize);

  const handleQueryChange = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
  };

  const handleSearch = () => {
    fetchShows();
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  const handleAddToWatchlist = (show) => {
    dispatch({ type: ADD_WATCHLIST, payload: show });
  };

  const handleRemoveFromWatchlist = (id) => {
    dispatch({ type: REMOVE_WATCHLIST, payload: id });
  };

  const handleClearWatchlist = () => {
    dispatch({ type: CLEAR_WATCHLIST });
  };

  const handlePageChange = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  // Conditional rendering
  if (state.loading) {
    return (
      <div className="main-container">
        <div className="loading-spinner">Yükleniyor...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="main-container">
        <div className="error-state">
          <p>Hata: {state.error}</p>
          <button onClick={fetchShows} className="btn-retry">
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="content-area">
          <div className="search-section">
            <SearchBox
              query={state.query}
              onQueryChange={handleQueryChange}
              onSearch={handleSearch}
            />
            <Filters
              filters={state.filters}
              shows={state.shows}
              onFilterChange={handleFilterChange}
            />
          </div>

          {filteredShows.length === 0 && !state.loading ? (
            <div className="empty-state">
              <p>Sonuç bulunamadı. Lütfen arama teriminizi değiştirin veya filtreleri temizleyin.</p>
            </div>
          ) : (
            <>
              <TVList
                shows={filteredShows}
                currentPage={state.currentPage}
                pageSize={state.pageSize}
                onAddToWatchlist={handleAddToWatchlist}
                watchlist={state.watchlist}
              />
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        <div className="sidebar">
          <WatchlistPanel
            watchlist={state.watchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
            onClearWatchlist={handleClearWatchlist}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

