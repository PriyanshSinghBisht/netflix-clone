import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {AiOutlinePlus} from 'react-icons/ai';
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import MyListCard from "../components/MyListCard";
import { Button } from '../components/ui';

const MyList = () => {
   const [movies, setMovies] = useState( JSON.parse(localStorage.getItem("myMovieList")));
   const [Tv , setTv] = useState( JSON.parse(localStorage.getItem("myTvList")));

   const handleClearData =()=>{
      localStorage.clear();
      setMovies([]);
      setTv([]);
   };

   const handleChangeList = ()=>{
    setMovies(JSON.parse(localStorage.getItem("myMovieList")));
    setTv(JSON.parse(localStorage.getItem("myTvList")));
   }
   window.scrollTo({
      top:0,
       behavior:"instant"
   }
   )

  return (
    <div>
        <Navbar/>
      <div className="bg-zinc-900 min-h-[100vh] pt-[100px]">

     <div className="flex justify-between">
      <h2 className='ml-5 gg:text-[40px] min-[500px]:text-[35px] text-[30px] font-black text-white'>My List </h2>
       <Button variant="ghost" size="sm" onClick={handleClearData} className="mr-5 gg:mr-10 text-red-400">Clear All</Button>
      </div>

       <Link to='/movies' className="block min-[700px]:mx-10 mx-4 mt-10">
         <Button
           variant="outline"
           size="lg"
           fullWidth
           iconLeft={<AiOutlinePlus className="w-5 h-5" />}
           className="justify-start"
         >
           Add Movies
         </Button>
       </Link>

         {movies &&
            <div className="grid min-[1110px]:grid-cols-7 min-[800px]:grid-cols-5 min-[600px]:grid-cols-4 grid-cols-3 gg:mx-10 mx-5 max-[600px]:mx-2 mt-5">{
              movies.map((id, index)=>{
                return(
                    <>
                    <MyListCard key={id} id={id} cat={'M'} handleChangeList={handleChangeList} />
                    </>
              )})}
            </div>
         }

       <Link to='/tvShows' className="block min-[700px]:mx-10 mx-4 mt-10">
         <Button
           variant="outline"
           size="lg"
           fullWidth
           iconLeft={<AiOutlinePlus className="w-5 h-5" />}
           className="justify-start"
         >
           Add TV Series
         </Button>
       </Link>
       
          {Tv &&
            <div className="grid min-[1110px]:grid-cols-7 min-[800px]:grid-cols-5 min-[600px]:grid-cols-4 grid-cols-3 gg:mx-10 mx-5 max-[600px]:mx-2 mt-5">{
              Tv.map((id, index)=>{
                return( 
                   <MyListCard key={index} id={id} cat={'T'} handleChangeList={handleChangeList} />
              )})}
            </div>
         }


      </div>
       <div className="bg-zinc-700"><Footer/> </div>
    </div>
  )
}

export default MyList