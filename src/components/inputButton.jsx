import { useRef } from "react";
import { Link } from "react-router-dom";

const InputButton = ({bg}) => {

  const myref = useRef(null);
    const handlefocus = ()=>{
         myref.current.focus();
    }
  return (
    <div>
         <p className='text-white text-center gg:text-[18px] text-[15px] gg:my-0 my-5 mx-4'> Ready to watch? Enter your email to create or restart your membership.</p>
            <div className='mx-10 flex  justify-center items-center overflow-hidden my-4' onClick={handlefocus}>
            <form>  
                <div className="flex min-[600px]:flex-row flex-col min-[600px]:w-[500px] w-full">
                       
                   <Link to='/home' className="w-full"><button className='w-full self-center   min-[600px]:mt-0 mt-4 text-white bg-[#E50914] h-full py-2 px-4 rounded-[7px] text-[22px] font-semibold hover:bg-red-700'>Get Started &gt;</button></Link>
                 </div>
                 </form>
            </div>
    </div>
  )
}

export default InputButton