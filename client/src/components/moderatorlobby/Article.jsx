/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ModerateArticlePopout } from "./ModerateArticlePopout";
export const Article = ({ article }) => {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const togglePopout = () => {
    setIsPopoutOpen((prev) => !prev);
  };

  useEffect(() => {
    const container = document.getElementById("main-container");
    // Add or remove 'blurred' class on body based on popout state
    if (isPopoutOpen) {
      container.classList.add("blurred");
    } else {
      container.classList.remove("blurred");
    }

    // Cleanup effect
    return () => {
      container.classList.remove("blurred");
    };
  }, [isPopoutOpen]);
  return (
    // When "Consulter" button is clicked, open the moderation panel to allow moderator to edit the fields
    <div className="px-[10px] xl:px-[20px] w-full py-[20px] font-merryweather h-full grid grid-cols-[70%,30%] lg:grid-cols-[70%,15%,15%] justify-start items-center gap-[4px] lg:gap-[10px]">
      {isPopoutOpen && (
        <ModerateArticlePopout article={article} onClose={togglePopout} />
      )}
      {/* Article title */}
      <h1 className="text-start text-md lg:text-2xl xl:text-3xl ">
        {article.title}
      </h1>
      {/* Article release date */}
      <p className="text  mt-[4px] lg:mt-0  text-md py-[10px] lg:py-0 lg:text-xl xl:text-2xl ">
        {article.date}
      </p>
      {/* Consult article button */}
      <div className="flex flex-col items-center w-[80%] justify-center">
        <button
          onClick={togglePopout}
          className="bg-[#395143] text-[#F1D896] py-[10px] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px] h-[80%] w-full lg:w-[95%] xl:w-[85%]">
          Consulter
        </button>
      </div>
    </div>
  );
};
