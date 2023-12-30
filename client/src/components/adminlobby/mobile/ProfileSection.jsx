/* eslint-disable react/prop-types */
import { useState } from "react";
import section from "../../../../public/images/admin/section.svg";

export const ProfileSection = ({ profile }) => {
  // const [message, setMessage] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };

  const resetPassword = async () => {
    // const url = "/";
    // const response = axios.put()
  };

  return (
    <div
      className={`bg-[#F5EAAB] my-[10px] h-auto overflow-hidden w-full px-[30px] py-[20px] rounded-[20px] lg:hidden flex flex-col justify-start items-start ${
        showCard ? "h-full" : ""
      }`}>
      <div className="w-full grid  items-center  grid-cols-[70%,30%] justify-center">
        <h1 className="text-start text-xl  font-bold font-merryweather">
          Mon Profile
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
          <p className="py-[10px] font-merryweather text-md lg:text-lg font-bold">
            Information personnelles
          </p>
          <div className="grid grid-cols-[40%,60%] w-full">
            <div className="flex">Prenom</div>
            <div className="flex">{profile.firstName}</div>
          </div>
          <div className="grid grid-cols-[40%,60%] w-full">
            <div className="flex">Nom</div>
            <div className="flex">{profile.lastName}</div>
          </div>
          <div className="grid grid-cols-[40%,60%] w-full">
            <div className="flex">Pseudo</div>
            <div className="flex">{profile.pseudo}</div>
          </div>
          <div className="grid grid-cols-[40%,60%] w-full">
            <div className="flex">E-mail</div>
            <div className="flex">{profile.email}</div>
          </div>
          <p className="pt-[10%] py-[10px] text-md lg:text-lg font-merryweather font-bold">
            Parametres du compte
          </p>
          <div className="grid grid-cols-[60%,40%] w-full">
            <p className="text-start">Mot de passe</p>
            <div className="border-5 border-b-[1px] border-black flex w-full">
              <input
                className="text-black flex w-full focus:outline-none focus:border-transparent bg-transparent pb-[8px]"
                type="text"
                value={passwordOld}
                onChange={(e) => setPasswordOld(e.target.value)}
                placeholder="....................."
              />
            </div>
          </div>
          <div className="grid grid-cols-[60%,40%] w-full pb-[10px] ">
            <p className="text-start">Nouveau Mot de passe</p>
            <div className="border-5 border-b-[1px] border-black flex w-full">
              <input
                className="text-black flex w-full focus:outline-none focus:border-transparent bg-transparent pb-[8px]"
                type="text"
                value={passwordNew}
                placeholder="....................."
                onChange={(e) => setPasswordNew(e.target.value)}
              />
            </div>
          </div>
          <div className=" w-full justify-end items-end flex">
            <button
              onClick={resetPassword}
              className="bg-[#152522] w-[40%]  text-[#F1D896] text-sm transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px] py-[5px]">
              Confirmer
            </button>
          </div>
        </>
      )}
    </div>
  );
};
