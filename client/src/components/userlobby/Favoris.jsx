import { useState } from "react";
import right from "../../../public/images/user/right-green.svg";
import rightSmall from "../../../public/images/user/right-small.svg";
import img from "../../../public/images/user/heart.svg";
import { FavArticle } from "./FavArticle";

export const Favoris = ({ favorites, profile }) => {
  // initially the card is invisible
  const [showCard, setShowCard] = useState(false);
  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };
  return (
    <div
      className={`bg-[#395143]  text-[#E7E4D5] drop-shadow py-[10px] font-lora rounded-br-[14px]  lg:-translate-y-[8vh] xl:-translate-y-[5vh] top-1/4 -translate-y-[0vh] lg:top-1/2 xl:top-1/2 fixed left-0 w-[80vw] lg:w-[80vw] h-[60vh] transform transition-transform duration-500 ease-in-out ${
        showCard
          ? "translate-x-0"
          : "-translate-x-[80vw] lg:-translate-x-[80vw]"
      }`}>
      {" "}
      <div className="px-[20px] flex flex-col  items-start h-full w-full">
        <h1 className="z-10 text-xl lg:text-[32px] pt-[10px] font-bold font-merryweather">
          Mes Favoris
        </h1>
        <div className="w-full z-50 h-[40vh] custom-scrollBar overflow-y-scroll">
          {favorites.map((f, index) => (
            <FavArticle type="fav" key={index} article={f} profile={profile} />
          ))}
        </div>
        <div className="top-0 flex flex-col absolute h-full right-[0px] translate-x-[35px] lg:translate-x-[45px]">
          <img
            className="z-80"
            src={window.innerWidth > 1023 ? right : rightSmall}
          />
          <button onClick={handleCardAnimation}>
            <img
              className=" absolute right-[10px] lg:right-[9px] top-[15px] lg:top-[20px] w-[23px] lg:w-[35px]"
              src={img}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
