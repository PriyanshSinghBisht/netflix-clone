import { useEffect,useState } from "react"
import { useDetail } from "./DP";
import { useNavigate } from "react-router-dom";

const CardGrid = ({data , cat }) => {
  
  const setDetail = useDetail();
  const navigate = useNavigate();
    const handlePlay =()=>{
           if(data.name)
                setDetail.setdetail(data.id , 'T');
            else
                setDetail.setdetail(data.id , 'M');
              navigate(`/${ data.id}`); 
         };

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
    <div className="relative max-[450px]:flex max-[450px]:h-full flex-col-reverse min-[650px]:mx-4 mx-1 sm:my-3 my-2 max-[450px]:py-2 hover:scale-[1.2] duration-100" onClick={handlePlay}>
    <div className="max-[450px]:h-fit movie_poster select-none" > 
         <h1 className="font-black text-white max-[450px]:text-[14px] mt-2 h-[37px] h-overflow mr-2 leading-[18px]">{data.title? data.title: data.name}</h1> 
         <span className="text-mywhite max-[450px]:text-[10px]">{data.release_date? data.release_date : data.first_air_date }</span>
     </div> 
    <div className="gg:h-auto max-[450px]:aspect-1/1.8 min-[450px]:h-[200px] h-auto">
    <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?data.backdrop_path:data.poster_path}`} />
     </div>
  </div>
  )
}

export default CardGrid