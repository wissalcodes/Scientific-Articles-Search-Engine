import React, { useEffect, useState } from "react";

const Navbar = () => {
  const handleSignIn = () => {
    alert("Sign In");
  };
  const handleSignUp = () => {
    alert("Sign Up");
  };
  return (
    <div className="font-bold top-0 bg-[#395143] fixed w-full h-[60px] text-[14px] xl:text-[20px] grid-cols-[1fr,1fr] gap-[10px] lg:gap-0 lg:grid-cols-[5fr,1fr,1fr] grid justify-center items-center">
      <div className=" flex items-start h-full flex-col justify-center ">
        Logo
      </div>
      <div className="md:items-end flex items-center flex-col h-full justify-center lg:justify-center">
        <button
          onClick={handleSignIn}
          className="bg-[#F1D896] px-[10px] rounded-[15px] h-[80%] w-[90%] md:w-[40%] lg:w-[95%] xl:w-[85%]">
          Se connecter
        </button>
      </div>
      <div className="hidden lg:flex flex-col items-center h-full justify-center">
        <button
          onClick={handleSignUp}
          className="bg-[#152522] text-[#F1D896] rounded-[15px] h-[80%] w-full lg:w-[95%] xl:w-[85%]">
          S'inscrire
        </button>
      </div>
    </div>
  );
};
export default Navbar;
