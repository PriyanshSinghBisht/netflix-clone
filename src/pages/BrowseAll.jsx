import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies, fetchGenres, setFilter, clearFilters, setPage } from '../store/contentSlice';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const BrowseAll = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentContent, moviesGenres, tvGenres, filter, pagination, loading } = useSelector((state) => state.content);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const urlPage = parseInt(searchParams.get('page') || '1', 10);
  const urlGenre = searchParams.get('genre');
  const urlYear = searchParams.get('year');
  const urlSortBy = searchParams.get('sortBy');
  const urlType = searchParams.get('type') || 'all';

  useEffect(() => {
    if (urlPage !== pagination.page) {
      dispatch(setPage(urlPage));
    }
  }, [urlPage, dispatch, pagination.page]);

  useEffect(() => {
    if (urlType !== filter.type) {
      dispatch(setFilter({ type: urlType }));
    }
    if (urlGenre) {
      dispatch(setFilter({ genre: parseInt(urlGenre, 10) }));
    }
    if (urlYear) {
      dispatch(setFilter({ year: parseInt(urlYear, 10) }));
    }
    if (urlSortBy) {
      dispatch(setFilter({ sortBy: urlSortBy }));
    }
  }, [urlType, urlGenre, urlYear, urlSortBy]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_count.desc', label: 'Most Voted' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
  ];

  const genres = filter.type === 'movie' ? moviesGenres : filter.type === 'tv' ? tvGenres : [...moviesGenres, ...tvGenres];

  useEffect(() => {
    dispatch(fetchGenres('movie'));
    dispatch(fetchGenres('tv'));
  }, [dispatch]);

  useEffect(() => {
    let endpoint = '';
    const genreParam = filter.genre ? `&with_genres=${filter.genre}` : '';
    const yearParam = filter.year ? `&primary_release_year=${filter.year}` : '';
    const sortParam = `&sort_by=${filter.sortBy}`;

    if (filter.type === 'movie') {
      endpoint = `discover/movie?include_adult=false&include_null_first_air_dates=false${genreParam}${yearParam}${sortParam}`;
    } else if (filter.type === 'tv') {
      endpoint = `discover/tv?include_adult=false&include_null_first_air_dates=false${genreParam}${yearParam}${sortParam}`;
    } else {
      endpoint = `discover/movie?include_adult=false&include_null_first_air_dates=false${genreParam}${yearParam}${sortParam}`;
    }

    dispatch(fetchMovies({ endpoint, page: pagination.page }));
  }, [dispatch, filter, pagination.page]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
    if (key === 'type' || key === 'genre' || key === 'year' || key === 'sortBy') {
      newParams.delete('page');
    }
    setSearchParams(newParams);
    dispatch(setFilter({ [key]: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', newPage.toString());
      setSearchParams(newParams);
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeFiltersCount = [filter.type !== 'all', filter.genre, filter.year, filter.sortBy !== 'popularity.desc'].filter(Boolean).length;

  const getTitle = () => {
    if (filter.type === 'movie') return 'Movies';
    if (filter.type === 'tv') return 'TV Shows';
    return 'Browse All';
  };

  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen pt-16">
      <Navbar />
      
      <div className="px-4 pb-2 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">{getTitle()}</h1>
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <FiFilter /> Filters {activeFiltersCount > 0 && <span className="bg-white text-red-600 rounded-full px-2 text-sm">{activeFiltersCount}</span>}
        </button>
      </div>

      {/* Filter Panel - Desktop */}
      <div className="hidden md:flex px-4 pb-4 gap-4 flex-wrap items-center">
        <select
          value={filter.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-600 focus:outline-none"
        >
          <option value="all">All Content</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        <select
          value={filter.genre || ''}
          onChange={(e) => handleFilterChange('genre', e.target.value ? Number(e.target.value) : null)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-600 focus:outline-none"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={filter.year || ''}
          onChange={(e) => handleFilterChange('year', e.target.value ? Number(e.target.value) : null)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-600 focus:outline-none"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={filter.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-red-600 focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {activeFiltersCount > 0 && (
          <button
            onClick={() => {
              setSearchParams(new URLSearchParams());
              dispatch(clearFilters());
            }}
            className="text-red-500 hover:text-red-400 flex items-center gap-1"
          >
            <FiX /> Clear Filters
          </button>
        )}
      </div>

      {/* Filter Panel - Mobile */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-white text-sm">Type</label>
              <select
                value={filter.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
              >
                <option value="all">All Content</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Genre</label>
              <select
                value={filter.genre || ''}
                onChange={(e) => handleFilterChange('genre', e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Release Year</label>
              <select
                value={filter.year || ''}
                onChange={(e) => handleFilterChange('year', e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Sort By</label>
              <select
                value={filter.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                  dispatch(clearFilters());
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Grid */}
      <div className="flex-1 px-4">
        {loading ? (
          <div className="flex flex-wrap justify-center">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="m-2 gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] w-[120px]">
                <div className="gg:h-[180px] min-[700px]:h-[250px] gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] min-[500px]:h-[200px] w-[120px] h-[150px] overflow-hidden">
                  <SkeletonLoader className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        ) : currentContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white">
            <p className="text-xl">No content found</p>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {currentContent.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination totalPages={pagination.totalPages} />

      <Footer />
    </div>
  );
};

export default BrowseAll;