import React, { useState, useEffect } from "react";
import AuthNavbar from "../components/layout/AuthNavbar";
import SignInIllustration from "../../public/images/authentication/sign-in-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
const SignIn = () => {
  const [password, setPassword] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="w-screen h-screen relative">
      <AuthNavbar />
      <div className="w-screen h-screen grid grid-cols-2">
        <div className="h-full w-full bg-[#E7E4D5] ietms-center justify-center flex flex-col">
          <div className="flex flex-col mx-[100px] justify-center items-center">
            <div className="w-full flex justify-start items-start">
              <h1 className="text-[#152522] font-bold font-merryweather text-[24px] lg:text-[40px] xl:text-[50px]">
                Se connecter
              </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px]  lg:pt-[60px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  E-MAIL
                </h1>
              </div>
              <div className="w-full flex bg-[white] px-[20px] py-[15px] rounded-[10px]">
                <input
                  className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px]  lg:pt-[30px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[15px] rounded-[10px]">
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
              <div className="w-full h-full flex flex-col justify-center items-start pt-[40px]">
                <div className="w-[50%]  flex bg-[#1D3A35] px-[20px] py-[10px] rounded-[10px]">
                  <button className="text-[32px] mx-auto font-lora text-[#F1D896] bg-transparent pr-[10px]">
                    Sign in
                  </button>
                </div>
                <p className="font-lora text-[#395143] font-semibold pt-[40px]">
                  <span className="text-[#8C876F]">Mot de passe oublié ? </span>
                  Récupérez-le maintenant !
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-[#395143] flex flex-col items-center justify-center">
          <img className="w-[70%] h-[70%]" src={SignInIllustration} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
