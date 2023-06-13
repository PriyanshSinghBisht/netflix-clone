import { useEffect,useState } from "react"


const CardGrid = ({data , cat}) => {

         // for window window 
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
    <div className="relative mx-3 my-4 hover:scale-[1.2] duration-100">
    <div className="movie_poster select-none" > 
         <h1 className="font-black text-white ">{data.title? data.title: data.name}</h1> 
         <span className="text-mywhite">{data.release_date? data.release_date : data.first_air_date }</span>
     </div> 
    <div className="gg:h-auto w-full h-[200px]">
    <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?data.backdrop_path:data.poster_path}`} />
     </div>
  </div>
  )
}

export default CardGrid