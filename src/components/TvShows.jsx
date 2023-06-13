import Navbar from "./Navbar"
import GridList from "./GridList"
import { useState, useEffect } from "react"

const TvShows = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(()=>{   
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGY3MTg2MmQ0ODE2NDI5NDliMzQ1NDIyYWJjNzI0NiIsInN1YiI6IjY0NzM2ZDlkZGQ3MzFiMmQ3NjJiNzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6klEYQifWk03pnEL92TJ7Vk0zXImYsGN9mUENJxMLA'
      }
    };
    fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(response => response.results)
      .then(results => setMovie((prev)=> [ ...prev,...results]))
      .catch(err => console.error(err));
  },[page]);

  const handleInfiniteScroll = async()=>{
        try{
            if( window.innerHeight + document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight )
               setPage((prev)=> prev+1)
        }
        catch(error){
           console.log(error);
        }
  };
  useEffect(()=>{
     window.addEventListener('scroll', handleInfiniteScroll);
     return ()=> window.removeEventListener('scroll', handleInfiniteScroll); 
  },[]);
  return (
      <div className=" pt-[100px] bg-zinc-900 ">
          <Navbar/>
          <div>
              <GridList caption='Tv Shows List' Data={movie} cat='tvShows'  />   
          </ div>
    </div>
  )
}

export default TvShows