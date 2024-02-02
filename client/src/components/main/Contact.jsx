import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contact = () => {
  useEffect(() => {
    let tween = gsap.from(".form-container", {
      duration: 2,
      y: 20,
      yoyo: true,
      repeat: -1,
    });
  }, []);
  return (
    <div className="section z-100 overflow-x-hidden lg:h-[110vh] overflow-y-hidden px-[20px] md:px-[50px] text-[#black] lg:px-[70px] xl:px-[5%] w-full  lg:grid py-[60px] lg:grid-cols-2 xl:grid-cols-[45%,55%] justify-center items-center ">
      <div className="w-full h-full flex flex-col lg:justify-center  items-center lg:items-start">
        <div className="lg:pr-[40px] w-full  grid-rows-[30%,70%] justify-center items-start">
          <div className=" lg:text-[40px] text-[24px] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center ">
            <h1 className="text-[#395143] w-full text-center lg:text-start text-md lg:text-4xl xl:text-5xl font-bold font-merryweather  ">
              Contactez-nous
            </h1>
          </div>
          <p className="lg:pt-[20px] lg:text-start xl:leading-[180%] font-merryweather text-md lg:text-xl xl:text-2xl font-light  ">
            Besoin daide ou avez-vous des questions ? Contactez-nous ! Notre
            équipe dédiée est là pour vous assister. Utilisez le formulaire
            ci-dessous pour nous faire part de vos préoccupations, et nous vous
            répondrons rapidement.
          </p>
        </div>
      </div>
      <div className="flex pt-[40px] font-merryweather xl:text-[20px] text-sm lg:text-[16px] w-full justify-center items-center ">
        <div className="form-container drop-shadow w-[95%] rounded-[20px] bg-[#BEB9A1E5] px-[20px] lg:px-[40px] py-[20px] lg:py-[40px] h-full flex flex-col justify-center items-center">
          <p className="py-[10px] w-full font-light text-start text-md xl:text-lg">
            E-MAIL
          </p>
          <input
            type="email"
            className="font-merryweather font-light rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[10px] w-full font-light text-start text-md xl:text-lg">
            OBJET
          </p>
          <input
            type="email"
            className="font-light font-merryweather rounded-[12px] drop-shadow focus:outline-none py-[10px] xl:py-[18px] w-full px-[40px]"
          />
          <p className="py-[10px] w-full font-light text-start text-md xl:text-lg">
            MESSAGE
          </p>
          <textarea
            type="email"
            className="mb-[40px] font-merryweather font-light lg:h-[150px] xl:h-[200px] rounded-[12px] drop-shadow focus:outline-none py-[25px] w-full px-[40px]"
          />
          <div className="flex w-full h-full items-center justify-end">
            <div className="transform transition-transform duration-200 ease-in-out hover:scale-105 drop-shadow-lg flex sm:w-[35%] xl:w-[25%] items-center flex-col h-full justify-center lg:justify-center">
              <button className="text-md xl:text-lg font-light rounded-[12px]  bg-gradient-to-r from-[#395143] to-[#AF9A27] text-[#E7E4D5] py-[5px] xl:py-[5px] w-full px-[15px]">
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
