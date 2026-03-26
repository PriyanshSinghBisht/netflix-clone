import Navbar from "../components/Navbar"
import GridList from "../components/GridList"
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useTrending } from "../hooks/useApi";

const RecentyAdded = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data } = useTrending('all', 'week', page);

  return (
    <div className=" pt-[100px] bg-zinc-900 ">
      <Navbar/>
      <div>
        <GridList caption='Recently Added' Data={data?.results || []} cat='trending'  />   
      </div>
      <Pagination totalPages={Math.min(data?.total_pages || 1, 500)} />
    </div>
  )
}

export default RecentyAdded