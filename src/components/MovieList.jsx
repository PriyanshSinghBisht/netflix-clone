import React, { useEffect } from 'react'
import {useState, useRef } from 'react';
import {AiOutlineRight} from 'react-icons/ai';

const MovieList = ({data, caption}) => {
     const scrl = useRef(null);
     const left = useRef(null);
     const right = useRef(null);

     const src = scrl.current; 
      const handleClick = (dir) =>{ 
         src?.scrollTo({
          left: src.scrollLeft + (dir*950) ,
          behavior: "smooth"
        }); 
      };  

      // for window width
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

      useEffect(() => {
          console.log(data);
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
    <h2 className='mt-10 ml-14 text-white font-black text-[20px]'>{caption}</h2>
     <div className='relative flex mx-10 py-2'>
       <button ref={left} className='min-[1020px]:flex hidden items-center' onClick={()=>{handleClick(-1)}}>
           <AiOutlineRight className='rotate-180 text-[#E50914] text-[25px]'/>
       </button>

        <div  ref={scrl} className='py-5 flex-1 flex scrollbar-hidden overflow-y-scroll'>{
          data?.map((movie, index)=>{
               return(
                   <div key={index} className=' group relative m-2 hover:scale-[1.2] image-z ease-out duration-150'>
                      {movie.poster_path && movie.backdrop_path &&
                      <>
                         <div className='movie_poster'>
                             <h1 className=' gg:block hidden font-black text-white shadow-wt w-full'>{movie.title? movie.title: movie.name}</h1>
                             <span className='text-[rgba(250,250,250,0.7)]'>{movie.release_date}</span>
                             <h1 className='text-white   w-full'>{movie.vote_average}</h1>
                         </div>
                         <div className='w-full h-full absolute top-0 left-0 group-hover:bg-[rgba(0,0,0,0.2)]' />
                         <div className='gg:h-[180px] min-[500px]:h-[250px] gg:w-[300px] min-[500px]:w-[200px] w-[150px] h-[200px]'>
                          <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?movie.backdrop_path:movie.poster_path}`} />
                         </div>
                       </>
                     }
                   </div>
              )})
        }
        </div>
        <button ref={right} className='min-[1020px]:flex hidden items-center' onClick={()=>{handleClick(1)}}>
           <AiOutlineRight className=' text-[#E50914] text-[25px]'/>
       </button>
        </div>
    </div>
  )
}

export default MovieList