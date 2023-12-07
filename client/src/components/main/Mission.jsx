import React from "react";

const Mission = () => {
  return (
    <div className=" w-full md:grid md:grid-cols-[40%,60%] md:pt-[180px] pt-[100px] px-[30px] lg:px-[70px] xl:px-[108px]">
      <div className="w-full  grid-rows-[30%,70%] justify-center items-start">
        <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center">
          <h1 className="text-center md:text-start text-[#395143]">
            Notre Mission
          </h1>
        </div>
        <div className="pt-[30px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-light flex justify-start items-center">
          <p className="flex text-center md:text-start">
            sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh sic mundus
            creatus est dolorem ipsu mundus creatus est dolorem ipsum heheheh
            ejhwjrhewjh sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh
          </p>
        </div>
      </div>
      <div className=" md:pl-[70px] md:pt-0 pt-[50px] flex flex-col justify-center items-center w-full h-full">
        <div className="bg-[gray] rounded-[15px] w-full h-[350px]">.</div>
      </div>
    </div>
  );
};
export default Mission;
