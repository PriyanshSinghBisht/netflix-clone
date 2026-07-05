import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies, fetchGenres, setFilter, clearFilters, setPage } from '../store/contentSlice';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { FiFilter, FiX, FiFilm, FiGrid, FiCalendar } from 'react-icons/fi';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, Badge, Button } from '../components/ui';

const BrowseAll = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentContent, moviesGenres, tvGenres, filter, pagination, loading } = useSelector((state) => state.content);
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

  const activeFiltersCount = [filter.type !== 'all', filter.genre, filter.year, filter.sortBy !== 'popularity.desc'].filter(Boolean).length;

  const getTitle = () => {
    if (filter.type === 'movie') return 'Movies';
    if (filter.type === 'tv') return 'TV Shows';
    return 'Browse All';
  };

  const filterOptions = [
    {
      label: 'Type',
      icon: <FiFilm className="w-4 h-4" />,
      value: filter.type,
      options: [
        { value: 'all', label: 'All Content' },
        { value: 'movie', label: 'Movies' },
        { value: 'tv', label: 'TV Shows' },
      ],
      onChange: (val) => handleFilterChange('type', val),
    },
    {
      label: 'Genre',
      icon: <FiGrid className="w-4 h-4" />,
      value: filter.genre || '',
      options: [
        { value: '', label: 'All Genres' },
        ...genres.map(g => ({ value: g.id, label: g.name })),
      ],
      onChange: (val) => handleFilterChange('genre', val ? Number(val) : null),
    },
    {
      label: 'Year',
      icon: <FiCalendar className="w-4 h-4" />,
      value: filter.year || '',
      options: [
        { value: '', label: 'All Years' },
        ...years.map(y => ({ value: y, label: String(y) })),
      ],
      onChange: (val) => handleFilterChange('year', val ? Number(val) : null),
    },
    {
      label: 'Sort By',
      icon: <RiArrowUpDownLine className="w-4 h-4" />,
      value: filter.sortBy,
      options: sortOptions,
      onChange: (val) => handleFilterChange('sortBy', val),
    },
  ];

  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen pt-24">
      <Navbar />
      
      <div className="px-4 pb-3 flex items-center justify-between">
        <h1 className="text-text-primary text-2xl font-bold">{getTitle()}</h1>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden"
          iconLeft={<FiFilter className="w-4 h-4" />}
        >
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm" className="ml-1">{activeFiltersCount}</Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel - Desktop */}
      <div className="hidden md:flex px-4 pb-6 gap-3 flex-wrap items-center">
        {filterOptions.map((opt) => (
          <Select
            key={opt.label}
            label={opt.label}
            icon={opt.icon}
            value={opt.value}
            options={opt.options}
            onChange={opt.onChange}
            className="min-w-[150px]"
          />
        ))}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchParams(new URLSearchParams());
                dispatch(clearFilters());
              }}
              iconLeft={<FiX className="w-4 h-4" />}
              className="text-red-400 hover:text-red-300"
            >
              Clear
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filter Panel - Mobile */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-6 space-y-3"
          >
            {filterOptions.map((opt) => (
              <Select
                key={opt.label}
                label={opt.label}
                icon={opt.icon}
                value={opt.value}
                options={opt.options}
                onChange={opt.onChange}
              />
            ))}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                  dispatch(clearFilters());
                }}
                className="text-red-400 border-red-500/40 hover:bg-primary-muted mt-2"
              >
                Clear All Filters
              </Button>
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
          <div className="flex flex-col items-center justify-center h-64 text-text-primary">
            <p className="text-xl">No content found</p>
            <p className="text-text-muted">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {currentContent.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </div>

      <Pagination totalPages={pagination.totalPages} />

      <Footer />
    </div>
  );
};

export default BrowseAll;
