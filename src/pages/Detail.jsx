import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import CastCard from "../components/CastCard";
import ShowMore from "../components/ShowMore";
import SkeletonLoader from '../Loader/SkeletonLoader';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMovieDetails, useMovieVideos, useMovieRecommendations, useMovieCredits, useMovieImages, useSimilarMovies } from '../hooks/useApi';
import { Button, Badge } from '../components/ui';

const Detail = () => {
  const { id, cat } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, images: [], type: '' });
  const backdropRef = useRef(null);
  const posterRef = useRef(null);

  const { data: data, isLoading } = useMovieDetails(id, cat);
  const { data: ytData } = useMovieVideos(id, cat);
  const { data: recom } = useMovieRecommendations(id, cat);
  const { data: cast } = useMovieCredits(id, cat);
  const { data: images } = useMovieImages(id, cat);
  const { data: similar } = useSimilarMovies(id, cat);

  const backdrops = images?.backdrops?.slice(0, 20) || [];
  const posters = images?.posters?.slice(0, 20) || [];

  useEffect(() => {
    setList(
      JSON.parse(
        localStorage.getItem(`${cat === "T" ? "myTvList" : "myMovieList"}`) || "[]"
      )
    );
  }, [cat]);

  useEffect(() => {
    if (data?.id) {
      setAddBtn(list.includes(data.id));
    }
  }, [data, list]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id, cat]);

  const handleAddToList = () => {
    const currentList = JSON.parse(
      localStorage.getItem(`${data?.name ? "myTvList" : "myMovieList"}`) || "[]"
    );
    const set = new Set(currentList);
    set.has(data.id) ? set.delete(data.id) : set.add(data.id);
    const newList = Array.from(set);
    window.localStorage.setItem(
      `${data?.name ? "myTvList" : "myMovieList"}`,
      JSON.stringify(newList)
    );
    setList(newList);
    setAddBtn(newList.includes(data.id));
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const openLightbox = (images, index, type) => {
    setLightbox({ open: true, index, images, type });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0, images: [], type: '' });
  };

  const prevLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1,
    }));
  };

  const nextLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1,
    }));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox.open]);

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction * 600, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#333]">
        <Navbar />
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#333] overflow-x-hidden"
    >
      <Navbar />
      <div className="sm:hidden flex w-full h-20 blur-[25px]"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-[964px]:h-auto"
      >
        <div className="relative">
          <div className="w-[100vw] max-h-[100vh] aspect-video bg-slate-800 overflow-hidden relative z-0">
            {data?.backdrop_path ? (
              <>
                {!backdropLoaded && <SkeletonLoader className="w-full h-full" />}
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: backdropLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                  alt="movie pic"
                  onLoad={() => setBackdropLoaded(true)}
                />
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <SkeletonLoader className="w-full h-full" />
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-5" />
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute shadow-2xl flexCenter bg-gray-800 w-[25vw] min-h-[37vw] gg:right-[10%] right-[5%] min-[1600px]:w-[450px] max-[960px]:w-[180px] max-[960px]:bottom-[-80px] max-[500px]:w-[140px] max-[400px]:w-[35%] bottom-16 rounded-lg overflow-hidden z-20"
          >
            {data?.poster_path ? (
              <>
                {!posterLoaded && <SkeletonLoader className="w-full h-full" />}
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: posterLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  alt="movie poster"
                  onLoad={() => setPosterLoaded(true)}
                />
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <SkeletonLoader className="w-full h-full" />
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="gg:pl-[10%] px-5 pt-5 flex-1 pb-10 bg-left-black flex justify-center flex-col text-white gg:absolute left-0 right-[40vw] gg:top-0 top-1/2 h-1/2 gg:h-full z-10"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="f9 gg:text-[70px] min-[500px]:text-[40px] text-[30px] relative"
          >
            {data?.title || data?.name}
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 my-3 text-[#ccc] font-bold text-[16px] relative"
          >
            {data?.release_date && (
              <Badge variant="default" size="md">
                {data.release_date.split('-')[0]}
              </Badge>
            )}
            
            {data?.runtime && (
              <span className="text-gray-300">{formatRuntime(data.runtime)}</span>
            )}
            
            {data?.episode_run_time?.[0] && (
              <span className="text-gray-300">{formatRuntime(data.episode_run_time[0])}</span>
            )}
            
            {data?.genres?.map((genre) => (
              <span key={genre.id} className="text-gray-300">
                {genre.name}
              </span>
            ))}
            
            {data?.vote_average && (
              <span className="flex items-center gap-1 text-yellow-400">
                ★ {data.vote_average.toFixed(1)}
              </span>
            )}
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-[800] gg:text-[20px] text-[15px] relative line-clamp-3"
          >
            {data?.tagline && (
              <p className="text-gray-400 italic mb-2">"{data.tagline}"</p>
            )}
            {data?.overview}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex my-5 gap-4"
          >
            <Button
              variant={addBtn ? 'outline' : 'primary'}
              size="lg"
              onClick={handleAddToList}
              iconRight={<span className="text-lg">{!addBtn ? "+" : "−"}</span>}
            >
              MY LIST
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="gg:p-10 min-[500px]:p-5 text-white bg-[#333] min-h-screen pt-[200px] lg:pt-10">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-white pl-2 border-l-4 ml-2 mt-4 mb-4 f9 border-l-blue-700 text-[30px]"
        >
          Details
        </motion.h1>
        
        {data?.genres && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid min-[500px]:grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-8"
          >
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Status</h3>
              <p className="text-white font-bold">{data.status}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Language</h3>
              <p className="text-white font-bold">{data.original_language?.toUpperCase()}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
              <p className="text-white font-bold">
                {data.budget ? `$${data.budget.toLocaleString()}` : '-'}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
              <p className="text-white font-bold">
                {data.revenue ? `$${data.revenue.toLocaleString()}` : '-'}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-1">Type</h3>
              <p className="text-white font-bold">{data.media_type || (cat === 'M' ? 'Movie' : 'TV Show')}</p>
            </div>
            {data?.networks && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm mb-1">Networks</h3>
                <div className="flex gap-2">
                  {data.networks.map((network) => (
                    <span key={network.id} className="text-white font-bold">{network.name}</span>
                  ))}
                </div>
              </div>
            )}
            {data?.production_companies?.[0] && (
              <div className="bg-gray-800 p-4 rounded-lg col-span-2">
                <h3 className="text-gray-400 text-sm mb-1">Production</h3>
                <p className="text-white text-sm">
                  {data.production_companies.map(c => c.name).join(', ')}
                </p>
              </div>
            )}
          </motion.div>
        )}

        <div className="grid min-[500px]:grid-cols-2 gap-y-4 px-2 place-items-start mx-2 mb-8">
          <div className="place-self-stretch">
            <h2 className="text-white text-[23px]">Genres</h2>
            {data?.genres?.map((gen, index) => (
              <span key={index} className="text-gray-300">
                {gen.name}{data.genres.length - 1 === index ? "" : ", "}
              </span>
            ))}
          </div>
          
          {data?.number_of_seasons && (
            <div className="min-w-2 place-self-stretch min-[500px]:mx-5">
              <h2 className="text-white text-[23px]">Seasons</h2>
              <span className="text-gray-300">{data.number_of_seasons} Seasons</span>
            </div>
          )}
          
          {data?.number_of_episodes && (
            <div className="min-w-2 place-self-stretch min-[500px]:mx-5">
              <h2 className="text-white text-[23px]">Episodes</h2>
              <span className="text-gray-300">{data.number_of_episodes} Episodes</span>
            </div>
          )}
          
          {data?.last_air_date && (
            <div className="min-w-2 place-self-stretch">
              <h2 className="text-white text-[23px]">Last Air Date</h2>
              <span className="text-gray-300">{data.last_air_date}</span>
            </div>
          )}
          
          {data?.first_air_date && (
            <div className="min-w-2 place-self-stretch">
              <h2 className="text-white text-[23px]">First Air Date</h2>
              <span className="text-gray-300">{data.first_air_date}</span>
            </div>
          )}
          
          {data?.in_production !== undefined && (
            <div className="min-w-2 place-self-stretch">
              <h2 className="text-white text-[23px]">In Production</h2>
              <span className="text-gray-300">{data.in_production ? 'Yes' : 'No'}</span>
            </div>
          )}
        </div>

        {backdrops.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-2xl font-bold pl-2 border-l-4 border-red-500">
                Backdrops
              </h2>
              {backdrops.length > 10 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  {showAllImages ? 'Show Less' : `Show All (${backdrops.length})`}
                </button>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={() => scrollCarousel(backdropRef, -1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div
                ref={backdropRef}
                className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {(showAllImages ? backdrops : backdrops.slice(0, 10)).map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => openLightbox(backdrops, index, 'backdrop')}
                  >
                    <img
                      className="w-[400px] h-[225px] object-cover rounded-lg hover:ring-2 hover:ring-red-500/50 transition-all duration-200"
                      src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                      alt={`backdrop ${index}`}
                    />
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scrollCarousel(backdropRef, 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {posters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-2xl font-bold pl-2 border-l-4 border-blue-500">
                Posters
              </h2>
              {posters.length > 10 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  {showAllImages ? 'Show Less' : `Show All (${posters.length})`}
                </button>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={() => scrollCarousel(posterRef, -1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div
                ref={posterRef}
                className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {(showAllImages ? posters : posters.slice(0, 10)).map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => openLightbox(posters, index, 'poster')}
                  >
                    <img
                      className="w-[200px] h-[300px] object-cover rounded-lg hover:ring-2 hover:ring-blue-500/50 transition-all duration-200"
                      src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                      alt={`poster ${index}`}
                    />
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scrollCarousel(posterRef, 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {cast && cast.length !== 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <h1 className="text-white pl-2 border-l-4 ml-2 mt-4 mb-2 f9 border-l-blue-700 text-[30px]">Cast</h1>
            <div className="relative flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-0 z-10 bg-black/70 hover:bg-black/90 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => document.getElementById('cast-container').scrollLeft -= 300}
                iconLeft={<FiChevronLeft className="w-5 h-5" />}
              />
              <div
                id="cast-container"
                className="flex w-full overflow-x-auto scrollbar-hide py-4 gap-2 px-2"
                style={{ scrollBehavior: 'smooth' }}
              >
                {cast.slice(0, 30).map((actor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <CastCard data={actor} />
                  </motion.div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 z-10 bg-black/70 hover:bg-black/90 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => document.getElementById('cast-container').scrollLeft += 300}
                iconLeft={<FiChevronRight className="w-5 h-5" />}
              />
            </div>
          </motion.div>
        )}

        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="gg:ml-0 ml-3 mt-8 pl-3 border-l-4 border-l-yellow-400 gg:text-[25px] text-[24px] text-white"
        >
          Video Trailer | {data?.title || data?.name}
        </motion.h1>
        
        <div className="grid min-[990px]:grid-cols-3 min-[600px]:grid-cols-2 grid-cols-1">
          {ytData && ytData.map((video, index) => (
            video.type === "Trailer" && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[200px] m-2 mt-5"
              >
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                />
                <h1 className="max-[500px]:text-[14px] text-[19px] text-center text-white mt-2">{video.name}</h1>
              </motion.div>
            )
          ))}
        </div>

        {ytData?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-5 w-[97%] max-[500px]:mx-auto h-[300px] min-[540px]:w-[500px] max-[500px]:h-[250px] flex justify-center items-center bg-gray-800 rounded-lg"
          >
            <h1 className="text-gray-500 f9 text-[30px]">Video not Available!</h1>
          </motion.div>
        )}
      </div>

      <div className="bg-[#333] m-0">
        {recom && recom.length > 0 && (
          <MovieList
            data={recom}
            caption={`${data?.name ? "Series" : "Movies"} Recommendations`}
          />
        )}
        {similar && similar.results?.length > 0 && (
          <MovieList
            data={similar.results}
            caption="Similar Content"
          />
        )}
      </div>
      <div className="bg-[#222]">
        <Footer />
      </div>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <FiX className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              key={lightbox.index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${lightbox.images[lightbox.index]?.file_path}`}
              alt={`${lightbox.type} ${lightbox.index + 1}`}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Detail;