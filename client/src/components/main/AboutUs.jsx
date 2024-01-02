import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import illustration from "../../../public/images/main/welcome.svg";
import Typed from "react-typed";

const AboutUs = () => {
  const assetRef = useRef(null);

  return (
    <div className="bg-[#395143] flex flex-col items-center text-[#E7E4D5] py-[20px] px-[20px] lg:px-[70px] xl:px-[108px] w-full md:grid md:grid-cols-[45%,55%] lg:grid-cols-2 pt-[100px] lg:h-screen md:py-[70px] lg:py-[150px] lg:gap-[5%] xl:gap-[10%]">
      <div className=" h-full md:w-[90%] lg:w-full flex flex-col justify-start lg:pt-0 md:pt-[70px] lg:justify-center items-start">
        <div className=" lg:text-[40px] md:text-[30px] text-[24px] leading-[1] xl:text-[64px] font-light  w-full flex md:justify-start justify-center items-start">
          <Typed
            className="text-[#F1D896] font-bold text-center md:text-start font-merryweather"
            strings={["Bienvenue sur notre platforme!"]}
            typeSpeed={55}
          />
        </div>
        <div className="pt-[30px] lg:pr-[50px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="font-lora flex text-center md:text-start">
            Bienvenue sur [Nom de votre site], votre passerelle vers une
            exploration scientifique approfondie. Découvrez une plateforme où
            passion pour la science et technologie de pointe se rencontrent pour
            enrichir votre expérience de recherche.
          </p>
        </div>
      </div>
      <div className=" md:pt-0 pt-[50px] animate-slideToLeft flex flex-col justify-center items-center w-[80%] lg:w-[90%] md:h-[90%] h-[50%]">
        <div ref={assetRef} className=" rounded-[15px] w-full">
          <img src={illustration} />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
