import { motion } from 'framer-motion';
import ST from '../assets/stranger things.jpg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDetail } from "./DP";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const setDetail = useDetail();
  const navigate = useNavigate();

  const handlePlay = () => {
    setDetail.setdetail(66732, 'T');
    navigate('/T/66732');
  };

  return (
    <div className='relative select-none overflow-hidden'>
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="w-full"
      >
        <img 
          className='w-full gg:h-auto min-[500px]:h-[600px] h-[500px] max-h-[700px] object-cover' 
          src={ST} 
          alt="st" 
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
      />
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className='gg:max-w-[500px] font-bold bg-right-bt absolute min-[1150px]:pt-[250px] gg:pt-[200px] left-0 gg:top-0 bottom-0 pb-10 gg:h-full max-[960px]:w-full gg:pl-10 px-5 text-white text-[22px]'
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className='min-[960px]:text-start min-[500px]:text-center text-start ST text-[30px] min-[1050px]:text-[90px] min-[500px]:text-[50px] leading-[100%] mb-4'
        >
          STRANGER <br />THINGS
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className='flex justify-start min-[960px]:justify-start min-[500px]:justify-center mb-6'
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='hover:text-white duration-100 mr-4 flex py-1 px-6 rounded-lg bg-white text-black justify-center items-center hover:bg-[rgba(250,250,250,0.9)] max-[500px]:text-[15px]'
            onClick={handlePlay}
          >
            <FaPlay /> <span className='text-black px-2'>Play</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className='duration-100 flex justify-center items-center bg-zinc-600 hover:bg-zinc-700 rounded-lg max-[500px]:text-[15px] py-2 px-4'
          >
            <AiOutlinePlus /> My List
          </motion.button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className='max-[1050px]:text-[15px] max-w-[500px] m-auto text-mywhite text-[20px]'
        >
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;