import React, { useEffect, useReducer } from 'react';
import { appReducer, initialState, FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE, SET_QUERY, SET_FILTERS, ADD_WATCHLIST, REMOVE_WATCHLIST, CLEAR_WATCHLIST, SET_PAGE, SET_SORT } from '../context/AppReducer';
import { loadWatchlistFromStorage } from '../context/AppReducer';
import { searchShows } from '../services/api';
import { filterShows } from '../utils/filters';
import { sortShows } from '../utils/sortShows';
import SearchBox from './SearchBox';
import Filters from './Filters';
import SortOptions from './SortOptions';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const Home = () => {
  // LocalStorage'dan watchlist'i yükle
  const savedWatchlist = loadWatchlistFromStorage();
  const initial = { ...initialState, watchlist: savedWatchlist };
  
  const [state, dispatch] = useReducer(appReducer, initial);

  // İlk yüklemede arama yap
  const fetchShows = async (query) => {
    if (!query || !query.trim()) return;

    dispatch({ type: FETCH_INIT });
    try {
      const shows = await searchShows(query);
      dispatch({ type: FETCH_SUCCESS, payload: shows });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE, payload: error.message });
    }
  };

  useEffect(() => {
    fetchShows(state.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtre değiştiğinde sayfayı sıfırla
  useEffect(() => {
    dispatch({ type: SET_PAGE, payload: 1 });
  }, [state.filters.genre, state.filters.language, state.filters.minRating]);

  // Filtrelenmiş ve sıralanmış diziler
  const filteredShows = filterShows(state.shows, state.filters);
  const sortedShows = sortShows(filteredShows, state.sortBy);
  const totalPages = Math.ceil(sortedShows.length / state.pageSize);

  const handleQueryChange = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
  };

  const handleSearch = () => {
    fetchShows(state.query);
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: SET_FILTERS, payload: newFilters });
  };

  const handleClearFilters = () => {
    dispatch({ type: SET_FILTERS, payload: { genre: '', language: '', minRating: '' } });
  };

  const handleSortChange = (sortBy) => {
    dispatch({ type: SET_SORT, payload: sortBy });
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
          <button onClick={() => fetchShows(state.query)} className="btn-retry">
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
              onClearFilters={handleClearFilters}
            />
            <SortOptions
              sortBy={state.sortBy}
              onSortChange={handleSortChange}
            />
            {sortedShows.length > 0 && (
              <div className="results-info">
                <p>Toplam {sortedShows.length} dizi bulundu</p>
              </div>
            )}
          </div>

          {sortedShows.length === 0 && !state.loading ? (
            <div className="empty-state">
              <p>Sonuç bulunamadı. Lütfen arama teriminizi değiştirin veya filtreleri temizleyin.</p>
            </div>
          ) : (
            <>
              <TVList
                shows={sortedShows}
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

