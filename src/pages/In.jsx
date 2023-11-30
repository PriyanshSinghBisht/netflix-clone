import React from 'react'
import  background from '../assets/netflix-bg.jpg'
import netflix from '../assets/netflix.png';
import InputButton from '../components/inputButton';
import Tv2 from '../assets/netflix-tv2.png';
import Kids from '../assets/netflix-kids.png';
import HorazointalRow from '../components/HorazointalRow';
import milli from '../assets/netflix-milli.jpg';
import Tv2__image from '../assets/Tv2-image.jpg';
import FAQ from '../components/FAQ';
import { faqObj } from '../components/Rawdata';
import LangOpc from '../components/LangOpc';
import Footer from '../components/Footer';

const In = () => {
     const Tv1 = 'https://netflix-images.manikantp.repl.co/Netflix1.gif';
     
  return (
    <div>
          <div className='gg:h-[570px] h-[570px] overflow-hidden relative border-red-900 bg-gradient-circle'>
               <img src={background} alt="background-img" className=" w-[100%] h-[100%] object-cover scale-[130%] absolute top-[-10%] opacity-30" />
               <div className='absolute w-full h-full'>
                   <div className='min-[1170px]:mx-40 my-3 mx-5 flex justify-center items-center'>
                        <div className='flex-1'><img className="gg:h-[45px] h-[30px]"  src={netflix} alt="netflix" /></div>
                         <LangOpc />
                       <button className='text-white bg-[#E50914] h-fit text-[12px] px-3 py-1 rounded-sm font-semibold mx-4 hover:bg-red-700'>Sign in</button>
                   </div>
                       <div className='mt-[150px] text-white mx-5 '>
                        <h2 className='text-white gg:text-[40px] text-[35px] text-center font-bold gg:leading-[50px] leading-[40px]'>Unlimited movies, TV shows and more</h2>
                        <h1 className='text-center gg:text-[22px] text-[19px] my-3'>Watch anywhere. Cancel anytime.</h1>
                         < InputButton bg={'backdrop-blur-sm'}/>      
                     </div>
               </div>
          </div>
             < HorazointalRow />

             <div className='bg-black w-full gg:pt-5 pt-20 pb-10 min-[1280px]:pl-[150px] pl-10 min-[1280px]:pr-[50px] pr-10'>
               <div className=' min-h-[500px] flex justify-center items-center min-[980px]:flex-row flex-col'>
                    <div className=' flex-1 min-[500px]:max-h-auto max-h-[150px] '>
                         <h2 className='gg:text-start text-center gg:text-[40px] text-[35px] text-white font-bold'>Enjoy on your TV</h2>
                         <h1 className='gg:text-start text-center gg:text-[22px] text-[19px] gg:my-3 my-0 text-white'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h1>
                    </div>
                    <div className='min-[980px]:w-1/2 w-full'>
                         <img className="w-full h-full object-fill" src={Tv1} alt="" />
                    </div>
               </div>
              </div>

              <HorazointalRow/>
             
             
              <div className='bg-black w-full gg:pt-5 pt-20 pb-10 min-[1280px]:px-[150px] px-10'>
               <div className='min-h-[500px] flex gg:flex-row-reverse flex-col justify-center items-center'>
                    <div className='flex-1'> 
                         <h2 className='gg:text-start text-center gg:text-[40px] text-[35px] text-white font-bold'>Download your shows to watch offline</h2>
                         <h1 className='gg:text-start text-center gg:text-[22px] text-[19px] my-3 text-white'>Save your favourites easily and always have something to watch.</h1>
                    </div>
                    <div className='gg:w-1/2 w-full'>
                         <img className="w-full h-full object-fill" src={milli} alt="" />
                    </div>
               </div>
              </div>

              <HorazointalRow/>
 
              <div className='bg-black w-full gg:pt-5 pt-20 pb-10 min-[1280px]:px-[150px] px-10'>
               <div className='min-h-[500px] flex gg:flex-row flex-col justify-center items-center'>
                    <div className='flex-1'>
                         <h2 className='text-center gg:text-start gg:text-[40px] text-[35px] text-white font-bold'>Watch everywhere</h2>
                         <h1 className='gg:text-start text-center gg:text-[22px] text-[19px] my-3 text-white'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h1>
                    </div>
                    <div className='gg:w-1/2 w-[90%] m-auto relative'>
                         <img className="w-full h-full object-fill z-10" src={Tv2} alt="tv2" />
                         <img className='w-[60%]  absolute top-7 left-[18%] z-1' src={Tv2__image} alt="tv2-image" />
                    </div>
               </div>
              </div>
              
              <HorazointalRow/>

              <div className='bg-black w-full gg:pt-5 pt-20 pb-10 min-[1280px]px-[150px] px-10'>
               <div className='min-h-[500px] flex justify-center items-center gg:flex-row-reverse flex-col'>
                    <div className=' flex-1'> 
                         <h2 className='text-center gg:text-start gg:text-[40px] text-[35px] text-white font-bold'>Create profiles for kids</h2>
                         <h1 className='gg:text-start text-center gg:text-[22px] text-[19px] my-3 text-white'>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h1>
                    </div>
                    <div className='gg:w-1/2 w-[90%] m-auto '>    
                         <img className="w-[full] h-full object-fill" src={Kids} alt="" />
                    </div>
               </div>
              </div>

         <div className='bg-black'>
              <HorazointalRow/>
              <div className='bg-black w-full pt-5 pb-5 min-[1280px]:px-[150px] px-5'>
                       <h2 className=' text-center gg:text-[40px] text-[35px] text-white font-bold my-5'>Frequently Asked Questions</h2>
                      <div>
                          {faqObj.map((obj)=>{
                              return(
                              < FAQ key={obj.id} heading={obj.heading} content={obj.Content} />    
                          )})}   
                      </div>
                  </div>


               <InputButton bg={'bg-[rgba(150,0,0,0.1)] text-white' }/>
                <div className='pt-8'> 
               <HorazointalRow />fa
                </div>
               <Footer/>
          </div>
    </div>
  )
}

export default In