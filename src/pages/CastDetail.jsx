import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkeletonLoader from "../Loader/SkeletonLoader";
import { usePersonDetails, usePersonMovieCredits, usePersonTvCredits } from "../hooks/useApi";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CastDetail = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: person, isLoading } = usePersonDetails(personId);
  const { data: movieCredits } = usePersonMovieCredits(personId);
  const { data: tvCredits } = usePersonTvCredits(personId);

  const knownFor = movieCredits?.cast?.slice(0, 10) || [];
  const tvShows = tvCredits?.cast?.slice(0, 10) || [];

  const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birth = new Date(birthday);
    const end = deathday ? new Date(deathday) : new Date();
    let age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="bg-[#333] min-h-screen">
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
      className="bg-[#333] min-h-screen"
    >
      <Navbar />
      
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-50 bg-black/70 backdrop-blur-sm p-3 rounded-full text-white hover:bg-red-600 transition-colors"
      >
        <AiOutlineArrowLeft size={24} />
      </motion.button>

      <div className="pt-24 pb-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full sm:w-[250px] lg:w-[300px] rounded-lg overflow-hidden shadow-2xl bg-gray-800"
              >
                {!imageLoaded && (
                  <SkeletonLoader className="w-full h-[350px] sm:h-[400px]" />
                )}
                {person?.profile_path ? (
                  <img
                    className={`w-full h-auto ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    src={`https://image.tmdb.org/t/p/w342/${person.profile_path}`}
                    alt={person.name}
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="w-full h-[350px] sm:h-[400px] bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-6xl sm:text-7xl font-bold">
                      {person?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 sm:mt-6 bg-gray-800 p-4 sm:p-5 rounded-lg"
              >
                <h3 className="text-white text-lg font-bold mb-4 border-b border-gray-600 pb-2">Personal Info</h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  {person?.known_for_department && (
                    <div>
                      <span className="font-bold text-white block">Known for</span>
                      {person.known_for_department}
                    </div>
                  )}
                  
                  {person?.birthday && (
                    <div>
                      <span className="font-bold text-white block">Born</span>
                      {new Date(person.birthday).toLocaleDateString('en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                      {person.place_of_birth && (
                        <span className="text-gray-400"> in {person.place_of_birth}</span>
                      )}
                    </div>
                  )}
                  
                  {person?.birthday && (
                    <div>
                      <span className="font-bold text-white block">Age</span>
                      {calculateAge(person.birthday, person.deathday)}
                      {person.deathday && <span className="text-red-400"> (Deceased)</span>}
                    </div>
                  )}
                  
                  {person?.deathday && (
                    <div>
                      <span className="font-bold text-white block">Died</span>
                      {new Date(person.deathday).toLocaleDateString('en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                  )}

                  {person?.place_of_birth && (
                    <div>
                      <span className="font-bold text-white block">Place of Birth</span>
                      {person.place_of_birth}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl lg:text-5xl font-bold text-white mb-2"
              >
                {person?.name}
              </motion.h1>

              {person?.biography && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>
                  <div className="text-gray-300 leading-relaxed space-y-4 text-sm lg:text-base">
                    {person.biography.split('\n\n').slice(0, 5).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {knownFor.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10"
                >
                  <h2 className="text-2xl font-bold text-white mb-5 pl-3 border-l-4 border-red-600">
                    Known For (Movies)
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {knownFor.map((movie, index) => (
                      <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex-shrink-0 w-[140px] lg:w-[160px] cursor-pointer"
                        onClick={() => navigate(`/M/${movie.id}`)}
                      >
                        <div className="relative group overflow-hidden rounded-lg">
                          <img
                            className="w-full h-[200px] lg:h-[240px] object-cover transition-transform duration-300 group-hover:scale-110"
                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                            alt={movie.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-white text-sm font-bold truncate">{movie.title}</p>
                              <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tvShows.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10"
                >
                  <h2 className="text-2xl font-bold text-white mb-5 pl-3 border-l-4 border-blue-600">
                    Known For (TV Shows)
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {tvShows.map((show, index) => (
                      <motion.div
                        key={show.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="flex-shrink-0 w-[140px] lg:w-[160px] cursor-pointer"
                        onClick={() => navigate(`/T/${show.id}`)}
                      >
                        <div className="relative group overflow-hidden rounded-lg">
                          <img
                            className="w-full h-[200px] lg:h-[240px] object-cover transition-transform duration-300 group-hover:scale-110"
                            src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                            alt={show.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-white text-sm font-bold truncate">{show.name}</p>
                              <p className="text-gray-400 text-xs">{show.first_air_date?.split('-')[0]}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {movieCredits?.crew && movieCredits.crew.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-10"
                >
                  <h2 className="text-2xl font-bold text-white mb-5 pl-3 border-l-4 border-yellow-600">
                    Also Worked As (Crew)
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {movieCredits.crew.slice(0, 16).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * index }}
                        className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => navigate(`/M/${item.id}`)}
                      >
                        <p className="text-white font-bold text-sm truncate">{item.title}</p>
                        <p className="text-gray-400 text-xs">{item.job}</p>
                        <p className="text-gray-500 text-xs">{item.release_date?.split('-')[0]}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#222]">
        <Footer />
      </div>
    </motion.div>
  );
};

export default CastDetail;