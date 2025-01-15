import React from 'react';
import logo from '@/app/assets/images/internationalterms/premierleauge/premierleaugelogo.png'
const MatchweekCard = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#FFFFFF] to-[#79CFFF] rounded-lg flex flex-col gap-1 items-center overflow-hidden">
      <div className="w-full flex  gap-4 bg-purple-800 p-2 text-white items-center">
        <div className='w-8 h-8 '>
        <img src={logo.src} alt="Logo"  className='w-full h-full'/>
        </div>
        <h2>Matchweek</h2>
      </div>
      <p className="time p-3">All times shown are post local time</p>
      <div className="date">
        <h3>Saturday 10 October</h3>
      </div>
      <div className=" flex justify-between px-12 gap-6">
        <div className="team">AVL</div>
        <div className="score">0-2</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>
      <div className=" flex justify-between px-12 gap-6">
        <div className="team">CHE</div>
        <div className="score">0-2</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">CHE</div>
        <div className="score">7-0</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">CHE</div>
        <div className="score">0-2</div>
        <div className="team">AVL</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">AVL</div>
        <div className="score">0-2</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">AVL</div>
        <div className="score">0-2</div>
        <div className="team">AVL</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">CHE</div>
        <div className="score">0-2</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">CHE</div>
        <div className="score">0-3</div>
        <div className="team">AV</div> 
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className=" flex justify-between px-12 gap-6">
        <div className="team">AVL</div>
        <div className="score">1-1</div>
        <div className="team">CHE</div>
      </div>
      <hr className='w-full h-[2px] bg-gray-400 p-0'/>

      <div className="footer">
        <p>All matches are subject to change</p>
      </div>
    </div>
  );
};

export default MatchweekCard;