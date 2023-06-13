import { useRef } from "react";

const InputButton = ({bg}) => {

  const myref = useRef(null);
    const handlefocus = ()=>{
         myref.current.focus();
    }
  return (
    <div>
         <p className='text-white text-center gg:text-[18px] text-[15px] gg:my-0 my-5 mx-4'> Ready to watch? Enter your email to create or restart your membership.</p>
            <div className='mx-10 flex  justify-center items-center overflow-hidden my-4' onClick={handlefocus}>
            <form action="/home" target="_top" method="get" >  
                <div className="flex min-[600px]:flex-row flex-col min-[600px]:w-[500px] w-full">
                   <div className='relative flex-1 min-[600px]:w-auto w-full'>
                       <input ref={myref} name="email" required className={`flex-1 ${bg} input rounded-[5px] text-[15px] bg-transparent bd-white pt-4 pb-2 pl-3 pr-10 w-full`} type="text"/>
                
                        <label className={`label text-[rgba(250,250,250,0.8)] select-none absolute top-[20%] left-[20px]`}htmlFor="Email address">Email address</label>
                    </div>
                    <button className='w-fit self-center   min-[600px]:mt-0 mt-4 text-white bg-[#E50914] h-full py-2 px-4 mx-2 rounded-[7px] text-[22px] font-semibold hover:bg-red-700'>Get Started &gt;</button>
                 </div>
                 </form>
            </div>
    </div>
  )
}

export default InputButton