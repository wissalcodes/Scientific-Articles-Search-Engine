import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import line from "../../../public/images/main/yellow-line.svg";
const Navbar = () => {
  return (
    <div className="py-[10px] z-20 font-bold top-0 bg-[#395143] fixed w-full h-[80px] text-[14px] xl:text-[20px] grid-cols-[1fr,1fr] gap-[10px] lg:gap-0 lg:grid-cols-[5fr,1fr,1fr] grid justify-center items-center">
      <div className=" flex items-start h-full flex-col justify-center ">
        Logo
      </div>
      <div className="md:items-end flex items-center flex-col h-full justify-center lg:justify-center">
        <button className=" text-[#F1D896] px-[10px] rounded-[10px] h-[80%] w-[90%] md:w-[40%] lg:w-[95%] xl:w-[85%]">
          <Link to="/sign_in">Se connecter</Link>
          <img src={line} />
        </button>
      </div>
      <div className="hidden lg:flex flex-col items-center h-full justify-center">
        <button className="bg-[#152522] text-[#F1D896] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px] h-[80%] w-full lg:w-[95%] xl:w-[85%]">
          <Link to="/sign_up">S'inscrire</Link>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
