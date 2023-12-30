import React, { useState, useEffect } from "react";
import right from "../../../../public/images/admin/right.svg";
import img from "../../../../public/images/admin/profile.svg";
import ErrorMessage from "../../authentication/Error";
import axios from "axios";

export const ProfileCard = ({ profile }) => {
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
      className={`bg-[#F5EAAB] drop-shadow py-[10px] font-lora rounded-br-[14px] top-1/4 xl:top-1/4 fixed left-0  w-[350px] h-[400px] transform transition-transform duration-300 ease-in-out ${
        showCard ? "translate-x-0" : "-translate-x-[350px]"
      }`}>
      {" "}
      <div className="px-[20px] flex flex-col  items-start h-full w-full">
        <h1 className="text-[32px] pt-[10px] font-bold font-merryweather">
          Mon Profile
        </h1>
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
          <ErrorMessage message={message} />
          <button
            onClick={resetPassword}
            className="bg-[#152522] text-[#F1D896] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px] py-[5px]">
            Confirmer
          </button>
        </div>
      </div>
      <div className="top-0 flex flex-col absolute h-full right-0 translate-x-[45px]">
        <img src={right} />
        <button onClick={handleCardAnimation}>
          <img className="fixed right-[7px] top-[20px] w-[40px]" src={img} />
        </button>
      </div>
    </div>
  );
};
