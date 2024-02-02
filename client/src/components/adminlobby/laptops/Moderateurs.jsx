import { useState, useEffect } from "react";
import ArrowUp from "../../../../public/images/admin/two-up-arrows.svg";
import Add from "../../../../public/images/admin/add.svg";
import { Moderateur } from "../Moderateur";
import { AddModeratorPopout } from "../AddModeratorPopout";

export const Moderateurs = ({ moderateurs }) => {
  // add moderator popout state
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [displayFullList, setDisplayFullList] =
    window.innerWidth > 1023 ? useState(false) : useState(true);
  // extend the section or not
  const toggleDisplay = () => {
    setDisplayFullList((prev) => !prev);
  };
  // add moderator popout state
  const togglePopout = () => {
    setIsPopoutOpen((prev) => !prev);
  };
  // Controls whether to show the moderators list section or not
  const [isVisible, setIsVisible] =
    window.innerWidth > 1023 ? useState(true) : useState(false);

  useEffect(() => {
    const container = document.getElementById("main-container");
    const moderateursContainer = document.getElementById(
      "moderateurs-container"
    );
    // Add or remove 'blurred' class on body based on popout state
    if (isPopoutOpen) {
      container.classList.add("blurred");
      moderateursContainer.classList.add("blurred");
    } else {
      container.classList.remove("blurred");
      moderateursContainer.classList.remove("blurred");
    }

    // Cleanup effect
    return () => {
      container.classList.remove("blurred");
    };
  }, [isPopoutOpen]);
  return (
    <div>
      {isPopoutOpen && <AddModeratorPopout onClose={togglePopout} />}
      <div
        id="moderateurs-container"
        style={{
          boxShadow:
            "-6px -6px 6px -6px rgba(0, 0, 0, 0.15), 6px 0 6px -6px rgba(0, 0, 0, 0.15)",
        }}
        className={`fixed bottom-0 py-[4px]  font-merryweather bg-[#56695C] text-[#E7E4D5] overflow-x-hidden overflow-y-auto lg:overflow-hidden ${
          !displayFullList ? "lg:pt-[40px]" : "lg:py-[20px]"
        } lg:px-[20px] px-[30px] lg:shadow-md w-[100%] rounded-[14px] flex flex-col items-center justify-center lg:ease-in-out lg:duration-150 relative ${
          displayFullList
            ? "lg:h-full lg:transform lg:-translate-y-[40px] xl:-translate-y-[150px] "
            : "lg:h-[150px] "
        }`}>
        {/* First row, title, icon and button */}
        <div className="pt-[20px] h-full lg:pt-0 w-[100%] grid grid-cols-[70%,30%] lg:grid lg:grid-cols-[45%,10%,45%] items-center justify-center">
          {/* Section title */}
          <div className="flex items-start h-full justify-start">
            <b className="xl:px-[30px] font-product-sans-bold text-[20px] lg:text-[24px] xl:text-[32px]">
              Les modérateurs
            </b>
          </div>
          {/* Report cards displaying controller, specific to large screens */}
          <div className="hidden lg:flex flex-col justify-center items-center">
            <img
              onClick={toggleDisplay}
              className={`${
                displayFullList ? "transform rotate-180" : ""
              } w-[20px] h-[30px] overflow-auto cursor-pointer`}
              alt=""
              src={ArrowUp}
            />
          </div>
          {/* Line asset */}
          <div className="flex flex-col justify-center w-full lg:items-end pr-[26px]">
            {isVisible ? (
              <div
                onClick={togglePopout}
                className="mt-[20px] lg:mt-0 flex items-center px-[20px] justify-start rounded-[8px] bg-[#F1D896]  text-white max-w-[280px] w-[58.5vw]  xl:w-[25.5vw] py-[5px] lg:py-[10px]  border-[2px] border-none border-blue">
                <img className=" w-4 h-[30.9px] cursor-pointer " src={Add} />
                <b className="text-[black] flex font-medium items-center text-[18px] pl-[10px]">
                  Ajouter un moderateur
                </b>
              </div>
            ) : null}
          </div>
        </div>
        {/* moderators list */}
        <div className="w-full h-full">
          {moderateurs.map((m) => (
            <Moderateur moderateur={m} key={m.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
