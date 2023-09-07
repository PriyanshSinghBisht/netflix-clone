import Footer from "./Footer"
import Navbar from "./Navbar"
import {AiOutlinePlus} from 'react-icons/ai';
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import MyListCard from "./MyListCard";

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

   useEffect(()=>{
      console.log(movies);
      console.log(Tv);
   },[]);
  return (
    <div>
        <Navbar/>
      <div className="bg-zinc-900 min-h-[100vh] pt-[100px]">

     <div className="flex justify-between">
      <h2 className='ml-5 gg:text-[40px] min-[500px]:text-[35px] text-[30px] font-black text-white'>My List </h2>
       <button className=" underline text-red-600 mr-10" onClick={handleClearData}>clear All</button>
      </div>

       <div>
         <Link to='/movies'>
          <div className=" pl-2 min-[700px]:mx-10 mx-4 mt-10 border-white text-white hover:bg-[rgba(255,255,255,0.2)] 
           hover:border-black border-2 rounded-lg flex justify-start items-center">
            <AiOutlinePlus className="min-[700px]:text-[25px] text-[23px]"/>
            <h2 className=" font-bold min-[700px]:text-[20px] text-[15px] text-center"> Movies</h2>
             </div>
          </Link>
       </div>

         {movies &&
            <div className="grid min-[1110px]:grid-cols-7 min-[800px]:grid-cols-5 min-[600px]:grid-cols-4 grid-cols-3 gg:mx-10 mx-5 max-[600px]:mx-2 mt-5">{
              movies.map((id, index)=>{
                return(
                    <>
                    <MyListCard key={index} id={id} cat={'M'} handleChangeList={handleChangeList} />
                    </>
              )})}
            </div>
         }

       <div>
         <Link to='/tvShows'>
          <div className=" pl-2 min-[700px]:mx-10 mx-4 mt-10 border-white text-white hover:bg-[rgba(255,255,255,0.2)]
           hover:border-black border-2 rounded-lg flex justify-start items-center">
            <AiOutlinePlus className="min-[700px]:text-[25px] text-[23px]"/>
            <h2 className=" font-bold min-[700px]:text-[20px] text-[15px] text-center"> Tv Series</h2>
             </div>
          </Link>
       </div>
       
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