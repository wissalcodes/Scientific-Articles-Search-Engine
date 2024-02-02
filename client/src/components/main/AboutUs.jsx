import { useRef } from "react";
import illustration from "../../../public/images/main/welcome.svg";
import Typed from "react-typed";

const AboutUs = () => {
  const assetRef = useRef(null);
  return (
    <div className="bg-[#395143] flex flex-col items-center text-[#E7E4D5] py-[50px] lg:py-0 px-[20px] md:px-[40px] lg:px-[70px] xl:px-[108px] w-full md:grid md:grid-cols-[45%,55%] lg:grid-cols-2  lg:h-screen lg:gap-[5%] xl:gap-[10%]">
      <div className=" h-full md:w-[90%] lg:w-full flex flex-col  lg:pt-0 justify-center items-center">
        <div className=" lg:text-[40px] md:text-[30px] text-[24px] leading-[1] xl:text-[55px] font-light  w-full flex md:justify-start justify-center items-start">
          <Typed
            className="text-[#F1D896] font-bold text-center md:text-start font-merryweather"
            strings={["Bienvenue sur notre platforme!"]}
            typeSpeed={55}
          />
        </div>
        <div className="pt-[30px] lg:pr-[50px] w-full  text-md lg:text-xl xl:text-2xl  font-light flex justify-start items-center">
          <p className="font-lora leading-[180%] flex text-center md:text-start">
            Bienvenue sur NUCLEUS, votre passerelle vers une exploration
            scientifique approfondie.
            <br />
            Découvrez une plateforme oùa la passion pour la science et la
            technologie de pointe se rencontrent pour enrichir votre expérience
            de recherche.
          </p>
        </div>
      </div>
      <div className=" md:pt-0 pt-[50px] animate-slideToLeft flex flex-col justify-center items-center w-[100%] lg:w-[90%] md:h-[90%] h-[50%]">
        <div
          ref={assetRef}
          className=" rounded-[15px] w-[60%] md:w-[70%] lg:w-full">
          <img src={illustration} />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
