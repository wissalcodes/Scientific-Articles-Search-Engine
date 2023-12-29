

import React, { useState } from 'react';
import heartIcon from '../image/Vector2.png';
import articleIcon from '../image/loupe-seo-and-web-svgrepo-com 1.png'; // Replace with the actual path
import deleteIcon from '../image/bin-svgrepo.png';   // Replace with the actual path

const Favorite = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([
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
 

  const handleDeleteArticle = (id) => {
    // Remove the article with the given id from the favorites list
    const updatedArticles = favoriteArticles.filter((article) => article.id !== id);
    setFavoriteArticles(updatedArticles);
  };
 
 
  const [showCard, setShowCard] = useState(false);
  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };
  return (
    <div className={`bg-[#395143] w-full md:w-[60%] lg:w-[50%] xl:w-[45%] h-[70dvh] rounded-br-[24px] drop-shadow  ml-0 top-1/2 xl:top-1/4 fixed transform transition-transform duration-300 ease-in-out ${
      showCard ? "translate-x-0" : "-translate-x-[350px]"
    }`}>
      {/* Title */}
      <div className="px-[20px] flex flex-col  items-start h-full w-full">
        <h1 className="text-[#E7E4D5] font-merriweather text-3xl font-semibold ml-7 mt-7">
          Mes Favoris
        </h1>
  
      {/* Favorite articles section */}
      <div className="overflow-y-auto p-4 max-h-[50dvh] font-lora text-xl font-normal text-left ml-0 mr-[1.5rem] mt-12">
        {favoriteArticles.map((article) => (
          <div key={article.id} className="flex items-center mb-4">
            {/* Article Icon */}
            <img src={articleIcon} alt="Article Icon" className="w-[2.5rem] h-[2.5rem] ml-[0.5em]" />
  
            {/* Text1 */}
            <div className="ml-4">
              <p className="text-[#E7E4D5] font-lora text-35px font-normal">{article.title}</p>
              {/* ... other styles for text1 ... */}
            </div>
  
            {/* Text2 */}
            <p className="text-[#E7E4D5] font-lora text-35px font-normal ml-auto">{article.date}</p>
  
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
    </div> 
    <div className="top-0 bg-[#395143]  absolute h-[22%] right-0  translate-x-[40px] pt-2 mr-1 rounded-br-[24px] rounded-tr-[24px]">
<button onClick={handleCardAnimation}>
  <img className=" right-[7px] top-[20px] w-[40px] pt-2 mr-2.5" src={heartIcon} alt="Heart Icon" />
</button>
</div>
    </div>
  );
  
  
};

export default Favorite;