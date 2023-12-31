import React from 'react';

import LobbyNavb from '../pagess/LobbyNavb';
import Search from "../image/magnifyin.png";
import MesFavoris from '../mobile/MesFavoris';
import { UserProfile } from '../mobile/UserProfile';
import { profile } from '../profile/Data';

const UserLobbySmall = () => {
    return ( 
    <div className='bg-[#E7E4D5] bg-none w-screen min-h-[100dvh]  pb-[40%] md:pb-[10%] flex flex-col items-center justify-center px-[30px] lg:px-[10%] '>
        {/* Navbar */}
        <LobbyNavb/>
     <div id="main-container" className="w-full h-full flex flex-col pb-[1%]   ">
        <div className="w-full flex flex-col lg:flex-row h-[50px] justify-center items-center my-[40px] ">
            <div className=" drop-shadow flex w-full h-full lg:mr-[15px] bg-[#56695C]  rounded-[10px]">
            <input
              placeholder='chercher un article '
              type='text'
              className="text-[#E7E4D5] lg:py-6 py-[20px] pl-[15px] text-[20px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent "
            />
             </div>
        </div>
          <div className="  w-full h-full flex items-center justify-center pt-[5px]  ">
            <div className="w-[90%] md:w-[80%] lg:w-[85%] h-[262px] md:h-[40vh] lg:h-[40vh] bg-[#BEB9A1] my-[5%] mx-[5%] md:mx-[10%] lg:mx-0 flex items-center justify-center rounded-[10%] mt[100px]">
           <img src={Search} alt="Search" className="w-[104px] h-[104px]" />
           </div>

        </div>
      </div>
       <div className="sm:mb-[50px] md:pt-[20px] mt-[10px] h-full w-full flex flex-col ">
         < UserProfile   profile={profile}/>
          <MesFavoris />

        </div>
    </div>
     
     );
}
 
export default UserLobbySmall;

