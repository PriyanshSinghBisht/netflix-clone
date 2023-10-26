import Netflix from '../assets/netflix.png';
import { FiSearch } from "react-icons/fi";
import {RiArrowDropDownFill} from 'react-icons/ri';
import {LuPencil} from 'react-icons/lu';
import {AiOutlineUser} from 'react-icons/ai';
import {HiOutlineQuestionMarkCircle} from 'react-icons/hi'; 
import Profile from '../assets/netflix-profile.jpg';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { Link, NavLink,useLocation } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import {FiMenu} from 'react-icons/fi';
import {  useEffect } from 'react';
import {AiFillHome} from 'react-icons/ai';
import{FaTv} from 'react-icons/fa';
import {BiCameraMovie} from 'react-icons/bi';
import {AiOutlinePlus, AiOutlineArrowLeft}  from 'react-icons/ai';
import { useParams, } from 'react-router-dom';

const Navbar = () => {
    const {name} = useParams();
    const isDynamic = !!name;
    const [drop, setDrop] = useState(false);
    const [toogle, setToogle] = useState(false);
    const [backgroundColor,setBC] = useState(true);
    const location = useLocation();
    const isActiveLink = (to)=>{
        return !!(location.pathname===to);
    }

    useEffect(()=>{
      const handle = (e)=>{
        if( window.scrollY > 87)
              setBC(false);
        else
              setBC(true);
   };
         window.addEventListener( "scroll" , handle);

         return ()=>{
          window.removeEventListener("scroll",handle);
         };
  },[]);
  return (
   <div>
    <div className={`select-none nav flex font-bold bg-bt justify-center items-center ${!backgroundColor?'nav-toogle':''}`}>
    <div className={`${isDynamic?null:"hidden"} rounded-full hover:bg-[#222] text-white gg:ml-12 ml-5 text-[30px]`} onClick={()=>history.back()}><AiOutlineArrowLeft/></div>
          <div className='relative gg:hidden max-[500px]:hidden '>
              <div onClick={()=>setToogle(!toogle)} className='ml-5 flex text-white text-[30px]'>
                     {toogle?<AiOutlineClose/>:<FiMenu/>}
               </div> 
               <ul className={`${toogle?'flex':'hidden'} items-center Mnav text-[18px] rounded-lg  bg-black  border-2 border-red-50 z-50 flex-col absolute top-[40px] left-4`}>
                   <li><Link to="/home" >Home</Link></li>
                   <li><Link to="/tvShows">Tv Shows</Link></li>
                   <li> <Link to="/movies" > Movies</Link></li>
                   <li> <Link to="/recentlyAdded" > Recently Added</Link></li>
                   <li> <Link to="/myList" > My List</Link></li>
             </ul>
             </div>
          <div className=' max-[959px]:flex-1 select-none'>
            <Link to="/home" >
            <img className=' min-[425px]:h-[43px] h-[35px] w-auto mt-6 gg:ml-12 ml-5 mb-5 mr-5' src={Netflix} alt="Netflix-folo" 
             onClick={(event)=>event.stopPropagation()}/></Link>
             </div>
        <ul className='flex-1 gg:flex hidden items-center text-[18px]'>
           <li><Link to="/home" >Home</Link></li>
           <li><Link to="/tvShows">Tv Shows</Link></li>
           <li> <Link to="/movies" > Movies</Link></li>
           <li> <Link to="/recentlyAdded" > Recently Added</Link></li>
           <li> <Link to="/myList" > My List</Link></li>
        </ul>
         <div className='text-white flex items-center cursor-pointer text-wt'> 
                <Link to='/search'>< FiSearch /></Link>
               <h1 className='text-red-900 line-through  max-[425px]:hidden m-4 cursor-pointer text-wt'>Kids</h1>
               <h1 className='text-red-900 line-through  max-[425px]:hidden m-4 cursor-pointer text-wt '>DVD</h1>
              <div className=' select-none m-4 text-white text-[25px] flex flex-col items-center' onClick={()=>setDrop(!drop)}>
                  <div className='flex justify-items-center'> <motion.img className='h-8' src={Profile} alt="profile-logo" /> <RiArrowDropDownFill className={`${drop?'rotate-180':'rotate-0'}`} /> </div>
                   <div className={` ${drop? 'flex': 'hidden'} flex-col bg-[rgba(0,0,0,0.8)] absolute top-[100px] right-[10px] z-2`}>
                        <a href="#" className=' text-red-900 line-through  flex text-[18px] items-center p-2'> < LuPencil className=' line-through mr-4 font-bold h-7 w-auto'/> <span>Manage Profiles</span> </a>
                        <a href="#" className='text-red-900 line-through flex text-[18px] items-center p-2'> < AiOutlineUser className='mr-4 font-bold h-7 w-auto'/> <span>Account</span> </a>
                        <a href="#" className=' text-red-900 line-through  flex text-[18px] items-center p-2'> < HiOutlineQuestionMarkCircle className='mr-4 font-bold h-7 w-auto'/> <span>Help Center</span> </a>
                        <hr className='color-dim'/>
                        <a href="/netflix-clone/" className='flex text-[18px] items-center p-3 text-center'> <span>Sign out of Netflix</span> </a>
                   </div>
              </div>
         </div>
      </div>
         <div className='min-[500px]:hidden fixed bottom-0 left-0 z-[50] bg-[rgba(0,0,0,1)] w-full' >
            <ul className='flex justify-around btm-nav'>
                 <li>
                   <NavLink to='/home' className="navlink"><div className={`flexCenter ${isActiveLink('/home')?"bg-white text-black":null} pt-2  flex-col w-full h-full`} >
                        <AiFillHome/><h1>Home</h1>
                        </div></NavLink></li>
                  <li>
                  <NavLink to='/tvShows' className="navlink"><div className={`flexCenter ${isActiveLink('/tvShows')?"bg-white text-black":null}  pt-2 flex-col w-full h-full`} >
                        <FaTv/><h1>Tv Shows</h1>
                        </div></NavLink></li>
                  <li>
                  <NavLink to='/movies' className="navlink"><div className={`flexCenter ${isActiveLink('/movies')?"bg-white text-black":null} pt-2  flex-col w-full h-full`} >
                        <BiCameraMovie/><h1>Movies</h1>
                        </div></NavLink></li>
                  <li>
                  <NavLink to='/myList' className="navlink"><div className={`flexCenter ${isActiveLink('/myList')?"bg-white text-black":null}  pt-2  flex-col w-full h-full`} >
                        <AiOutlinePlus/><h1>My List</h1>
                        </div></NavLink></li>
            </ul>
         </div>
    </div>
  )
}

export default Navbar