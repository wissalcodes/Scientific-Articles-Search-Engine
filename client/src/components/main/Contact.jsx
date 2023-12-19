import React from "react";

const Contact = () => {
  // const handleSendMail = () => {
  //   alert("Send mail");
  // };
  return (
    <div className="h-full w-screen bg-[#E7E4D5] flex flex-col justify-center items-center ">
      <div className="translate-y-[200px] w-[58vw] rounded-[20px] bg-[#BEB9A1E5]  px-[5%] py-[40px] lg:py-[40px] h-full flex flex-col justify-center items-center">
        <h1 className="text-[rgb(21,37,34)] font-merryweather text-[20px] py-[10px] lg:text-[40px] xl:text-[50px]">
          Contactez-nous
        </h1>
        <p className="font-light text-start text-[16px] lg:text-[18px] xl:text-[20px] pb-[25px] font-merryweather">
          Besoin d'aide ou avez-vous des questions ? Contactez-nous ! Notre
          équipe dédiée est là pour vous assister. Utilisez le formulaire
          ci-dessous pour nous faire part de vos préoccupations, et nous vous
          répondrons rapidement.
        </p>
        <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
          E-MAIL
        </p>
        <input
          type="email"
          className="font-merryweather font-light rounded-[12px] drop-shadow focus:outline-none py-[18px] w-full px-[40px]"
        />
        <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
          OBJET
        </p>
        <input
          type="email"
          className="font-light font-merryweather rounded-[12px] drop-shadow focus:outline-none py-[18px] w-full px-[40px]"
        />
        <p className="py-[5px] w-full font-light text-start text-[16px] lg:text-[18px] xl:text-[18px]">
          MESSAGE
        </p>
        <textarea
          type="email"
          className="mb-[40px] font-merryweather font-light h-[200px] rounded-[12px] drop-shadow focus:outline-none py-[25px] w-full px-[40px]"
        />
        <div className="flex w-full h-full items-center justify-end">
          <div className="transform transition-transform duration-200 ease-in-out hover:scale-105  translate-x-[30%] drop-shadow-lg flex w-[25%] items-center flex-col h-full justify-center lg:justify-center">
            <button className="font-light rounded-[12px]  bg-gradient-to-r from-[#395143] to-[#AF9A27] text-[#E7E4D5] py-[15px] w-full px-[15px]">
              ENVOYER
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen h-[30vh] bg-[#395143]"></div>
    </div>
  );
};
export default Contact;
