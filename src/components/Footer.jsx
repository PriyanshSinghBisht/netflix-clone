import LangOpc from "./LangOpc"

const Footer = () => {
  return (
    <div className='flex flex-col text-mywhite min-[1280px]:m-auto mx-10 max-w-[1200px] pb-10 '>

                    <h1 className=' text-[12px] my-10'>Questions? Call <a>000-800-919-1694</a></h1>        
                    <div className='flex flex-row gg:justify-between'>
                    <div className='flex min-[600px]:flex-row flex-col justify-around flex-1'>
                         <div className='flex flex-col'>
                              <a className="my-2 link text-[15px]" href="#">FAQ</a>
                              <a className="my-2 link text-[15px]" href="#">Investor Relations</a>
                              <a className="my-2 link text-[15px]" href="#">Privacy</a>
                              <a className="my-2 link text-[15px]" href="#">Speed Test</a>
                         </div>
                         <div  className='flex flex-col'>
                              <a className="my-2 link text-[15px]" href="#">Help Centre</a>
                              <a className="my-2 link text-[15px]" href="#">JObs</a>
                              <a className="my-2 link text-[15px]" href="#">Cookie Preferences</a>
                              <a className="my-2 link text-[15px]" href="#">Legal Notices</a>
                         </div>
                    </div>
                    <div className='flex min-[600px]:flex-row flex-col justify-around flex-1'>
                         <div  className='flex flex-col'>
                              <a className="my-2 link text-[15px]" href="#">Account</a>
                              <a className="my-2 link text-[15px]" href="#">Ways to Watch</a>
                              <a className="my-2 link text-[15px]" href="#">Corporate Information</a>
                              <a className="my-2 link text-[15px]" href="#">Only on Netflix</a>
                         </div>
                         <div  className='flex flex-col'>
                              <a className="my-2 link text-[15px]" href="#">Media Centre</a>
                              <a className="my-2 link text-[15px]" href="#">Terms of Use</a>
                              <a className="my-2 link text-[15px]" href="#">Contact Us</a>
                         </div>
                    </div>
                    </div>
                    <div className='my-5'><LangOpc /></div>
                    <h1>Netflix India   </h1>
           </div>
  )
}

export default Footer