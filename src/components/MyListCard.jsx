import { useDetail } from './DP';
import { useNavigate } from 'react-router-dom';
import { useGetContentDetails } from '../hooks/useApi';
import SkeletonLoader from '../Loader/SkeletonLoader';

const MyListCard = ({ id, cat, handleChangeList }) => {
  const { data, isLoading } = useGetContentDetails(id, cat);
  const list = JSON.parse(localStorage.getItem(`${cat === 'M' ? 'myMovieList' : 'myTvList'}`) || '[]');

  const handRemove = (event) => {
    const localList = JSON.parse(localStorage.getItem(`${cat === 'T' ? "myTvList" : "myMovieList"}`) || '[]');
    const set = new Set(localList);
    set.has(id) ? set.delete(id) : set.add(id);
    window.localStorage.setItem(`${cat === 'T' ? "myTvList" : "myMovieList"}`, JSON.stringify(Array.from(set)));
    handleChangeList();
    event.stopPropagation();
  };

  const setDetail = useDetail();
  const navigate = useNavigate();

  const handleClick = () => {
    if (data) {
      setDetail.setdetail(data.id, cat);
      navigate(`/${cat}/${data.id}`);
    }
  };

  return (
    <div className="text-white min-[500px]:m-2 m-1 shadow-myWhite" onClick={handleClick}>
      <div className="min-w-0 h-auto relative">
        <div 
          className="absolute top-1 right-1 text-[35px] p-2 bdr-white flexCenter w-[30px] h-[30px] rounded-full text-white
            hover:text-red-400 hover:backdrop-blur-sm overflow-hidden cursor-default z-10"
          onClick={handRemove}
        >
          {list.includes(id) ? <>&#8722;</> : <>&#43;</>}
        </div>
        {isLoading ? (
          <SkeletonLoader className="w-full h-full" />
        ) : (
          <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="poster" />
        )}
      </div>
      <h1 className="ml-2 mt-1 text-white">{data && cat === 'M' ? data?.title : data?.name}</h1>
    </div>
  )
}

export default MyListCard