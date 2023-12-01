import { useState, useRef, useEffect } from "react"

const ShowMore = ({h, children}) => {
    const [more, setMore] = useState(false);
    const show = useRef(null);
    const [showmore , setShowmore] = useState(false);
    const handleClick = ()=>{
        setMore(!more);
    };
    useEffect(()=>{
        const showOpt = show.current;
        const bol =  (showOpt.clientHeight<showOpt.scrollHeight);
        setShowmore(bol);
     } , []);
     
  return (
    <div>
     <div ref={show} className={`${more?`h-full`:`${h}` }  overflow-hidden`}>{children}</div>
      <div className={`w-full text-right text-blue-400 ${show?.current && (show.current.clientHeight<244?'hidden':'')}`}> <span className=" cursor-pointer select-none" onClick={handleClick}>{`${more?'show less...':'show more...'}`}</span></div>
     </div>
  )
}

export default ShowMore