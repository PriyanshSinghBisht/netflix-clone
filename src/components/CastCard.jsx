import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CastCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data?.profile_path) return null;

  const handleClick = () => {
    navigate(`/cast/${data.cast_id || data.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex flex-col m-2 cursor-pointer"
    >
      <div className="min-[700px]:w-[150px] min-[700px]:h-[180px] min-[500px]:w-[100px] min-[500px]:h-[120px] w-[90px] h-[130px] overflow-hidden rounded-xl shadow-lg">
        <img 
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.profile_path}`} 
          alt={data.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-white text-center text-[14px] min-[500px]:text-[15px] mt-2 font-bold truncate max-w-[150px]">
        {data.name}
      </h1>
      <p className="text-gray-400 text-[12px] min-[500px]:text-[13px] text-center truncate max-w-[150px]">
        {data.character}
      </p>
    </motion.div>
  );
};

export default CastCard;