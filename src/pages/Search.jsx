import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import SearchCard from "../components/SearchCard";
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { Input, Button } from '../components/ui';

const useSearch = (query) => {
  const { data: movieData } = useQuery({
    queryKey: ['search', 'movie', query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await api.get('/search/movie', { params: { query, language: 'en-US' } });
      return data.results;
    },
    enabled: !!query,
  });

  const { data: tvData } = useQuery({
    queryKey: ['search', 'tv', query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await api.get('/search/tv', { params: { query, language: 'en-US' } });
      return data.results;
    },
    enabled: !!query,
  });

  return { movies: movieData || [], tvShows: tvData || [] };
};

const Search = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  
  window.scrollTo({ top: 0, behavior: "instant" });

  const { movies, tvShows } = useSearch(query);

  const handleClick = (e) => {
    const str = e.target.value;
    const rep = str.replace(' ', '%20');
    setSearch(rep);
    setQuery(e.target.value);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div>
      <Navbar />
      <div className="bg-zinc-900 min-h-[100vh] pt-[90px]">
        <div className="flex items-center gap-0 max-w-[600px] mx-auto pt-5 px-4">
          <div className="flex-1">
            <Input
              value={search}
              onChange={(e) => {
                const str = e.target.value;
                const rep = str.replace(' ', '%20');
                setSearch(rep);
                setQuery(e.target.value);
              }}
              placeholder="Search movies & TV shows..."
              icon={<FiSearch className="w-4 h-4" />}
              className="rounded-r-none border-r-0"
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="rounded-l-none px-5 h-[42px]"
            iconLeft={<FiSearch className="w-4 h-4" />}
          >
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
        
        <h1 className="border-l-4 border-red-500 pl-3 text-white text-2xl font-bold ml-5 mt-8 mb-2">Movies</h1>
        <div className="grid mt-5 mx-5 pb-10 min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 min-[500px]:grid-cols-3 grid-cols-2">
          {movies.map((data, index) => (
            <>
              {data.poster_path && data.backdrop_path && (
                <SearchCard key={index} data={data} windowWidth={windowWidth} />
              )}
            </>
          ))}
        </div>
        
        <h1 className="border-l-4 border-lime-300 pl-3 text-white text-2xl font-bold ml-5 mt-8 mb-2">TV Series</h1>
        <div className="grid mt-5 mx-5 pb-10 min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 min-[500px]:grid-cols-3 grid-cols-2">
          {tvShows.map((data, index) => (
            <>
              {data.poster_path && data.backdrop_path && (
                <SearchCard key={index} data={data} windowWidth={windowWidth} />
              )}
            </>
          ))}
        </div>
      </div>
      <div className="bg-slate-900"><Footer/></div>
    </div>
  )
}

export default Search