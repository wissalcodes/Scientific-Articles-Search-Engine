import React, { useState } from 'react';
import LobbyNavb from '../pagess/LobbyNavb';
//import Search from "../image/magnifyin.png";
import MesFavoris from '../mobile/MesFavoris';
import { UserProfile } from '../mobile/UserProfile';
import { profile } from '../profile/Data';
import heartIcon  from'../image/heart.svg';
import articleIcon from '../image/loupe.svg';
import profileIcon from '../image/profile.png';
import heart from '../image/Vector5.svg'; 

const UserLobbySmall = () => {
    const [favoriteArticles] = useState([
        {
          id: 1,
          title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product  Promises and safety concerns',
          date: '12/12/2023',
        },
        {
          id: 2,
          title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
          date: '01/01/2024',
        },
        {
          id: 3,
          title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
          date: '05/05/2024',
        },
        {
          id: 4,
          title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product  Promises and safety concerns',
          date: '08/08/2024',
        },
        {
          id: 5,
          title: 'ANicotinamide mononucleotide (NMN) as an anti-aging health product  Promises and safety concerns',
          date: '10/10/2024',
        },
        {
          id: 6,
          title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
          date: '12/12/2024',
        },
        {
            id: 7,
            title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
            date: '12/12/2024',
          },
          {
            id: 8,
            title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
            date: '12/12/2024',
          },
    
          {
            id: 9,
            title: 'Nicotinamide mononucleotide (NMN) as an anti-aging health product Promises and safety concerns',
            date: '12/12/2024',
          },
      ]);
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
      setActiveItem(item);
    };

    const handleUpload = () => {
      // Handle the search button click
      // ...
    };
    
  
    return (
      <div className='bg-[#E7E4D5] w-full min-h-[100vh] pt-[80px] lg:pt-[2%] flex flex-col items-center justify-center px-[30px] lg:px-[10%] '>
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
         <div className=" lg:mr-[7rem]  lg:bg-transparent bg-[#BEB9A1] ">
          <div className="flex flex-col lg:flex-row items-center h-full lg:mx-[3rem] lg:items-start w-full">
           {/* Title */}
             <div className="flex items-center w-full   lg:w-[60%]">
               <h2 className="text-black font-Merriweather text-left lg:ml-0 text-2xl lg:text-3xl mt-2 ml-4 font-bold mb-2 lg:mb-0">
                Resultat de la recherche
              </h2>
             </div>
            
             {/* List of items */}
        <div className=" flex items-center justify-end space-x-4 lg:ml-auto mr-10 lg:mr- w-full  lg:w-[40%] lg:mt-2 flex-wrap lg:flex-nowrap">
          <div className="text-black font-Lora text-base lg:text-xl whitespace-nowrap  font-semibold">Filtrer par</div>
          {[2, 3, 4, 5].map((item) => (
      <button
          key={item}
        className={`button-style font-lora text-lg lg:text-[20px] px-4 lg:px-6 py-2 lg:py-[10px] whitespace-nowrap rounded-[1.5rem] text-rgba(57, 81, 67, 0.78) bg-[#BEB9A1] border-[2px] border-[#a09c88] hover:bg-[#395143] hover:text-white transition duration-200 ease-in-out ${
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
        {/* List of articles */}
       <div className="  overflow-y-auto  px-[1rem] lg:px-[2rem] mt-[2rem] mx-[0.25rem] max-h-[50dvh] font-lora text-xl font-normal text-left lg:mt-[4rem] lg:mr-0 ">
      {favoriteArticles.map((article) => (
      <div key={article.id} className="flex items-center mb-4">
        {/* Article Icon */}
        <img src={articleIcon} alt="Article Icon" className="w-[2.5rem] h-[2.5rem] ml-[0.5em]" />

        {/* Text1 */}
        <div className="ml-4 lg:ml-[2rem]">
          <p className="text-[#000000] font-lora text-35px lg:text-xl font-normal">{article.title}</p>
          {/* ... other styles for text1 ... */}
        </div>

        {/* Text2 */}
        <p className="text-[#030303] font-lora text-35px lg:text-xl font-normal ml-auto lg:mr-[2rem]">{article.date}</p>

        {/* Heart Icon as Button */}
        <img
          src={heartIcon}
          alt="Heart Icon"
          className="w-[2.2rem] h-[2.2rem] cursor-pointer ml-4 transform transition-transform duration-200 ease-in-out hover:scale-110"
          onClick={() => handleUpload()}
        />
      </div>
      
    ))}
  </div>
      {/* Two components for large screens */}
      <div className="flex flex-row">
          {/* First Component (Profile Icon) */}
          <div className="top-20 bg-[#F5EAAB] absolute h-[15%] w-[45px] left-0 pt-2 mr-1 -translate-y-2 rounded-br-[24px] rounded-tr-[30px] lg:flex hidden">
            <button onClick={handleUpload}>
              <img className=" top-[20px] w-[40px]  transform -translate-y-1/2 pt-2 mr-2.5 transition-transform duration-200 ease-in-out hover:scale-110 " src={profileIcon} alt="Profile Icon" />
            </button>
          </div>

          {/* Second Component (Heart Icon 2) */}
          <div className="top-60 bg-[#395143] absolute h-[15%] w-[40px] left-0 pt-[2] -translate-y-6 rounded-br-[24px] rounded-tr-[30px] lg:flex hidden">
            <button onClick={handleUpload}>
              <img className="top-0 w-[30px]  transform -translate-y-1/2 pt-2 mr-2.5 mt-1/2 transition-transform duration-200 ease-in-out hover:scale-110" src={heart} alt="Heart Icon" />
            </button>
          </div>
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