import Netflix from '../assets/netflix.png';
import { FiSearch } from "react-icons/fi";
import { RiArrowDropDownFill } from 'react-icons/ri';
import { LuPencil } from 'react-icons/lu';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import Profile from '../assets/netflix-profile.jpg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaTv } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { AiOutlinePlus, AiOutlineArrowLeft } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drop, setDrop] = useState(false);
  const [toogle, setToogle] = useState(false);
  const [backgroundColor, setBC] = useState(true);
  
  const isDynamic = location.pathname.includes('/M/') || location.pathname.includes('/T/') || location.pathname.includes('/cast/');

  const isActiveLink = (to) => location.pathname === to;

  useEffect(() => {
    const handle = (e) => {
      setBC(window.scrollY <= 87);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`select-none nav flex font-bold bg-bt justify-center items-center fixed top-0 left-0 right-0 z-50 ${
        !backgroundColor ? 'nav-toogle' : ''
      }`}
    >
      <div className="max-w-[2000px] w-full px-4">
        <div className="flex items-center">
          {isDynamic && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-[#222] text-white gg:ml-12 ml-5 text-[30px] cursor-pointer"
            >
              <AiOutlineArrowLeft />
            </motion.button>
          )}
          
          <div className="relative gg:hidden max-[500px]:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setToogle(!toogle)}
              className="ml-5 flex text-white text-[30px]"
            >
              {toogle ? <AiOutlineClose /> : <FiMenu />}
            </motion.button>
            
            <AnimatePresence>
              {toogle && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="items-center Mnav text-[18px] rounded-lg bg-black border-2 border-red-50 z-50 flex-col absolute top-[40px] left-4"
                >
                  {['Home', 'Browse All', 'Tv Shows', 'Movies', 'Recently Added', 'My List'].map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5, color: '#e50914' }}
                      className="px-4 py-2 cursor-pointer"
                    >
                      <Link to={item === 'Home' ? '/home' : item === 'Browse All' ? '/browse' : item === 'Tv Shows' ? '/tvShows' : item === 'Movies' ? '/movies' : item === 'Recently Added' ? '/recentlyAdded' : '/myList'}>
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          
          <div className="max-[959px]:flex-1 select-none">
            <Link to="/home">
              <motion.img
                whileHover={{ scale: 1.05 }}
                className="min-[425px]:h-[43px] h-[35px] w-auto mt-6 gg:ml-12 ml-5 mb-5 mr-5"
                src={Netflix}
                alt="Netflix-folo"
              />
            </Link>
          </div>
          
          <ul className="flex-1 gg:flex hidden items-center text-[18px] gap-6">
            {[
              { to: '/home', label: 'Home' },
              { to: '/browse', label: 'Browse All' },
              { to: '/tvShows', label: 'Tv Shows' },
              { to: '/movies', label: 'Movies' },
              { to: '/myList', label: 'My List' },
            ].map((item) => (
              <motion.li
                key={item.to}
                whileHover={{ scale: 1.1 }}
                className={`cursor-pointer transition-colors ${isActiveLink(item.to) ? 'text-red-600' : 'text-white hover:text-gray-300'}`}
              >
                <Link to={item.to}>{item.label}</Link>
              </motion.li>
            ))}
          </ul>
          
          <div className="text-white flex items-center cursor-pointer">
            <Link to='/search'>
              <motion.span
                whileHover={{ scale: 1.2, rotate: 90 }}
                className="text-white text-[25px] mr-3"
              >
                <FiSearch />
              </motion.span>
            </Link>
            
            <div className="select-none m-4 text-white text-[25px] flex flex-col items-center relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setDrop(!drop)}
                className="flex justify-items-center cursor-pointer"
              >
                <img className="h-8 rounded" src={Profile} alt="profile-logo" />
                <motion.div
                  animate={{ rotate: drop ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiArrowDropDownFill />
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {drop && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex flex-col bg-[rgba(0,0,0,0.9)] backdrop-blur-lg absolute top-[60px] right-0 z-50 rounded-lg overflow-hidden min-w-[200px]"
                  >
                    {[
                      { icon: LuPencil, label: 'Manage Profiles', disabled: true },
                      { icon: AiOutlineUser, label: 'Account', disabled: true },
                      { icon: HiOutlineQuestionMarkCircle, label: 'Help Center', disabled: true },
                    ].map((item, i) => (
                      <motion.button
                        key={i}
                        whileHover={!item.disabled ? { backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
                        className={`flex text-[18px] items-center p-3 ${item.disabled ? 'text-gray-600 cursor-not-allowed' : 'text-white'}`}
                        disabled={item.disabled}
                      >
                        <item.icon className="mr-4 h-5 w-auto" />
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                    <hr className="color-dim border-gray-700" />
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                      }}
                      className="flex text-[18px] items-center p-3 text-center text-white"
                    >
                      <span className="w-full text-center">Sign out of Netflix</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <div className="min-[500px]:hidden fixed bottom-0 left-0 z-[50] bg-[rgba(0,0,0,0.95)] w-full backdrop-blur-lg">
        <ul className="flex justify-around btm-nav">
          {[
            { to: '/home', icon: AiFillHome, label: 'Home' },
            { to: '/tvShows', icon: FaTv, label: 'Tv Shows' },
            { to: '/movies', icon: BiCameraMovie, label: 'Movies' },
            { to: '/myList', icon: AiOutlinePlus, label: 'My List' },
          ].map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="navlink">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flexCenter ${isActiveLink(item.to) ? 'bg-white text-black' : ''} pt-2 flex-col w-full h-full`}
                >
                  <item.icon />
                  <h1 className="text-xs">{item.label}</h1>
                </motion.div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;