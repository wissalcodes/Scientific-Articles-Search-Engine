import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className=" h-full overflow-y-hidden px-[30px] text-[#black] lg:px-[70px] xl:px-[5%] w-full  md:grid py-[60px] md:grid-cols-2 xl:grid-cols-[45%,55%] justify-center items-center ">
      <div className="w-full h-full flex flex-col justify-start md:mt-[450px] items-start">
        <div className="pr-[40px] w-full  grid-rows-[30%,70%] justify-center items-start">
          <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center ">
            <h1 className="text-[rgb(21,37,34)] font-merryweather text-[20px] py-[10px] lg:text-[40px] xl:text-[50px]">
              Contactez-nous
            </h1>
          </div>
          <div className="md:pt-[30px] pt-[20px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-semibold flex md:justify-start justify-center items-center">
            <p className="font-light text-start text-[16px] lg:text-[18px] xl:text-[20px] pb-[25px] font-merryweather">
              Besoin d'aide ou avez-vous des questions ? Contactez-nous ! Notre
              équipe dédiée est là pour vous assister. Utilisez le formulaire
              ci-dessous pour nous faire part de vos préoccupations, et nous
              vous répondrons rapidement.
            </p>
          </div>
          <div className="w-full text-[#395143] mt-[15px] font-semibold flex md:hidden items-center flex-col h-[80px] justify-center pt-[25px]">
            <button className="bg-[#F1D896] px-[10px] rounded-[15px] h-[50px] w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
              <Link to="/sign_up">S'inscrire</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex  xl:text-[20px] text-[16px] w-full justify-center items-center ">
        <div className="drop-shadow w-[90%] rounded-[20px] bg-[#BEB9A1E5]  px-[5%] py-[40px] lg:py-[40px] h-full flex flex-col justify-center items-center">
          <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
            E-MAIL
          </p>
          <input
            type="email"
            className="font-merryweather font-light rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
            OBJET
          </p>
          <input
            type="email"
            className="font-light font-merryweather rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
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

export default Register;
