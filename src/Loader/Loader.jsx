import { RiLoader4Fill } from "react-icons/ri";

const Loader = () => {
  return (
    <div className='w-full flexCenter py-20'>
        <RiLoader4Fill className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] text-white/30
        animate-rotate" />
    </div>
  )
}

export default Loader