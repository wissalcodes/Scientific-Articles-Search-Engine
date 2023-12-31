import React, { useState } from 'react';
import ArrowDown from '../image/Vector.png'; // Replace with the actual path
import articleIcon from '../image/Rectangle 34624112.svg';
import deleteIcon from '../image/bin3.png';

const MesFavoris  = () => {
    const [favoriteArticles, setFavoriteArticles] = useState([
        {
          id: 1,
          title: 'Nicotinamide mononucleotide (NMN) ',
          date: '12/12/2023',
        },
        {
          id: 2,
          title: 'Nicotinamide mononucleotide (NMN) ',
          date: '01/01/2024',
        },
        {
          id: 3,
          title: 'Nicotinamide mononucleotide (NMN) ',
          date: '05/05/2024',
        },
        {
            id: 4,
            title: 'Nicotinamide mononucleotide (NMN) ',
            date: '05/05/2024',
          },
          {
            id: 5,
            title: 'Nicotinamide mononucleotide (NMN) ',
            date: '05/05/2024',
          },
      ]);

  const [showCard, setShowCard] = useState(false);

  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };
  // Function to handle deleting an article
  const handleDeleteArticle = (id) => {
    // Remove the article with the given id from the favorites list
    const updatedArticles = favoriteArticles.filter((article) => article.id !== id);
    setFavoriteArticles(updatedArticles);
  };


  return (
    <div
      className={`bg-[#EBEFEE] my-[10px] h-auto overflow-hidden w-full px-[30px] py-[20px] rounded-[20px]  flex flex-col justify-start items-start ${
        showCard ? "h-full" : ""
      }`}
    >
      {/* Title and ArrowDown icon */}
      <div className="w-full grid  items-center  grid-cols-[70%,30%] justify-center">
        <h1 className="text-start text-xl  font-bold font-merryweather"> Mes Favoris</h1>
        <div className="flex items-end justify-end">
        <img
          src={ArrowDown}
          onClick={handleCardAnimation}
          className={!showCard ? "rotate-180" : ""}
          alt="Arrow Down"
        />
        </div>
      </div>
       {/* Display favorite articles when visible */}
      {showCard && (
        <>
      <div className="overflow-y-auto p-1 max-h-[40dvh] font-lora text-l font-normal text-left ml-0 mr-[1rem] mt-1">
        {favoriteArticles.map((article) => (
          <div key={article.id} className="flex items-center mb-4">
            {/* Article Icon */}
            <img src={articleIcon} alt="Article Icon" className="w-[20px] h-[20px] " />
  
            {/* Text1 */}
            <div className="ml-4">
              <p className="text-[#000000] ">{article.title}</p>
              {/* ... other styles for text1 ... */}
            </div>
  
            {/* Text2 */}
            <p className="text-[#000000] font-lora  font-normal ml-auto">{article.date}</p>
  
            {/* Delete Icon */}
            <img
              src={deleteIcon}
              alt="Delete Icon"
              className="w-[2.2rem] h-[2.2rem] cursor-pointer ml-4"
              onClick={() => handleDeleteArticle(article.id)}
            />
          </div>
        ))}
      </div>
        
        </> 
         )}
    </div>
      
  );
};

export default MesFavoris;


