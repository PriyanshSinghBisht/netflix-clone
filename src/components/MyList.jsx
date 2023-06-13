import Footer from "./Footer"
import Navbar from "./Navbar"
import {AiOutlinePlus} from 'react-icons/ai';

 export const movielist = [];
const MyList = () => {
  return (
    <div>
        <Navbar/>
      <div className="bg-zinc-900 min-h-[100vh] pt-[100px]">
      <h2 className='ml-5 gg:text-[40px] min-[500px]:text-[35px] text-[30px] font-black text-white'>My List </h2>
       <div>
        <a href='movies'> 
          <div className="ml-10 mt-10 w-[150px] h-[200px] border-white border-2 flex-col rounded-lg flex justify-center items-center">
            <AiOutlinePlus className="text-white text-[50px]"/>
            <h2 className="text-white font-bold text-[20px] text-center mt-5"> Add Movies</h2>
             </div>
          </a>
       </div>
      </div>
       <div className="bg-zinc-700"><Footer/> </div>
    </div>
  )
}

export default MyList