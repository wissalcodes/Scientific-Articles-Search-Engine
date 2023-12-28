import React from "react";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className=" h-full overflow-y-hidden px-[20px] text-[#black] lg:px-[70px] xl:px-[5%] w-full  md:grid py-[60px] md:grid-cols-2 xl:grid-cols-[45%,55%] justify-center items-center ">
      <div className="w-full h-full flex flex-col lg:justify-start md:mt-[450px] items-center lg:items-start">
        <div className="lg:pr-[40px] w-full  grid-rows-[30%,70%] justify-center items-start">
          <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center ">
            <h1 className="text-[#395143] text-center xl:text-[64px] lg:text-[40px] md:text-[30px] text-[24px] font-bold font-merryweather lg:pb-[8%] xl:pb-[4%] ">
              Contactez-nous
            </h1>
          </div>
          <div className="md:pt-[30px] pt-[20px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-semibold flex md:justify-start justify-center items-center">
            <p className="font-merryweather pt-[30px] w-full xl:text-[30px] text-sm lg:text-[20px] font-light flex justify-start  items-center">
              Besoin d'aide ou avez-vous des questions ? Contactez-nous ! Notre
              équipe dédiée est là pour vous assister. Utilisez le formulaire
              ci-dessous pour nous faire part de vos préoccupations, et nous
              vous répondrons rapidement.
            </p>
          </div>
        </div>
      </div>
      <div className="flex pt-[40px] font-merryweather xl:text-[20px] text-sm lg:text-[16px] w-full justify-center items-center ">
        <div className="drop-shadow w-[90%] rounded-[20px] bg-[#BEB9A1E5]  px-[5%] py-[40px] lg:py-[40px] h-full flex flex-col justify-center items-center">
          <p className="py-[5px] w-full font-light text-start  lg:text-[18px] xl:text-[18px]">
            E-MAIL
          </p>
          <input
            type="email"
            className="font-merryweather font-light rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[5px] w-full font-light text-start  lg:text-[18px] xl:text-[18px]">
            OBJET
          </p>
          <input
            type="email"
            className="font-light font-merryweather rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[5px] w-full font-light text-start  lg:text-[18px] xl:text-[18px]">
            MESSAGE
          </p>
          <textarea
            type="email"
            className="mb-[40px] font-merryweather font-light lg:h-[150px] xl:h-[200px] rounded-[12px] drop-shadow focus:outline-none py-[25px] w-full px-[40px]"
          />
          <div className="flex w-full h-full items-center justify-end">
            <div className="transform transition-transform duration-200 ease-in-out hover:scale-105 drop-shadow-lg flex w-[35%] xl:w-[25%] items-center flex-col h-full justify-center lg:justify-center">
              <button className="font-light rounded-[12px]  bg-gradient-to-r from-[#395143] to-[#AF9A27] text-[#E7E4D5] py-[10px] xl:py-[12px] w-full px-[15px]">
                ENVOYER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
