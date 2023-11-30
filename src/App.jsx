import './App.css';
import In from "./pages/In"
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies';
import RecentyAdded from './pages/RecentyAdded';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Detail from './pages/Detail';
import {Route ,HashRouter, Routes} from 'react-router-dom';
import { DetailProvider } from './components/DP';


const App = () =>{
     if(localStorage.getItem("myMovieList")===null){ 
        localStorage.setItem("myMovieList",JSON.stringify([]));
        localStorage.setItem("myTvList",JSON.stringify([]));
     }
    //  localStorage.clear();
  
  return (
    <HashRouter basename='/'>
      <DetailProvider>

      <div className='w-full bg-black'>
     <div className='max-w-[1550px] m-auto'>
          <Routes>
              <Route path='/' element={<In />} />
              <Route path='/home' element={<Home />} />
              <Route path='/tvShows' element={<TvShows />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/recentlyAdded' element={<RecentyAdded />} />
              <Route path='/myList' element={<MyList />} />
              <Route path='/search' element={<Search  />} />
              <Route path='/:id' element={< Detail  />} />
          </Routes>
    </div>
    </div>
      </DetailProvider>
    </HashRouter>
  )
}

export default App