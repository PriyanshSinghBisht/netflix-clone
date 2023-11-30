import ribben from '../assets/red ribben.png';

const LoadingCard = () => {
  return (
    <div >
           <div  className=' group relative m-2 image-z ease-out duration-150
                      gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px]  w-[120px]
                    '>
                         <div className='w-full h-full absolute top-0 left-0 group-hover:bg-[rgba(0,0,0,0.2)]' />
                         <div className='gg:h-[180px] min-[700px]:h-[250px] gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] min-[500px]:h-[200px] w-[120px] h-[150px]'>
                           <div className='w-full h-full loading text-white'></div>
                         </div>
                         <div className='absolute bottom-0 left-0  w-full'>
                                 <div className=' h-4 m-2  bg-gray-400'/>
                              <div className=' h-3 my-2 ml-2 mr-8 bg-gray-400'/>
                           </div>
                           
                        <div className=' absolute top-0 left-0 w-[45px] h-[50px]'>
                             <div className='w-full h-full relative left-[-10px] top-[-12px]'>
                                <img src={ribben} alt="ribben" className='w-full h-full' />
                                <h1 className='absolute top-4 left-2 f9 text-[11px] text-white'> ...</h1>
                             </div>
                        </div>
                 </div>
    </div>
  )
}

export default LoadingCard