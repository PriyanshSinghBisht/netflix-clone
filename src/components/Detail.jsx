import { useParams } from "react-router-dom"
import { useDetail } from "./DP";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MovieList from "./MovieList";
import CastCard from "./CastCard";
import ShowMore from "./ShowMore";

const Detail = () => {
  const { name } = useParams();
  const detail = useDetail().detail;
  const [data, setData] = useState({});
  const [ytData, setYtData] = useState(null);
  const [recom, setRecom] = useState(null);
  const [cast, setCast] = useState(null);
  const [list,setList] = useState([]);
  const [addBtn, setAddBtn] = useState(false);

  useEffect(()=>{
    setList( JSON.parse(localStorage.getItem( `${data.name? "myTvList":"myMovieList"}`)) );
    setAddBtn( JSON.parse(localStorage.getItem( `${data.name? "myTvList":"myMovieList"}`)).includes(data.id));
    console.log(list.includes(data.id), list , data.id);
  },[data]);

  const handleAddToList = ()=>{
       const list = JSON.parse(localStorage.getItem( `${data.name? "myTvList":"myMovieList"}`));
       const set = new Set(list);
       set.has(data.id) ? set.delete(data.id) : set.add(data.id);
       window.localStorage.setItem( `${data.name? "myTvList":"myMovieList"}`, JSON.stringify(Array.from(set)));
       setList(Array.from(set));  
       setAddBtn(Array.from(set).includes(data.id));
  };

  useEffect( ()=>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_AUTH
    }
  }
        //detail
        fetch(`https://api.themoviedb.org/3/${detail?(detail[1]=='M'?'movie':'tv'): "movie" }/${name}?language=en-US`, options)
          .then(response => response.json())
          .then(result =>{ setData(result); //console.log(result); return result;
          }).then(result=> {
            const Top = window.innerWidth<=500?0:90;
            window.scrollTo({ top:Top,behavior:'instant'});
          })
          .catch(err => console.error(err));
          //youtube video
          fetch(`https://api.themoviedb.org/3/${detail[1]=='M'?'movie':'tv'}/${name}/videos?language=en-US`, options)
          .then(response => response.json())
          .then(response => {setYtData(response.results); //console.log(response.results);
          })
          .catch(err => console.error(err));
        //movie reccomendation
          fetch(`https://api.themoviedb.org/3/${detail[1]=='M'?'movie':'tv'}/${name}/recommendations?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {setRecom(response.results);// console.log(response.results);
        })
        .catch(err => console.error(err));

        //cast
        fetch(`https://api.themoviedb.org/3/${detail[1]=='M'?'movie':'tv'}/${name}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(response => {setCast(response.cast);// console.log(response);
      })
        .catch(err => console.error(err));
      },[name]);

  if(!data)
      return(<div className="w-full h-[100vh] bg-black flexCenter text-white">Loading...</div>)
else
  return (
    <div className=" bg-[#333]">
      < Navbar />
    {   data &&
        <div className="relative pt-[87px] max-[964px]:h-auto  bg-black ">
              <div className="relative">
               <div className="w-full bg-slate-400 aspect-3/2">
                <img className='w-full h-full object-fill' src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} />
                </div>
                <div className="absolute w-[25vw] max-h-[90%] right-[5%] min-[1600px]:w-[450px] max-[960px]:w-[200px] max-[960px]:bottom-[-100px] max-[500px]:w-[150px] max-[400px]:w-[35%] bottom-20">
            
               <img className='w-full h-full object-fill' src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
         
          </div>
            </div>
           <div className="gg:px-10 px-5 pt-5 flex-1 pb-10 bg-left-black flex justify-center flex-col text-white gg:absolute left-0 gg:top-0 top-1/2 gg:w-[700px] h-1/2 w-full gg:h-full">
                    <h1 className="f9  gg:text-[70px] min-[500px]:text-[40px] text-[30px]">{data.title?data.title:data.name}</h1>
                    <div className="flex my-3 text-[#ccc] font-bold text-[16px]">
                        <span>{data.release_date?data.release_date:data.first_air_date}</span> 
                        { (data.runtime || data.episode_run_time?.length==1) &&
                        <span className="pl-2 ml-2 border-left-white">
                          {data.episode_run_time? `${data.episode_run_time} m `: (`${data.runtime/60==0? null : `${(data.runtime/60).toFixed()}h ${data.runtime%60} m`}`)}
                        </span>}
                        
                        { data.genres && data.genres[0]?<div className="pl-2 ml-2 border-left-white ">{data.genres[0].name} </div>:null}
                    </div>
                    <p className=" font-[800] gg:text-[20px] text-[15px]">{data.overview}</p>
                    <div className="flex my-5 "> 
                        {/* myAdd list btn */}
                          <button onClick={handleAddToList}> 
                              <span className={`border-white border-2 p-2 ${addBtn?"bg-transparent text-white":"bg-white text-black"}
                                  text-[20px] hover`}>
                                MY LIST  <span className="inline-block mx-3 text-[20px]"> {!addBtn?<>&#43;</>:<>&#8722;</> }</span>
                              </span></button>
                       </div>
          </div>
         </div>
    }
    <div className=" gg:p-10 min-[500px]:p-5 p-2s text-white bg-[#333] min-h-[100vh]">
      
    <h1 className="text-white pl-2 border-l-4 ml-2 mt-4 mb-2 f9 border-l-blue-700 text-[30px]">Details</h1>
  { data && data.genres &&  

       <div className="grid min-[500px]:grid-cols-3 grid-cols-2 gap-y-4 px-2 place-items-start mx-2">
           <div className=" place-self-stretch">
              <h2 className="text-mywhite text-[23px]">Gners</h2>
              {data?.genres.map((gen,index)=>{
                  return(
                    <span key={index}>{`${gen.name} ${data.genres.length-1==index?'':', '} `}</span>
                  )
              })}
            </div>
        {data.name && 
            <div className="min-w-2 place-self-stretch min-[500px]:mx-5">
              <h2 className="text-mywhite whitespace-nowrap text-[23px]">Last Air Date</h2>
              <span>{data.last_air_date}</span>
             </div>}

            <div className="min-w-2 place-self-stretch min-[500px]:mx-5 ">
              <h2 className="text-mywhite text-[23px]">Status</h2>
              <span>{data.status}</span>
             </div>
          
        {data.name &&
            <div className="min-w-2 place-self-stretch ">
              <h2 className="text-mywhite text-[23px]">Seasons</h2>
            <ShowMore h={'max-h-[245px]'} >
            {data.seasons.map((season,index)=>{ 
              return(
                 <div key={index} > 
                  <div className="flex items-baseline">
                    <h1 className="text-[14px] pr-2">Name: </h1>
                    <p className="max-[500px]:text-[12px] text-[rgba(250,250,250,0.8  )]">{`${season.name}`}</p>
                    </div>
                    <div className="flex pb-3">
                    <h1 className="text-[14px] pr-2">Episodes:</h1>
                    <p className="max-[500px]:text-[12px] text-[rgba(250,250,250,0.8  )]">{`${season.episode_count}`}</p>
                    </div>
                 </div>
              )})}
              </ShowMore>
         </div>}
       </div>
    }
    
    {
          cast && cast.length!=0 &&
          <>
        <h1 className="text-white pl-2 border-l-4 ml-2 mt-4 mb-2 f9 border-l-blue-700 text-[30px] pl">Cast</h1>
       <div className="flex w-full overflow-x-scroll min-[900px]:mb-10 min-[700px]:mb-5 mb-3  no_scroll ">
        {cast.map((data, index)=>{
            return(
                <div key={index}>
                    <CastCard data={data}/>
                </div>
            )
          })}
       </div>
       </>
       }
        <h1 className="gg:ml-0 ml-3 mt-4 pl-3 border-l-4 border-l-yellow-400 gg:text-[25px] text-[24px]  ">Video Trailer | {data.title?data.title:data.name}</h1>
         <div className="grid min-[990px]:grid-cols-3 min-[600px]:grid-cols-2 grid-cols-1 ">{ ytData &&
          ytData.map((vtkey, index)=>{
          return(
             vtkey.type=='Trailer' &&
           <div key={index} className="min-w-[200px] m-2 mt-5">
            <iframe className=" w-full  flex aspect-video"
            src={`https://www.youtube.com/embed/${vtkey.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            >
             </iframe> 
               <h1 className="max-[500px]:text-[14px] text-[19px] text-center">{vtkey.name}</h1>
             </div>
          )})
       }</div>

{  ytData?.length==0 &&
    <div className=" my-5 w-[97%] max-[500px]:mx-auto h-[300px] min-[540px]:w-[500px] max-[500px]:h-[250px] flex justify-center items-center bg-white ">
        <h1  className="text-[#555] f9 text-[30px]">VIdeo not Avilable!</h1>   
    </div>
   }
     </div >

    <div className=" bg-[#333] m-0">{
         recom && recom.length>0 &&
         < MovieList data={recom} caption={`${data.name?'Series':'Movies'} Recconmendations`}/>
      }</div>
       <div className="bg-[#222]">
        < Footer/>
        </div>
     </div>
  )
}

export default Detail