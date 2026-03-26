import Navbar from "../components/Navbar"
import GridList from "../components/GridList"
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { usePopularTvShows } from "../hooks/useApi";

const TvShows = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data } = usePopularTvShows(page);

  return (
    <div className=" pt-[100px] bg-zinc-900 ">
      <Navbar/>
      <div>
        <GridList caption='Tv Shows List' Data={data?.results || []} cat='tvShows'  />  
      </div>
      <Pagination totalPages={Math.min(data?.total_pages || 1, 500)} />
    </div>
  )
}

export default TvShows