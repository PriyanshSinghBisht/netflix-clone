import React from 'react'
import { useEffect,useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieList from './MovieList';
import Footer from './Footer';

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

    useEffect(()=>{   
  // api calls for movies & tv shows data
    fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => { setForYou(response.results);} )
      .catch(err => console.error(err));
  
    
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => { setUpcoming(response.results);} ) 
      .catch(err => console.error(err));

   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => { setMovieData(response.results);})
  .catch(err => console.error(err));
  
  fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => { setTvData(response.results);})
    .catch(err => console.error(err));
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => { setPopular(response.results);} )
    .catch(err => console.error(err));
 
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => { setTrending(response.results);})
    .catch(err => console.error(err));
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => { setNew(response.results);})
    .catch(err => console.error(err));
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