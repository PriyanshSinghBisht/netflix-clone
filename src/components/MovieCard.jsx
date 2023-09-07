import {useState, useEffect} from 'react'
import { useDetail } from './DP';
import { useNavigate } from 'react-router-dom';
import ribben from '../assets/red ribben.png';

const MovieCard = ({movie}) => {
      const setDetail =  useDetail();
      const navigate  = useNavigate();
  const  handleClick = ()=>{
      if(movie.name)
          setDetail.setdetail(movie.id , 'T');
      else
          setDetail.setdetail(movie.id , 'M');
        navigate(`/${ movie.id}`);
    };

       // for window width
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
              {movie.poster_path && movie.backdrop_path &&
              <>
                <div  className=' group relative m-2 hover:scale-[1.2] image-z ease-out duration-150
                      gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px]  w-[120px]
                    ' onClick={handleClick}>
                         <div className='w-full h-full absolute top-0 left-0 group-hover:bg-[rgba(0,0,0,0.2)]' />
                         <div className='gg:h-[180px] min-[700px]:h-[250px] gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] min-[500px]:h-[200px] w-[120px] h-[150px]'>
                          <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?movie.backdrop_path:movie.poster_path}`} />
                         </div>
                         <div className='movie_poster w-full'>
                             <h1 className=' font-black mt-2 mr-2 max-[500px]:text-[13px] whitespace-nowrap overflow-hidden overflow-ellipsis text-white shadow-wt w-full'>{movie.title? movie.title: movie.name} </h1>
                             <span className=' text-[12px] text-[rgba(250,250,250,0.7)]'>{movie.release_date?movie.release_date:movie.first_air_date}</span>
                             <h1 className='gg:block hidden text-white max-[700px]:text-[11px]  w-full'>{movie.vote_average}</h1>
                           </div>
                           
                        <div className=' absolute top-0 left-0 w-[45px] h-[50px]'>
                             <div className='w-full h-full relative left-[-10px] top-[-12px]'>
                                <img src={ribben} alt="ribben" className='w-full h-full' />
                                <h1 className='absolute top-4 left-2 f9 text-[11px] text-white'>{movie.name?'Series':'Movie'}</h1>
                             </div>
                        </div>
                 </div>
              </>
            }
                 
    </div>
  )
}

export default MovieCard