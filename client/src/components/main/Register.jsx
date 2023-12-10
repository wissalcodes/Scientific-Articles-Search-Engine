import React from "react";

const Register = () => {
  const handleSignUp = () => {
    alert("Sign Up");
  };
  return (
    <div className=" px-[30px] text-[#FFE3E3] lg:px-[70px] xl:px-[108px] w-full pt-[100px] md:grid md:pt-[200px] pb-[60px] md:grid-cols-2 xl:grid-cols-[45%,55%] justify-center items-center ">
      <div className="hidden md:flex  xl:text-[20px] text-[16px] w-full justify-center items-center pr-[50px] ">
        <div className="bg-[#56695C]  px-[20px] lg:px-[40px] xl:px-[70px] py-[50px] flex-col w-full justify-center items-start rounded-[15px]">
          <h1 className="text-[#F1D896] text-[24px] lg:text-[40px] w-full">
            CREER UN COMPTE
          </h1>
          <div className="w-full justify-center items-center flex-col">
            <div className="w-full mb-[10px] pt-[20px] lg:pt-[60px] flex flex-col justify-center items-start">
              <h1 className="font-semibold">NOM ET PRENOM</h1>
            </div>
            <div className="flex bg-[#E7E4D5] px-[20px] py-[10px] rounded-[15px]">
              <input
                className="text-[20px] bg-transparent pr-[10px]"
                type="text"
              />
            </div>
          </div>
          <div className="w-full justify-center items-center flex-col">
            <div className="w-full pt-[20px] mb-[10px] flex flex-col justify-center items-start">
              <h1 className="font-semibold">E-MAIL</h1>
            </div>
            <div className="flex bg-[#E7E4D5] px-[20px] py-[10px] rounded-[15px]">
              <input
                className="text-[20px] bg-transparent pr-[10px]"
                type="text"
              />
            </div>
          </div>
          <div className="w-full justify-center items-center flex-col">
            <div className="w-full  pt-[20px] mb-[10px] flex flex-col justify-center items-start">
              <h1 className="font-semibold">MOT DE PASSE</h1>
            </div>
            <div className="flex bg-[#E7E4D5] px-[20px] py-[10px] rounded-[15px]">
              <input
                className="text-[20px] bg-transparent pr-[10px]"
                type="text"
              />
            </div>
          </div>
          <div className="w-full justify-center items-center flex-col">
            <div className="w-full  pt-[20px] mb-[10px] flex flex-col justify-center items-start">
              <h1 className="font-semibold">CONFIRMER MOT DE PASSE</h1>
            </div>
            <div className="flex bg-[#E7E4D5] px-[20px] py-[10px] rounded-[15px]">
              <input
                className="text-[20px] bg-transparent pr-[10px]"
                type="text"
              />
            </div>
          </div>
          <div className="w-full text-[#395143] mt-[15px] font-semibold flex items-start flex-col h-[80px] justify-center pt-[25px]">
            <button
              onClick={handleSignUp}
              className="bg-[#F1D896] px-[10px] rounded-[15px] h-[50px] w-[70%] lg:w-[70%] xl:w-[70%]">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start md:mt-[450px] items-start">
        <div className="lg:pl-[90px] w-full  grid-rows-[30%,70%] justify-center items-start">
          <div className=" lg:text-[40px] text-[24px] leading-[1] xl:text-[50px] font-bold w-full flex md:justify-start justify-center items-center ">
            <h1 className="font-merryweather text-center md:text-start text-[#395143]">
              Inscrivez-vous!
            </h1>
          </div>
          <div className="md:pt-[30px] pt-[20px] w-full xl:text-[30px] text-[16px] lg:text-[20px] font-semibold flex md:justify-start justify-center items-center">
            <p className="text-black font-normal w-full flex flex-col text-center md:text-start">
              Rejoignez notre communauté pour accéder à un océan d'articles
              fascinants et explorer les horizons infinis de la recherche.
            </p>
          </div>
          <div className="w-full text-[#395143] mt-[15px] font-semibold flex md:hidden items-center flex-col h-[80px] justify-center pt-[25px]">
            <button
              onClick={handleSignUp}
              className="bg-[#F1D896] px-[10px] rounded-[15px] h-[50px] w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
