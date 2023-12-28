import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Line from "../../../public/images/authentication/line.svg";
const RegisterNav = () => {
  return (
    <div className="lg:px-[40px] px-[10px] md:px-[30px] lg:bg-transparent pt-[10px] py-[40px] font-bold top-0  fixed w-full h-[80px] text-[14px] xl:text-[20px] grid-cols-[0.5fr,2fr] gap-[10px] lg:gap-0 md:grid-cols-[5fr,3fr] lg:grid-cols-[2fr,1fr] sm:grid-cols-[3fr,2fr] grid justify-center items-center">
      <div className=" flex items-start h-full flex-col justify-center ">
        Logo
      </div>
      <div className="flex  items-center h-full justify-between">
        <p className="text-[12px] lg:text-[16px]  translate-y-[2px] lg:pr-[40px]">
          Avez-vous déjà un compte ?
        </p>
        <p className="flex font-merryweather text-black">
          <Link
            to="/sign_in"
            className="text-[#F4F2E6]  border-b-[4px] border-[#395143] font-merryweather">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterNav;
