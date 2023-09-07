import React from 'react'

const CastCard = (data) => {
  if(data.data.profile_path)
  return (
    <div className='flex flex-col m-2'>
          <div className='min-[700px]:w-[150px]  min-[700px]:h-[180px] min-[500px]:w-[100px] min-[500px]:h-[120px] w-[90px] h-[130px]  overflow-hidden rounded-xl'>
            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.data.profile_path}`} alt="actor" 
               className='w-full h-full object-fill'
            />
            </div>
            <h1 className='text-white text-center text-[14px] min-[500px]:text-[15px]  mt-2 font-bold'>{data.data.name}</h1>
            <p className='text-mywhite  text-[12px] min-[500px]:text-[13px] text-center'>{data.data.character}</p>
    </div>
  )
}

export default CastCard