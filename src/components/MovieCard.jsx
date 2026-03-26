import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDetail } from './DP';
import { useNavigate } from 'react-router-dom';
import ribben from '../assets/red ribben.png';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { useLazyLoad } from '../hooks/useLazyLoad';

const MovieCard = ({ movie, index = 0 }) => {
  const setDetail = useDetail();
  const navigate = useNavigate();

  const handleClick = () => {
    if (movie.name) {
      setDetail.setdetail(movie.id, 'T');
    } else {
      setDetail.setdetail(movie.id, 'M');
    }
    navigate(`/${movie.name ? "T" : "M"}/${movie.id}`);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { ref, isInView, hasLoaded, onLoad } = useLazyLoad();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (!movie.poster_path || !movie.backdrop_path) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative m-2 gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] w-[120px]"
      onClick={handleClick}
    >
      <motion.div
        whileHover={{ scale: 1.15, zIndex: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group cursor-pointer"
      >
        <div className="w-full h-full absolute top-0 left-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-all duration-300 rounded-lg" />
        
        <div className="gg:h-[180px] min-[700px]:h-[250px] gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] min-[500px]:h-[200px] w-[120px] h-[150px] overflow-hidden rounded-lg shadow-lg">
          {!hasLoaded && (
            <SkeletonLoader className="w-full h-full rounded-lg" />
          )}
          {isInView && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: hasLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/${windowWidth > 960 ? 'w1280' : 'w500'}/${windowWidth > 960 ? movie.backdrop_path : movie.poster_path}`}
              onLoad={onLoad}
              alt={movie.title || movie.name}
            />
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white"
        >
          {movie.name ? 'Series' : 'Movie'}
        </motion.div>
      </motion.div>

      <div className="movie_poster w-full mt-2">
        <h1 className="font-black text-sm max-[500px]:text-[13px] whitespace-nowrap overflow-hidden overflow-ellipsis text-white shadow-wt w-full">
          {movie.title || movie.name}
        </h1>
        <span className="text-[12px] text-[rgba(250,250,250,0.7)]">
          {movie.release_date || movie.first_air_date}
        </span>
        <div className="gg:block hidden text-white text-xs mt-1 flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;