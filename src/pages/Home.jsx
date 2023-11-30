import React from 'react'
import { useEffect,useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';


  const Links = [
    {
      name: 'forYou',
       link: 'tv/airing_today?language=en-US&page=1',
  },
    {
      name: 'popular',
       link: 'movie/popular?language=en-US&page=1',
  },
    {
      name: 'trending',
       link: 'movie/top_rated?language=en-US&page=1',
  },
    {
      name: 'tvShows',
       link: 'discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
  },
    {
      name: 'movies',
       link: 'movie/popular?language=en-US&page=1',
  },
    {
      name: 'newRelease',
       link: 'movie/now_playing?language=en-US&page=1',
  },
    {
      name: 'upcoming',
       link: 'movie/upcoming?language=en-US&page=1' ,
  },
];

const Home = () => {
    const [forYou, setForYou] = useState([]);
    const [movieData,setMovieData] = useState([]);
    const [popular, setPopular] = useState([]);
    const[trending, setTrending] = useState([]);
    const [tvData, setTvData] = useState([]);
    const[New, setNew] = useState([]);
    const[upcoming, setUpcoming] = useState([]);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:  import.meta.env.VITE_TMDB_API_AUTH
      }
    };
    
    
      const fetchData = useCallback(async (link) => {
        let data;
        try {
          const response = await fetch(`https://api.themoviedb.org/3/${link}`, options);
          const result = await response.json();
          data = result.results;
          // console.log(result);
        } catch (error) {
          data = [];
          console.error('Error fetching data:', error);
        }
        return data;
      }, []);
  
    useEffect(()=>{   

      Links.map(async(lnk, i )=> {
        const data = await fetchData(lnk.link);
        
        switch(lnk.name){
          case 'forYou':
              setForYou(data);
              break;
          
          case 'upcoming':
              setUpcoming(data);
              break;
          
          case 'movies':
              setMovieData(data);
                break;
          
          case 'tvShows':
              setTvData(data);
                break;
          
          case 'popular':
              setPopular(data);
                break;
          
          case 'trending':
              setTrending(data);
                break;
          
          case 'newRelease':
              setNew(data);
                break;
          default :
            break;
      }
      })
      
  },[])
  return (
    <div className='flex flex-col bg-zinc-900'>
       <Navbar />
        <Hero />
      <MovieList data={forYou} caption={"Top Picks For You"} />
      <MovieList data={popular} caption={"Popular on Netflix"} />
      <MovieList data={trending} caption={"Trending Now"} />
      <MovieList data={tvData} caption={"TV Shows"} />
      <MovieList data={movieData} caption={"Movies"} />
      <MovieList data={New} caption={"New Released"} />
      <MovieList data={upcoming} caption={"Upcoming Movies"} />
      <div className='w-full'>
         <Footer />
      </div>
    </div>
  )
}

export default Home