import React from "react";
import x from "../../../public/images/admin/x.svg";
import SignUpIllustration from "../../../public/images/authentication/sign-in-illustration.svg";
const handleAddModerator = () => {
  console.log("add moderator");
};
export const AddModeratorPopout = ({ onClose }) => {
  return (
    <div className="z-20 drop-shadow px-[20px] lg:py-[30px] lg:px-[60px] flex flex-col rounded-[40px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[64%] bg-[#F5EAAB]">
      <div className="flex w-full">
        <h1 className="text-md lg:text-4xl font-bold font-merryweather  text-[#395143] text-start w-[70%]">
          Ajouter un moderateur
        </h1>
        <div className="w-[30%] flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid of asset and inputs */}
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-[40%,60%]">
        <div className="h-full w-full  flex flex-col items-center justify-center">
          <img className="w-[250px]" src={SignUpIllustration} />
        </div>
        <div className="h-full lg:py-[20px] w-full  items-center lg:items-start justify-center flex flex-col">
          <div className="flex w-full  lg:rounded-[15px] flex-col justify-center items-center">
            <div className="w-full h-full grid-cols-2 grid gap-[10px]">
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px] lg:pt-[7px] flex  justify-start items-start">
                  <h1 className="lg:pt-0 font-semibold font-merryweather text-[#395143]">
                    NOM
                  </h1>
                </div>
                <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                  <input
                    className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px]  lg:pt-[7px] flex  justify-start items-start">
                  <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                    PRENOM
                  </h1>
                </div>
                <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                  <input
                    className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center "></div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full h-full grid-cols-[60%,40%] grid gap-[10px]">
                <div className="w-full">
                  <div className="w-full mb-[5px] pt-[10px]  lg:pt-[7px] flex justify-start items-start">
                    <h1 className="font-semibold font-merryweather text-[#395143]">
                      E-MAIL
                    </h1>
                  </div>
                  <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                    <input
                      className="font-lora w-[90%] text-[16px] focus:outline-none focus:border-transparent  bg-transparent pr-[10px]"
                      type="e-mail"
                    />
                  </div>
                </div>
                <div className="w-full pr-[10px]">
                  <div className="w-full mb-[5px] pt-[10px] lg:pt-[7px] flex justify-start items-start">
                    <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                      USERNAME
                    </h1>
                  </div>
                  <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                    <input
                      className="font-lora w-[90%] text-[16px] focus:outline-none focus:border-transparent  bg-transparent pr-[10px]"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px] pt-[10px]  lg:pt-[7px] flex  justify-start items-start">
                <h1 className="font-semibold  font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                <input className="focus:outline-none w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]" />
                <div className="absolute right-[16px] lg:right-[16px]"></div>
              </div>
            </div>
          </div>
          <div className="pt-[10%] flex w-full items-center justify-end">
            <div className=" transform h-full transition-transform duration-200 ease-in-out hover:scale-110  w-[40%] drop-shadow flex bg-gradient-to-r from-[#395143] to-[#AF9A27] px-[20px]  rounded-[10px]  ">
              <button
                onClick={handleAddModerator}
                className="text-[18px] py-[7px] flex flex-col justify-center items-center lg:text-[20px] xl:text-[24px] mx-auto font-lora text-[#E7E4D5] bg-transparent px-[10px]">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
