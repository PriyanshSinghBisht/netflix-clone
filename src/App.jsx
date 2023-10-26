import './App.css';
import In from "./components/In"
import Home from './components/Home';
import TvShows from './components/TvShows';
import Movies from './components/Movies';
import RecentyAdded from './components/RecentyAdded';
import MyList from './components/MyList';
import Search from './components/Search';
import Detail from './components/Detail';
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