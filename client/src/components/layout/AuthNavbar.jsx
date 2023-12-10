import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  const handleSignIn = () => {
    alert("Sign In");
  };
  const handleSignUp = () => {
    alert("Sign Up");
  };
  return (
    <div className="px-[40px] py-[10px] font-bold top-0  fixed w-full h-[80px] text-[14px] xl:text-[20px] grid-cols-[1fr,1fr] gap-[10px] lg:gap-0 lg:grid-cols-[5fr,1fr] grid justify-center items-center">
      <div className=" flex items-start h-full flex-col justify-center ">
        Logo
      </div>

      <div className="hidden lg:flex flex-col items-end h-full justify-center">
        <button
          onClick={handleSignUp}
          className="bg-[#F1D896] text-[#152522] rounded-[10px] h-[80%] w-full lg:w-[95%] xl:w-[85%]">
          S'inscrire
        </button>
      </div>
    </div>
  );
};
export default AuthNavbar;
