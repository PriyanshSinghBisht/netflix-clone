import './App.css';
import In from "./components/In"
import Home from './components/Home';
import TvShows from './components/TvShows';
import Movies from './components/Movies';
import RecentyAdded from './components/RecentyAdded';
import MyList from './components/MyList';
import Search from './components/Search';
import {Route, BrowserRouter , Routes} from 'react-router-dom';

const App = () =>{
    
  return (
    <BrowserRouter basename='/netflix-clone'>
     <div >
          <Routes>
              <Route path='/' element={<In />} />
              <Route path='/home' element={<Home />} />
              <Route path='/tvShows' element={<TvShows />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/recentlyAdded' element={<RecentyAdded />} />
              <Route path='/myList' element={<MyList />} />
              <Route path='/search' element={<Search  />} />
          </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App