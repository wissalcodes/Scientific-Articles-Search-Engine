import React, { useEffect, useState } from "react";

const Navbar = () => {
  const handleSignIn = () => {
    alert("Sign In");
  };
  const handleSignUp = () => {
    alert("Sign Up");
  };
  return (
    <div className="top-0  bg-gradient-to-r  from-[#392549] to-[#3c3c72] fixed w-full h-[60px] text-[14px] grid-cols-[1fr,1fr] gap-[10px] lg:gap-0 lg:grid-cols-[5fr,1fr,1fr] grid justify-center items-center">
      <div className=" flex items-start h-full flex-col justify-center ">
        Logo
      </div>
      <div className="md:items-end flex items-center flex-col h-full justify-center lg:justify-center">
        <button
          onClick={handleSignIn}
          className="bg-[#c5bfbf] px-[10px] rounded-[15px] h-[80%] w-[90%] md:w-[40%] lg:w-[95%] xl:w-[85%]">
          Se connecter
        </button>
      </div>
      <div className="hidden lg:flex flex-col items-center h-full justify-center">
        <button
          onClick={handleSignUp}
          className="bg-[#989898]  rounded-[15px] h-[80%] w-full lg:w-[95%] xl:w-[85%]">
          S'inscrire
        </button>
      </div>
    </div>
  );
};
export default Navbar;
