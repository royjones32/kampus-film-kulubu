// useReducer için action types
export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SET_QUERY = 'SET_QUERY';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_WATCHLIST = 'SET_WATCHLIST';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_PAGE = 'SET_PAGE';
export const SET_SORT = 'SET_SORT';
export const ADD_WATCHLIST = 'ADD_WATCHLIST';
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';
export const CLEAR_WATCHLIST = 'CLEAR_WATCHLIST';

// Initial state
export const initialState = {
  shows: [],
  loading: false,
  error: null,
  query: '',
  filters: {
    genre: '',
    language: '',
    minRating: '',
  },
  sortBy: 'name', // 'name', 'rating', 'premiered'
  watchlist: [],
  currentPage: 1,
  pageSize: 6,
  totalPages: 0,
};

// Reducer function
export const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case FETCH_SUCCESS:
      const shows = action.payload;
      const totalPages = Math.ceil(shows.length / state.pageSize);
      return {
        ...state,
        loading: false,
        shows,
        totalPages,
        error: null,
        currentPage: 1,
      };
    
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        shows: [],
      };
    
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    
    case SET_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload,
      };
    
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        currentPage: 1,
      };
    
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    
    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };
    
    case ADD_WATCHLIST:
      const showToAdd = action.payload;
      if (state.watchlist.find(s => s.id === showToAdd.id)) {
        return state;
      }
      const newWatchlist = [...state.watchlist, showToAdd];
      // LocalStorage'a kaydet
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return {
        ...state,
        watchlist: newWatchlist,
      };
    
    case REMOVE_WATCHLIST:
      const updatedWatchlist = state.watchlist.filter(show => show.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      return {
        ...state,
        watchlist: updatedWatchlist,
      };
    
    case CLEAR_WATCHLIST:
      localStorage.removeItem('watchlist');
      return {
        ...state,
        watchlist: [],
      };
    
    default:
      return state;
  }
};

// LocalStorage'dan watchlist'i yükle
export const loadWatchlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading watchlist from storage:', error);
    return [];
  }
};

