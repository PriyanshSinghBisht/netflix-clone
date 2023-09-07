import { useEffect, useState } from "react"
import { useDetail } from './DP';
import { useNavigate } from 'react-router-dom';

const MyListCard = ({id, cat ,handleChangeList}) => {
    const [list, setList] = useState(JSON.parse(localStorage.getItem(`${cat=='M'?'myMovieList':'myTvList'}`)));
    const [data,setData]  = useState(null);

    const handRemove = (event)=>{
      const localList = JSON.parse(localStorage.getItem( `${cat=='T'? "myTvList":"myMovieList"}` ));
      const set = new Set(localList);
      set.has(id)?set.delete(id):set.add(id);
      window.localStorage.setItem( `${cat=='T'? "myTvList":"myMovieList"}`, JSON.stringify(Array.from(set)));
      handleChangeList();
      event.stopPropagation();
 };

 const setDetail =  useDetail();
 const navigate  = useNavigate();
 const  handleClick = ()=>{
    setDetail.setdetail(data.id , cat);
    navigate(`/${ data.id}`);
};

       useEffect(()=>{   
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:  import.meta.env.VITE_TMDB_API_AUTH
          }
        };
         fetch(`https://api.themoviedb.org/3/${cat=='M'?'movie':'tv'}/${id}?language=en-US`, options)
         .then(response => response.json())
         .then(result =>{ setData(result); console.log(result);
         }).catch(err => console.error(err));
     },[cat,id]);

  return (
    <div className="text-white min-[500px]:m-2 m-1 shadow-myWhite" onClick={handleClick}>
         <div className="min-w-0 h-auto relative">
             <div className="absolute top-1 right-1 text-[35px] p-2 bdr-white flexCenter w-[30px] h-[30px] rounded-full text-white
              hover:text-red-400 hover:backdrop-blur-sm overflow-hidden cursor-default z-10
             "
             onClick={handRemove}
             >{list.includes(id)?<>&#8722;</> : <>&#43;</> }</div>
            <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="poster" />
          </div>  
          <h1 className="ml-2 mt-1 text-white">{data && cat=='M'?data?.title:data?.name}</h1>
     </div>
  )
}

export default MyListCard