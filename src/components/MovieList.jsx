import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import MovieCard from './MovieCard';
import LoadingCard from '../Loader/LoadingCard';

const MovieList = ({ data, caption }) => {
  const scrl = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const handleClick = (dir) => {
    if (scrl.current) {
      scrl.current.scrollTo({
        left: scrl.current.scrollLeft + (dir * 950),
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrl.current) {
      setShowLeftBtn(scrl.current.scrollLeft > 50);
      setShowRightBtn(scrl.current.scrollLeft < scrl.current.scrollWidth - scrl.current.clientWidth - 50);
    }
  };

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className='pl-2 border-l-4 border-l-red-500 min-[500px]:mt-10 mt-5 min-[500px]:ml-10 ml-5 text-white font-black min-[800px]:text-[30px] text-[20px]'>
          {caption}
        </h2>
        <div className='relative flex my-3 min-[700px]:mx-10 min-[500px]:mx-5 mx-2 py-0 overflow-hidden'>
          {[...Array(5)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className='pl-2 border-l-4 border-l-red-500 min-[500px]:mt-10 mt-5 min-[500px]:ml-10 ml-5 text-white font-black min-[800px]:text-[30px] text-[20px]'>
        {caption}
      </h2>
      
      <div className='relative flex items-center min-[700px]:mx-10 min-[500px]:mx-5 mx-2 py-0'>
        <AnimatePresence>
          {showLeftBtn && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className='min-[1020px]:flex hidden items-center justify-center absolute left-0 z-10 h-full w-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors'
              onClick={() => handleClick(-1)}
            >
              <AiOutlineRight className='rotate-180 text-white text-[25px] hover:text-red-500 transition-colors' />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          ref={scrl}
          onScroll={handleScroll}
          className='min-[500px]:py-5 py-3 flex-1 flex scrollbar-hidden overflow-x-auto overflow-y-hidden scroll-smooth'
        >
          {data?.map((movie, index) => (
            <MovieCard key={movie.id || index} movie={movie} index={index} />
          ))}
        </div>

        <AnimatePresence>
          {showRightBtn && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className='min-[1020px]:flex hidden items-center justify-center absolute right-0 z-10 h-full w-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors'
              onClick={() => handleClick(1)}
            >
              <AiOutlineRight className='text-white text-[25px] hover:text-red-500 transition-colors' />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MovieList;