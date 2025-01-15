import React from 'react'
import verticleimg from '@/app/assets/images/internationalterms/premierleauge/verticleimg.png'
const Matchweek3 = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg flex flex-col gap-1 items-center overflow-hidden mt-5 sm:mt-0">
    <div className="w-full flex  gap-4 bg-purple-800 p-4 text-white items-center">
   <h2>Featured player</h2>
 </div>

 <div className='w-full h-[500px] flex'>
  <div className='w-[60%] h-full '>
    <img src={verticleimg.src} alt="" className='h-full w-full object-cover object-center'/>
  </div>
  <div className='w-1/3 h-full flex flex-col justify-between items-center py-12'>
    <div className='text-center'>
    <h1 className='text-sm'>Inceptos</h1>
    <p className='text-4xl'>23</p>
    </div>
    <div className='text-center'>
    <h1 className='text-sm'>Inceptos</h1>
    <p className='text-4xl'>23</p>
    </div>
    <div className='text-center'>
    <h1 className='text-sm'>Inceptos</h1>
    <p className='text-4xl'>23</p>
    </div>
    <div className='text-center'  >
    <h1 className='text-sm'>Inceptos</h1>
    <p className='text-4xl'>23</p>
    </div>
   
  </div>
 </div>
</div>
  )
}

export default Matchweek3