import CardGrid from "./CardGrid";
import { useState } from "react";
import {GrClose} from 'react-icons/gr';

const GridList = ({caption, Data , cat}) => {
console.log(Data);
  return (
    <div className=" overflows-scroll h-200px pb-[300px]">
        <h2 className='ml-5 gg:text-[40px] min-[500px]:text-[35px] text-[30px] font-black text-white'>{caption}</h2>
        <div className="grid mt-0 min-[600px]:mx-5 mx-2  min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 grid-cols-3 ">
                 {
                    Data &&
                     Data.map((data, index )=>{{
                        return(
                         <>
                          { data.poster_path && data.backdrop_path &&
                               <div key={index}><CardGrid data={data} cat={cat} /></div>
                          }
                        </>
                        )
                    }})
                 }
             </div>
    </div>
  )
}

export default GridList