import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap/gsap-core";
const History = () => {
  const assetRef = useRef(null);
  useEffect(() => {
    gsap.from(assetRef, {});
  }, []);
  return (
    <div className=" px-[30px] lg:px-[70px] xl:px-[108px] w-full md:grid md:grid-cols-[60%,40%] pt-[150px] ">
      <div className=" md:pt-0 pt-[50px] hidden md:flex flex-col justify-center items-center  h-full pr-[60px] ">
        <div className="bg-[gray] rounded-[15px] w-full h-[300px]">.</div>
      </div>
      <div className="w-full grid md:grid-rows-[30%,70%] justify-center items-start">
        <div className=" font-bold lg:text-[40px] text-[24px] text-[#395143] leading-[1] xl:text-[50px]  w-full flex md:justify-start justify-center items-center">
          <h1 className="text-center md:text-start">
            Comment nous avons commence
          </h1>
        </div>
        <div className="pt-[30px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="flex text-center md:text-start md:pb-0 pb-[50px]">
            sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh sic mundus
            ejhwjrhewjh sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh
          </p>
        </div>
        <div className="flex md:hidden flex-col justify-center items-center  h-full  ">
          <div className="bg-[gray] rounded-[15px] w-full h-[300px]">.</div>
        </div>
      </div>
    </div>
  );
};
export default History;
