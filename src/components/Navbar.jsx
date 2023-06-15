import Netflix from '../assets/netflix.png';
import { FiSearch } from "react-icons/fi";
import {RiArrowDropDownFill} from 'react-icons/ri';
import {LuPencil} from 'react-icons/lu';
import {AiOutlineUser} from 'react-icons/ai';
import {HiOutlineQuestionMarkCircle} from 'react-icons/hi'; 
import Profile from '../assets/netflix-profile.jpg';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import {FiMenu} from 'react-icons/fi';

const Navbar = () => {
    const [drop, setDrop] = useState(false);
    const [toogle, setToogle] = useState(false);
  return (
    <div className=' select-none nav flex font-bold bg-bt justify-center items-center'>
          <div className='relative gg:hidden'>
              <div onClick={()=>setToogle(!toogle)} className='ml-5 flex text-white text-[30px]'>
                     {toogle?<AiOutlineClose/>:<FiMenu/>}
               </div> 
               <ul className={`${toogle?'flex':'hidden'} items-center Mnav text-[18px] rounded-lg  bg-black border-2 border-red-50 z-50 flex-col absolute top-[40px] left-4`}>
                   <li><Link to="/home" >Home</Link></li>
                   <li><Link to="/tvShows">Tv Shows</Link></li>
                   <li> <Link to="/movies" > Movies</Link></li>
                   <li> <Link to="/recentlyAdded" > Recently Added</Link></li>
                   <li> <Link to="/myList" > My List</Link></li>
             </ul>
             </div>
          <div className='max-[959px]:flex-1'>
            <img className=' min-[425px]:h-[43px] h-[35px] w-auto mt-6 gg:ml-12 ml-5 mb-5 mr-5' src={Netflix} alt="Netflix-folo" />
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
  )
}

export default Navbar