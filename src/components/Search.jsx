import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";


const Search = () => {
    const [search, setSearch] = useState('');
    const [searchData , setSearchData] = useState([]);
    const inputRef = useRef(null);
       
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGY3MTg2MmQ0ODE2NDI5NDliMzQ1NDIyYWJjNzI0NiIsInN1YiI6IjY0NzM2ZDlkZGQ3MzFiMmQ3NjJiNzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-6klEYQifWk03pnEL92TJ7Vk0zXImYsGN9mUENJxMLA'
        }
      };

      const fetchData = ()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US`, options)
          .then(response => response.json())
          .then(response => { setSearchData(response.results); console.log(searchData); })
          .catch(err => console.error(err));
       };

    const handleClick = ()=>{
        const input = inputRef.current;
        const str = input.value;
        const rep = str.replace(' ', '%20');
        setSearch(rep ,false);
        fetchData();
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
    <div>
        <Navbar />
        <div className="bg-zinc-900 min-h-[100vh] w-full pt-[90px]">
             <div className="flex border-2 border-red-800 rounded-[5px] max-w-[800px] w-fit m-auto">
                   <div className="flex-1"> <input ref={inputRef}  onKeyDown={handleClick} className=" font-bold text-black border-b-2 border-[rgba(0,0,0,0.4)] gg:w-[700px] min-[500px]:w-[400px] w-[300px] outline-none py-4 px-2" type="text"  placeholder="Search" name="search"/></div>
                  <button name="submit" onClick={handleClick} className="px-4 bg-red-600 rounded-sm text-[30px] text-white"><FiSearch/></button>
             </div>

             <div className="grid mt-5 mx-5 pb-10 min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 min-[500px]:grid-cols-3 grid-cols-2">
                 {
                    searchData.map((data, index)=>{{
                        return(
                      
                         <>
                          { data.poster_path && data.backdrop_path &&
                             <div  key={index} className="relative mx-3 my-4 hover:scale-[1.2] duration-100">
                                 <div className="movie_poster" > 
                                      <h1 className="font-black text-white ">{data.title}</h1> 
                                      <span className="text-mywhite">{data.release_date}</span>
                                  </div> 
                                 <div className="gg:h-auto w-full h-[200px]">
                                 <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w500/${(windowWidth>960)?data.backdrop_path:data.poster_path}`} />
                                  </div>
                              </div>
                          }
                        </>
                        )
                    }})
                 }
             </div>
        </div>
        <div className="bg-slate-900"><Footer/></div>
    </div>
  )
}

export default Search