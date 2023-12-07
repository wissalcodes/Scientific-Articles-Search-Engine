import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import illustration from "../../../public/images/main/welcome.svg";
const AboutUs = () => {
  const assetRef = useRef(null);
  useEffect(() => {
    gsap.from(assetRef, {
      duration: 2,
      ease: "power2.inOut",
      opacity: 0, // start off with 0 opacity
      x: "200px",
    });
  }, []);
  return (
    <div className="bg-[#395143] text-[#E7E4D5] px-[30px] lg:px-[70px] xl:px-[108px] w-full md:grid md:grid-cols-2 pt-[100px] h-screen lg:py-[150px] lg:gap-[5%] xl:gap-[12%]">
      <div className="w-full  grid-rows-[30%,70%] justify-center items-start">
        <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[64px] font-light  w-full flex md:justify-start justify-center items-center">
          <h1 className="text-[#F1D896] font-bold text-center md:text-start font-merryweather">
            Bienvenue sur notre plateforme!
          </h1>
        </div>
        <div className="pt-[30px] pr-[50px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="flex text-center md:text-start">
            Bienvenue sur [Nom de votre site], votre passerelle vers une
            exploration scientifique approfondie. Découvrez une plateforme où
            passion pour la science et technologie de pointe se rencontrent pour
            enrichir votre expérience de recherche.
          </p>
        </div>
      </div>
      <div className=" md:pt-0 pt-[50px] flex flex-col justify-center items-center w-[90%] h-[90%]">
        <div ref={assetRef} className=" rounded-[15px] w-full">
          <img src={illustration} />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
