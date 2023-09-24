import { useDetail } from "./DP";
import { useNavigate } from "react-router-dom";

const SearchCard = ({data , windowWidth}) => {
    
    const setDetail = useDetail();
    const navigate = useNavigate();   
    const handleClick =()=>{
        if(data.name)
             setDetail.setdetail(data.id , 'T');
         else
             setDetail.setdetail(data.id , 'M');
           navigate(`/${ data.id}?cat=${ data.name?"T":"M"}`); 
      };

  return (
    <div  className="max-[450px]:flex flex-col-reverse  relative mx-3 my-4 hover:scale-[1.2] duration-100" onClick={handleClick}>
    <div className="movie_poster" > 
         <h1 className="font-black text-white ">{data.title?data.title:data.name}</h1> 
         <span className="text-mywhite">{data.release_date?data.release_date:data.first_air_date}</span>
     </div> 
    <div className="gg:h-auto w-full h-[200px]">
    <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?data.backdrop_path:data.poster_path}`} />
     </div>
 </div>
  )
}

export default SearchCard