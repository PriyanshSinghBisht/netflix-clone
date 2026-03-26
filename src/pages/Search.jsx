import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import SearchCard from "../components/SearchCard";
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

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
        <div className="flex rounded-[5px] max-w-[800px] w-fit m-auto pt-5">
          <div className="flex-1 border-2 border-white border-r-transparent"> 
            <input 
              onKeyDown={handleClick} 
              className="bg-transparent font-bold text-white border-b-2 border-[rgba(0,0,0,0.4)] gg:w-[700px] min-[500px]:w-[400px] min-[380px]:w-[300px] w-auto outline-none min-[500px]:py-4 py-2 px-2" 
              type="text" 
              placeholder="Search" 
              name="search"
            />
          </div>
          <button name="submit" className="px-4 bg-red-600 rounded-sm text-[30px] text-white">
            <FiSearch/>
          </button>
        </div>
        
        <h1 className="border-l-4 border-red-500 pl-2 text-white text-[40px] ml-5 mt-5 bg-[#8b8585] mr-5">Movies:</h1>
        <div className="grid mt-5 mx-5 pb-10 min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 min-[500px]:grid-cols-3 grid-cols-2">
          {movies.map((data, index) => (
            <>
              {data.poster_path && data.backdrop_path && (
                <SearchCard key={index} data={data} windowWidth={windowWidth} />
              )}
            </>
          ))}
        </div>
        
        <h1 className="border-l-4 border-lime-300 pl-2 text-white text-[40px] ml-5 bg-[#8b8585] mr-5">Series:</h1>
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