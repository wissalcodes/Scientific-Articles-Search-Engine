import React from "react";
const Articles = () => {
  return (
    <div className=" w-full  pt-[150px] ">
      <div className="w-full flex  justify-center md:justify-start items-center">
        <h1 className="text-center text-[24px] xl:text-[50px] lg:text-[40px] font-light md:text-start">
          Dans l'actualite
        </h1>
      </div>
      <p className="w-full flex justify-center md:justify-start font-light text-[16px] lg:text-[20px] xl:text-[30px] pt-[30px] md-pt-0">
        sic mundus creatus est dolorem ipsum heheheh ejhwjrhewjh.
      </p>
      <div className=" md:pt-[100px] pt-[50px] flex flex-col justify-center items-center w-full h-[400px] md:h-[500px]">
        <div className="lg:px-[60px] md:px-[20px] flex flex-col md:grid grid-cols-3 justify-center md:justify-between  md:gap-[30px] lg:gap-[60px] xl:gap-[70px] items-center rounded-[15px] w-full h-full">
          <div className="bg-[gray] mb-[20px] rounded-[15px] flex justify-center w-[70%] md:w-full  h-full items-center">
            1
          </div>
          <div className="bg-[gray] mb-[20px] rounded-[15px] flex justify-center w-[70%] md:w-full h-full items-center">
            1
          </div>
          <div className="bg-[gray] mb-[20px] rounded-[15px] flex justify-center w-[70%] md:w-full h-full items-center">
            1
          </div>
        </div>
      </div>
    </div>
  );
};
export default Articles;
