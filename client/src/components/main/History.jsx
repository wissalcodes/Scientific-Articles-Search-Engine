import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutus from "../../../public/images/main/aboutus.svg";
gsap.registerPlugin(ScrollTrigger);

const History = () => {
  const assetRef = useRef(null);
  const sectionRef = useRef(null);
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
      ref={sectionRef}
      className="px-[30px] lg:px-[70px] xl:px-[108px] w-full md:grid md:grid-cols-[55%,45%] py-[120px]">
      <div
        ref={assetRef}
        className="asset relative md:pt-0 pt-[50px] hidden md:flex flex-col justify-center items-center h-full ">
        <div className="absolute -translate-x-[70px] rounded-[15px] w-[80%] h-[80%]">
          <img src={aboutus} />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-start">
        <div className="font-bold lg:text-[40px] text-[24px] text-[#395143] leading-[1] xl:text-[50px]  w-full flex md:justify-start justify-center items-center">
          <h1 className="text-center md:text-start font-merryweather">
            A propos de nous
          </h1>
        </div>
        <div className="pt-[30px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="h-full font-lora flex text-center md:text-start md:pb-0 pb-[50px]">
            Nous sommes un groupe d'étudiantes passionnées par la recherche
            scientifique, unissant nos compétences en sciences, ingénierie et
            informatique pour créer un moteur de recherche d'articles. Fortes de
            notre diversité académique, nous sommes déterminées à simplifier
            l'accès au savoir scientifique, en offrant une plateforme intuitive
            et inclusive.
          </p>
        </div>
        <div className="flex md:hidden flex-col justify-center items-center h-full">
          <img src={aboutus} />
        </div>
      </div>
    </div>
  );
};

export default History;
