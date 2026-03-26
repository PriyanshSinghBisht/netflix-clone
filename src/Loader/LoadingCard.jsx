import SkeletonLoader from '../Loader/SkeletonLoader';

const LoadingCard = () => {
  return (
    <div >
           <div  className=' group relative m-2 image-z ease-out duration-150
                     gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px]  w-[120px]
                   '>
                    <div className='w-full h-full absolute top-0 left-0 group-hover:bg-[rgba(0,0,0,0.2)]' />
                    <div className='gg:h-[180px] min-[700px]:h-[250px] gg:w-[300px] min-[700px]:w-[200px] min-[500px]:w-[150px] min-[500px]:h-[200px] w-[120px] h-[150px]'>
                      <SkeletonLoader className='w-full h-full rounded' />
                    </div>
                    <div className='absolute bottom-0 left-0  w-full'>
                      <SkeletonLoader className='h-4 m-2 rounded' />
                      <SkeletonLoader className='h-3 my-2 ml-2 mr-8 rounded' />
                   </div>
             </div>
    </div>
  )
}

export default LoadingCard