import Navbar from "../components/Navbar"
import GridList from "../components/GridList"
import { useState, useEffect } from "react"

const RecentyAdded = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_AUTH
    }
  };

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${page}`, options)
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
              <GridList caption='Recently Added' Data={movie} cat='trending'  />   
          </ div>
    </div>
  )
}

export default RecentyAdded