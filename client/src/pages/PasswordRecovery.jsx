import React, { useEffect, useState } from "react";
import MDPOublie from "../../public/images/authentication/mdps-oublie.svg";
import ErrorMessage from "../components/authentication/Error";
export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const handleResetMail = () => {
    alert(email);
  };
  return (
    <div className="bg-[#E7E4D5] relative w-screen overflow-hidden h-screen lg:grid lg:grid-cols-[40%,60%] xl:grid-cols-[30%,70%] items-center justify-center">
      <div className="absolute left-[20px] lg:translate-y-[25vh] xl:translate-y-[18vh] h-full w-0 lg:w-[500px] xl:w-[720px]">
        <img src={MDPOublie} />
      </div>
      <div className="h-[55vh] lg:h-full w-full px-[50px] py-[40px] bg-[#BEB9A1] lg:rounded-0 rounded-b-[30px] flex flex-col">
        <div className="flex items-center justify-start h-[10%] w-full">
          <div>Logo</div>
          <div>Websitename</div>
        </div>
        <div className="flex h-full justify-center items-center flex-col">
          <img className="w-[400px]" src={MDPOublie} />
        </div>
      </div>
      <div className="h-full w-full flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:px-[80px] xl:px-[220px] justify-start items-center bg-[#E7E4D5]">
        <div className="w-full h-full z-80">
          <h1 className="z-70 text-[#395143] font-bold hidden lg:flex text-start font-merryweather lg:pt-[40%] xl:pt-[20%] text-[42px] xl:text-[58px]">
            Vous avez oublié votre mot de passe ?
          </h1>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-[27px] pt-[5%] pb-[8%] xl:text-[32px]">
                Entrez l'e-mail associé à ce compte.
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                E-mail
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[15px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder="E-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="lg:pt-[40px] pt-[20px] xl:pt-[54px] w-full flex items-end justify-end">
            <div className="lg:w-[30%] w-full flex bg-[#395143] px-[20px] py-[5px] rounded-[10px] ">
              <button
                onClick={handleResetMail}
                className="lg:text-[28px] text-[24px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
