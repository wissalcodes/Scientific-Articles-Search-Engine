import React, { useState } from "react";
import section from "../../../../public/images/admin/section.svg";
import { Moderateur } from "../Moderateur";
export const ModeratorsSection = ({ moderateurs }) => {
  const [message, setMessage] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };

  const resetPassword = async () => {
    const url = "/";
    // const response = axios.put()
  };

  return (
    <div
      className={`bg-[#F5EAAB] my-[10px] h-auto overflow-hidden w-full px-[30px] py-[20px] rounded-[20px] lg:hidden flex flex-col justify-center items-start ${
        showCard ? "h-full" : ""
      }`}>
      <div className="w-full items-center grid grid-cols-2 justify-center">
        <h1 className="text-start text-xl font-bold font-merryweather">
          Moderateurs
        </h1>
        <div className="flex items-end justify-end">
          <img
            src={section}
            onClick={handleCardAnimation}
            className={!showCard ? "rotate-180" : ""}
            alt="Section"
          />
        </div>
      </div>
      {showCard && (
        <>
          {/* Second row, reports cards  */}
          <div className="w-full h-full">
            {moderateurs.map((m) => (
              <Moderateur moderateur={m} key={m.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
