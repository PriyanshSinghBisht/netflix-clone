import {useState, useRef } from 'react';
import {AiOutlineRight} from 'react-icons/ai';
import MovieCard from './MovieCard';
import LoadingCard  from './LoadingCard';

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
    if(data.length === 0)
       return (
          <div>
               <h2 className='pl-2 border-l-4 border-l-red-500  min-[500px]:mt-10 mt-5  min-[500px]:ml-10  ml-5 text-white font-black min-[800px]:text-[30px] text-[20px]'>{caption}</h2>
               <div className='relative flex my-3 min-[700px]:mx-10 min-[500px]:mx-5 mx-2 py-0'>
                  <LoadingCard/>
                  <LoadingCard/>
                  <LoadingCard/>
                  <LoadingCard/>
                  <LoadingCard/>
               </div>
          </div>
        )
   else
  return (
    <div>
    <h2 className='pl-2 border-l-4 border-l-red-500  min-[500px]:mt-10 mt-5  min-[500px]:ml-10  ml-5 text-white font-black min-[800px]:text-[30px] text-[20px]'>{caption}</h2>
     <div className='relative flex min-[700px]:mx-10 min-[500px]:mx-5 mx-2 py-0'>
       <button ref={left} className='min-[1020px]:flex hidden items-center' onClick={()=>{handleClick(-1)}}>
           <AiOutlineRight className='rotate-180 text-[#E50914] text-[25px]'/>
       </button>

        <div  ref={scrl} className='min-[500px]:py-5 py-3 flex-1 flex scrollbar-hidden overflow-y-scroll'>{
          data?.map((movie, index)=>{
               return(
                  <div key={index}>
                     <MovieCard movie={movie}/>    
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