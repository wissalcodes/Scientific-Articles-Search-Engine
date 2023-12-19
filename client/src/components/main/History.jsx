import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutus from "../../../public/images/main/aboutus.svg";
import blobs from "../../../public/images/main/blured-blobs.svg";
import func1 from "../../../public/images/main/func1.svg";
import func2 from "../../../public/images/main/func2.svg";
import func3 from "../../../public/images/main/func3.svg";
import Typed from "react-typed";

gsap.registerPlugin(ScrollTrigger);

const History = () => {
  const assetRef = useRef(null);

  useEffect(() => {
    gsap.from(assetRef.current, {
      scrollTrigger: {
        trigger: assetRef.current,
        start: "top bottom",
        end: "+=100",
        scrub: 1,
      },
      x: -400,
    });
  }, [assetRef]);

  return (
    <div
      style={{
        backgroundImage: `url(${blobs})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" w-full h-full flex flex-col pt-[5%] pb-[2%] justify-center items-center">
      <div className="font-bold h-full lg:text-[50px] text-3xl text-[#395143] leading-1 xl:text-[60px] w-full flex flex-col justify-center items-center">
        <h1 className="text-center text-[20px] lg:text-[50px] xl:text-[60px] font-merryweather lg:pb-[8%] xl:pb-[4%] ">
          Nos services
        </h1>
        <div className=" w-full px-[5%] xl:px-[12%] pt-[5%] grid grid-cols-3  gap-[40px] xl:gap-[80px]">
          <div className="transform transition-transform duration-200 ease-in-out hover:scale-110  drop-shadow w-full rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func1} className="lg:w-[70%] xl:w-[60%] " />
            <p className="text-[20px] px-[20px] font-lora leading-[150%]  pb-[20px] ">
              Personnalisez votre expérience de navigation pour un accès
              intuitif et rapide à vos articles préférés
            </p>
          </div>
          <div className=" transform transition-transform duration-200 ease-in-out hover:scale-110  drop-shadow -translate-y-[90px] w-full rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func2} className="lg:w-[90%] xl:w-[80%]" />
            <p className="leading-[150%] text-[20px] px-[20px] font-lora pb-[20px]">
              Utilisez notre moteur de recherche avec un Filtrage avancé pour
              une recherche ciblée.
            </p>
          </div>
          <div className="transform transition-transform duration-200 ease-in-out hover:scale-110  w-full drop-shadow rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func3} className="xl:w-[60%]" />
            <p className="leading-[150%] text-[20px] px-[20px] font-lora pb-[20px]">
              Accédez à une vaste collection de plus de 500 articles récents
              couvrant une large gamme de domaines scientifiques."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
