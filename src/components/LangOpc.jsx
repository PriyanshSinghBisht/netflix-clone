import {VscGlobe} from 'react-icons/vsc';

const LangOpc = () => {
  return (
    <div className='w-fit rounded-sm py-1 px-2 border-2 border-white flex justify-center items-center text-white'>
           <VscGlobe/>
         <select name="langgusge" id="lang" className=' bg-transparent text-white bd-white h-fit outline-none border-none'>
                             <option value="english">English</option>
                             <option value="hindi">Hindi</option>
            </select>
    </div>
  )
}

export default LangOpc