import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutUs = () => {
  const textRef = useRef(null);
  useEffect(() => {}, []);
  return (
    <div className=" w-full md:grid md:grid-cols-2 pt-[100px] lg:gap-[5%] xl:gap-[12%]">
      <div
        ref={textRef}
        className="w-full  grid-rows-[30%,70%] justify-center items-start">
        <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-light md:w-[40%] wfull flex md:justify-start justify-center items-center">
          <h1 className="text-center md:text-start">A propos de nous</h1>
        </div>
        <div className="pt-[30px] pr-[50px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="flex text-center md:text-start">
            sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh sic mundus
            creatus est dolorem ipsu mundus creatus est dolorem ipsum heheheh
            ejhwjrhewjh sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh
          </p>
        </div>
      </div>
      <div className=" md:pt-0 pt-[50px] flex flex-col justify-center items-center  h-full">
        <div className="bg-[gray] rounded-[15px] w-full h-[350px]">.</div>
      </div>
    </div>
  );
};
export default AboutUs;
