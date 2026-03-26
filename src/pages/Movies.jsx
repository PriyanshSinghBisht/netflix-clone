import Navbar from "../components/Navbar";
import GridList from "../components/GridList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { usePopularMovies } from "../hooks/useApi";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const { data, isLoading } = usePopularMovies(page);

  return (
    <div className=" pt-[100px] bg-zinc-900 min-h-[100vh]">
      <Navbar/>
      <div>
        <GridList caption='Movies List' Data={data?.results || []} cat='movies' />   
      </div>
      <Pagination totalPages={Math.min(data?.total_pages || 1, 500)} />
    </div>
  )
}

export default Movies