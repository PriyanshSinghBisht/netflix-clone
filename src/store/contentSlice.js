import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_AUTH;

const getOptions = () => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});

export const fetchMovies = createAsyncThunk(
  'content/fetchMovies',
  async ({ endpoint, page = 1 }) => {
    const response = await fetch(`${API_BASE}/${endpoint}?language=en-US&page=${page}`, getOptions());
    const data = await response.json();
    return { results: data.results, page: data.page, totalPages: data.total_pages };
  }
);

export const searchContent = createAsyncThunk(
  'content/search',
  async ({ query, page = 1 }) => {
    const response = await fetch(`${API_BASE}/search/multi?query=${query}&language=en-US&page=${page}`, getOptions());
    const data = await response.json();
    return { results: data.results, page: data.page, totalPages: data.total_pages };
  }
);

export const fetchGenres = createAsyncThunk(
  'content/fetchGenres',
  async (type) => {
    const response = await fetch(`${API_BASE}/genre/${type}/list?language=en-US`, getOptions());
    const data = await response.json();
    return { type, genres: data.genres };
  }
);

const initialState = {
  movies: [],
  tvShows: [],
  searchResults: [],
  moviesGenres: [],
  tvGenres: [],
  currentContent: [],
  filter: {
    type: 'all', // 'movie', 'tv', 'all'
    genre: null,
    year: null,
    sortBy: 'popularity.desc',
  },
  pagination: {
    page: 1,
    totalPages: 1,
  },
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filter = initialState.filter;
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContent = action.payload.results;
        state.pagination.page = action.payload.page;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.pagination.page = action.payload.page;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        if (action.payload.type === 'movie') {
          state.moviesGenres = action.payload.genres;
        } else {
          state.tvGenres = action.payload.genres;
        }
      });
  },
});

export const { setFilter, clearFilters, setPage, clearSearch } = contentSlice.actions;
export default contentSlice.reducer;