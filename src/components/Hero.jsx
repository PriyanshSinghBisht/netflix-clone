import ST from '../assets/stranger things.jpg';
import {FaPlay} from 'react-icons/fa';
import {AiOutlinePlus} from 'react-icons/ai';

const Hero = () => {
  return (
    <div className='relative select-none '>
          <img  className='w-full gg:h-auto h-[700px] object-cover' src={ST} alt="st" />
          <div className='gg:max-w-[500px] font-bold bg-right-bt absolute min-[1150px]:pt-[250px] gg:pt-[200px] left-0 gg:top-0 bottom-0 pb-10 gg:h-full max-[960px]:w-full gg:pl-10 px-10 text-white text-[22px]'>
              <h2 className='max-[960px]:text-center ST text-[50px] min-[1050px]:text-[90px] leading-[100%] mb-4'>STRANGER <br />THINGS</h2>
                <div className='flex max-[960px]:justify-center mb-6 '>
                  <button className='hover:scale-125 duration-100 mr-4 flex py-1 px-6 rounded-lg  bg-whtie text-black justify-center items-center bg-white hover:bg-[rgba(250,250,250,0.9)]'> <FaPlay/> <span className='text-black px-2'>Play</span> </button>
                  <button className='hover:scale-125 duration-100 flex justify-center items-center bg-zinc-600 hover:bg-zinc-700 rounded-lg py-2 px-4'> <AiOutlinePlus/> My List </button>
                </div>
                  <h2 className='max-[1050px]:text-[18px] max-w-[500px] m-auto text-mywhite text-[20px]'>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl. </h2>
            </div>          
    </div>
  )
}

export default Hero