import { useLocation, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import In from "./pages/In"
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies';
import RecentyAdded from './pages/RecentyAdded';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Detail from './pages/Detail';
import BrowseAll from './pages/BrowseAll';
import CastDetail from './pages/CastDetail';
import { DetailProvider } from './components/DP';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<PageWrapper><In /></PageWrapper>} />
        <Route path='/home' element={<PageWrapper><Home /></PageWrapper>} />
        <Route path='/tvShows' element={<PageWrapper><TvShows /></PageWrapper>} />
        <Route path='/movies' element={<PageWrapper><Movies /></PageWrapper>} />
        <Route path='/recentlyAdded' element={<PageWrapper><RecentyAdded /></PageWrapper>} />
        <Route path='/myList' element={<PageWrapper><MyList /></PageWrapper>} />
        <Route path='/browse' element={<PageWrapper><BrowseAll /></PageWrapper>} />
        <Route path='/search' element={<PageWrapper><Search /></PageWrapper>} />
        <Route path='/:cat/:id' element={<PageWrapper><Detail /></PageWrapper>} />
        <Route path='/cast/:personId' element={<PageWrapper><CastDetail /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  if (localStorage.getItem("myMovieList") === null) {
    localStorage.setItem("myMovieList", JSON.stringify([]));
    localStorage.setItem("myTvList", JSON.stringify([]));
  }

  return (
    <BrowserRouter basename='/'>
      <DetailProvider>
        <div className='w-full bg-black'>
          <div className='max-w-[2000px] mx-auto'>
            <AnimatedRoutes />
          </div>
        </div>
      </DetailProvider>
    </BrowserRouter>
  )
}

export default App;