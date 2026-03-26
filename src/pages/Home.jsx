import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';
import { useTrending, usePopularMovies, useDiscover } from '../hooks/useApi';

const Home = () => {
  const { data: forYouData } = useTrending('tv', 'airing_today');
  const { data: popularData } = usePopularMovies(1);
  const { data: trendingData } = useDiscover('movie', { sortBy: 'vote_average.desc', page: 1 });
  const { data: tvData } = useDiscover('tv', { sortBy: 'popularity.desc', page: 1 });
  const { data: newReleaseData } = useDiscover('movie', { sortBy: 'release_date.desc', page: 1 });
  const { data: upcomingData } = useDiscover('movie', { sortBy: 'popularity.desc', page: 1 });

  return (
    <div className='flex flex-col bg-zinc-900'>
      <Navbar />
      <Hero />
      <MovieList data={forYouData?.results || []} caption={"Top Picks For You"} />
      <MovieList data={popularData?.results || []} caption={"Popular on Netflix"} />
      <MovieList data={trendingData?.results || []} caption={"Trending Now"} />
      <MovieList data={tvData?.results || []} caption={"TV Shows"} />
      <MovieList data={popularData?.results || []} caption={"Movies"} />
      <MovieList data={newReleaseData?.results || []} caption={"New Released"} />
      <MovieList data={upcomingData?.results || []} caption={"Upcoming Movies"} />
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default Home