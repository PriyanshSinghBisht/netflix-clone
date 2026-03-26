import SkeletonLoader from './SkeletonLoader';

const Loader = () => {
  return (
    <div className='w-full py-20 flex justify-center'>
      <div className='flex gap-4 flex-wrap justify-center max-w-4xl'>
        <div className='flex flex-col gap-2'>
          <SkeletonLoader className='w-[300px] h-[180px] rounded-lg' />
          <SkeletonLoader className='w-[300px] h-4 rounded' />
          <SkeletonLoader className='w-[250px] h-3 rounded' />
        </div>
        <div className='flex flex-col gap-2'>
          <SkeletonLoader className='w-[300px] h-[180px] rounded-lg' />
          <SkeletonLoader className='w-[300px] h-4 rounded' />
          <SkeletonLoader className='w-[250px] h-3 rounded' />
        </div>
        <div className='flex flex-col gap-2'>
          <SkeletonLoader className='w-[300px] h-[180px] rounded-lg' />
          <SkeletonLoader className='w-[300px] h-4 rounded' />
          <SkeletonLoader className='w-[250px] h-3 rounded' />
        </div>
      </div>
    </div>
  );
};

export default Loader;