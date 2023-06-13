import { useState } from "react";
import {motion } from 'framer-motion';

const FAQ = ({heading, content}) => {
     const [toogle,setToogle] = useState(false);
          const handleClick = ()=>{
           setToogle(!toogle);
     };
  return (
   
              <div className=' bg-zinc-800 m-2' onClick={handleClick}>
                   <div className='select-none  outline-black flex justify-center items-center hover:bg-zinc-700'>
                        <h1 className=' flex-1 px-5 text-start gg:text-[22px] text-[19px] my-0 text-white cursor-pointer '> {heading} </h1>
                            <motion.span animate={{rotate: toogle? 45: 0}} transition={{type:"Inertia", duration:0.2 }} className={`text-white text-[50px] mr-4 font-thin`}> &#43;</motion.span> 
                   </div>
                    <motion.div animate={{height: toogle?'auto':0}} transition={{type:"spring", duration:0.1 }} className={`overflow-hidden duration-75`}>
                          { 
                            content.map((para)=>{
                                return(
                                    <h1 className=' flex-1 p-4 text-start gg:text-[20px] text-[18px] my-1 text-white'> {para}</h1>
                                )})
                          }
                    </motion.div>
               </div>
  )
}

export default FAQ