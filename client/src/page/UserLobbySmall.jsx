import React, { useState } from 'react';
import LobbyNavb from '../pagess/LobbyNavb';
//import Search from "../image/magnifyin.png";
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
          <div className="flex flex-col lg:flex-row items-center h-full lg:bg-transparent bg-[#BEB9A1] lg:items-start w-full">
           {/* Title */}
             <div className="flex items-center w-full   lg:w-[60%]">
               <h2 className="text-black font-Merriweather text-left lg:ml-0 text-3xl mt-2 ml-4 font-bold mb-2 lg:mb-0">
                Resultat de la recherche
              </h2>
             </div>
             {/* List of items */}
        <div className=" flex items-center justify-end space-x-4 lg:ml-auto mr-10 lg:mr-4 w-full lg:w-[40%] lg:mt-2 flex-wrap lg:flex-nowrap">
          <div className="text-black font-Lora text-base lg:text-xl whitespace-nowrap  font-semibold">Filtrer par</div>
          {[2, 3, 4, 5].map((item) => (
  <button
    key={item}
    className={`button-style font-lora text-lg lg:text-[18px] px-4 lg:px-6 py-2 lg:py-[10px] whitespace-nowrap rounded-[1.5rem] text-white bg-[rgb(114,111,95)] border-[2px] border-[#a09c88] hover:bg-[#395143] hover:text-white transition duration-200 ease-in-out ${
      activeItem === item ? 'active' : ''
    }`}
    onClick={() => handleItemClick(item)}
  >
    {item === 2 && 'Mot clé'}
    {item === 3 && 'Institution'}
    {item === 4 && 'Auteur'}
    {item === 5 && 'Période de publication'}
  </button>
))}




       </div>
      </div>  
    </div>
         <div className="sm:mb-[50px] md:pt-[20px] mt-[10px] h-full w-full flex flex-col md:hidden lg:hidden ">
          <UserProfile profile={profile} />
          <MesFavoris />
         </div>
     </div>
    
    );
  };
  
  export default UserLobbySmall;