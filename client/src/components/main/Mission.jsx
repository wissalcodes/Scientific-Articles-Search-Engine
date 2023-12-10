import React from "react";
import ship from "../../../public/images/main/ship.svg";
const Mission = () => {
  return (
    <div className=" w-full md:grid md:grid-cols-[50%,50%] md:pt-[50px]  lg:pt-[160px] pt-[120px] px-[30px] lg:px-[70px] xl:px-[108px]">
      <div className="w-full  grid-rows-[30%,70%] justify-center items-start">
        <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center">
          <h1 className="font-merryweather placeholder:text-center md:text-start text-[#395143]">
            Notre Mission
          </h1>
        </div>
        <div className="pt-[30px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="flex text-center md:text-start">
            Guidées par la transparence et l'exactitude, nous aspirons à
            encourager la collaboration entre chercheurs et à faciliter la
            navigation à travers l'océan d'informations scientifiques. Notre
            vision est de contribuer à un monde où le savoir est accessible à
            tous, catalysant ainsi l'évolution constante du paysage scientifique
            mondial.
          </p>
        </div>
      </div>
      <div className="relative  md:pt-0 pt-[50px] flex flex-col justify-start items-center w-full h-full">
        <div className="absolute -translate-y-[50px] md:translate-x-[50px] rounded-[15px] w-[90%] h-[905]">
          <img src={ship} />
        </div>
      </div>
    </div>
  );
};
export default Mission;
