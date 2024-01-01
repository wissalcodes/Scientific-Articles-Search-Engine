import React, { useState } from 'react';
import LobbyNavb from '../pagess/LobbyNavb';
import Search from "../image/magnifyin.png";
import MesFavoris from '../mobile/MesFavoris';
import { UserProfile } from '../mobile/UserProfile';
import { profile } from '../profile/Data';


const UserLobbySmall = () => {
    const [activeItem, setActiveItem] = useState(null);
  
    const handleItemClick = (item) => {
      setActiveItem(item);
    };
  
    const handleUpload = () => {
      // Handle the search button click
      // ...
    };
  
    return (
      <div className='bg-[#E7E4D5] w-screen h-screen pt-[100px] lg:pt-[2%] flex flex-col items-center justify-center px-[30px] lg:px-[10%] '>
        {/* Navbar */}
        <LobbyNavb />
        <div id="main-container" className="w-full h-full flex flex-col">
          {/* Rechercher input field */}
          <div className="w-full flex flex-col lg:flex-row h-[50px] justify-center items-center my-[40px] ">
            <div className="pl-[20px] drop-shadow flex w-full h-full lg:mr-[15px] bg-[#56695C] lg:bg-[#BEB9A1B2] rounded-[10px]">
              <input
                placeholder='chercher un article '
                type='text'
                className="text-[#E7E4D5] lg:py-6 py-[20px] pl-[15px] text-[20px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent "
              />
            </div>
            {/* Rechercher button*/}
            <div className="flex justify-end lg:justify-center w-full lg:w-[30%] ">
              <div className="lg:mt-0 mt-[10px] transform h-full transition-transform duration-200 ease-in-out hover:scale-110 w-[40%] lg:w-[90%] drop-shadow flex bg-gradient-to-r from-[#395143] to-[#AF9A27] px-[10px] lg:px-[20px] rounded-[10px] lg:inline-block hidden">
                <button
                  onClick={handleUpload}
                  className="text-[18px] lg:py-[10px] flex flex-col justify-center items-center lg:text-[20px] xl:text-[24px] mx-auto font-lora text-[#E7E4D5] bg-transparent px-[10px]"
                >
                  Rechercher
                </button>
              </div>
            </div>
          </div>
           {/* Resultat de la recherche title and items */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%,60%] items-center justify-center w-full h-full">
          {/* Title */}
          <div className="pl-[30px] py-[55px]">
            <h3 className="text-[40px] font-merriweather text-[#000]">Resultat de la recherche</h3>
          </div>
          {/* List of items */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => handleItemClick('motcle')}
              className={`mx-[10px] text-[18px] font-lora text-${activeItem === 'motcle' ? '#395143' : '#BEB9A1'} border-2 border-${activeItem === 'motcle' ? '#395143' : 'rgba(57, 81, 67, 0.47)'} px-[15px] h-[40px]`}
            >
              1- Filtrer par espace
            </button>
            {/* Add similar buttons for other items */}
          </div>
        </div>
          
          <div className="w-full h-full flex items-center justify-center pt-[5px] lg:hidden  ">
            <div className="w-[90%] md:w-[80%] lg:w-[85%] h-[262px] md:h-[40vh] lg:h-[40vh] bg-[#BEB9A1] my-[5%] mx-[5%] md:mx-[10%] lg:mx-0 flex items-center justify-center rounded-[10%] mt[100px]">
              <img src={Search} alt="Search" className="w-[104px] h-[104px]" />
            </div>
          </div>
        </div>
        <div className="sm:mb-[50px] md:pt-[20px] mt-[10px] h-full w-full flex flex-col lg:hidden ">
          <UserProfile profile={profile} />
          <MesFavoris />
        </div>
      </div>
    );
  };
  
  export default UserLobbySmall;