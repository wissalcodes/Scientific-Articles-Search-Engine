import React from "react";
import { Link } from "react-router-dom";
const LobbyNav = () => {
  return (
    <div className="z-20 grid px-[10%] py-[20px] w-full grid-cols-2 justify-center fixed top-0">
      <div className="flex items-start">0</div>
      <div className=" lg:flex flex-col items-end h-full justify-center">
        <p className="text-end font-merryweather font-bold text-[#F4F2E6]">
          <Link
            to="/sign_up"
            className="text-[#152522] py-[4px] border-b-[4px] border-[#D9C65A] font-merryweather">
            Se deconnecter
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LobbyNav;
