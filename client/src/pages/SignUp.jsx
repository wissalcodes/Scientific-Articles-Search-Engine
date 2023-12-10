import React, { useState, useEffect } from "react";
import RegisterNav from "../components/layout/RegisterNav";
import SignUpIllustration from "../../public/images/authentication/sign-up-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [user, setUser] = useState(null);

  return (
    <div className="w-screen h-screen relative bg-[#E7E4D5]">
      <RegisterNav />
      <div className="w-screen h-screen flex flex-col lg:grid lg:grid-cols-2">
        <div className="lg:h-full h-[70vh] w-full bg-[#395143] flex flex-col items-center rounded-[50px] lg:rounded-[0px] justify-center">
          <img
            className="mt-[40px] sm:mt-[80px] lg:mt-0 w-[70%] h-[60%]"
            src={SignUpIllustration}
          />
        </div>
        <div className="h-full pb-[30px] lg:py-0 w-full bg-[#E7E4D5] ietms-center justify-center flex flex-col">
          <div className="flex flex-col mx-[30px] md:mx-[80px]  lg:mx-[80px] xl:mx-[150px] justify-center items-center">
            <div className="w-full flex justify-start items-start">
              <h1 className="text-[#152522] hidden lg:block font-semibold font-merryweather text-[24px] lg:text-[40px] xl:text-[50px]">
                S'Inscrire
              </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px]  lg:pt-[20px] flex flex-col justify-center items-start">
                <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                  USERNAME
                </h1>
              </div>
              <div className="w-full flex bg-[white] px-[20px] py-[12px] rounded-[10px]">
                <input
                  className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px] pt-[10px]  lg:pt-[15px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  E-MAIL
                </h1>
              </div>
              <div className="w-full flex bg-[white] px-[20px] py-[12px] rounded-[10px]">
                <input
                  className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type="e-mail"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px] pt-[10px]  lg:pt-[15px] flex flex-col justify-center items-start">
                <h1 className="font-semibold  font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[12px] rounded-[10px]">
                <input
                  className="focus:outline-none w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController onVisibilityChange={setIsPasswordVisible} />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px]  pt-[10px] lg:pt-[15px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  CONFIRMATION MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[12px] rounded-[10px]">
                <input
                  className="focus:outline-none w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController
                    onVisibilityChange={setIsConfirmPasswordVisible}
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-center items-start pt-[40px]">
                <div className="lg:w-[50%] w-full flex bg-[#1D3A35] px-[20px] py-[5px] rounded-[10px]">
                  <button className="text-[32px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
