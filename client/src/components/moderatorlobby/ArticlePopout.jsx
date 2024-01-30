import { useState } from "react";
import x from "../../../public/images/admin/x.svg";
import axios from "axios";
import Cookies from "js-cookie";
// Core viewer
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// Plugins
// Core viewer
import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create new plugin instance

export const ArticlePopout = ({ onClose, article, profile }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // retrieve access token
  const token = Cookies.get("authToken");
  // State for each section
  const title = article.source.title;
  const text = article.source.article;

  // for displaying the article PDF
  const url = article.source.url;

  // Create new plugin instance for the PDF package

  const handleSeePDF = () => {
    alert(url);
  };

  const addToFavs = async () => {
    const favsUrl = `http://localhost:5000/favori/add_favorite/${profile.id}/${article.id}`;
    const response = await axios.post(favsUrl);
    console.log(response.data);
  };

  return (
    <div className="z-20 drop-shadow px-[20px] pb-[40px] py-[20px] lg:py-[30px] lg:pb-[40px] lg:px-[60px] flex flex-col rounded-[12px] lg:rounded-[40px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-[87%] xl:w-[85%] h-[80vh] bg-[#BEB9A1]">
      <div className="text-[#E7E4D5] items-center justify-center gap-[15px] text-xsm lg:text-lg xl:text-lg  flex w-full">
        <div className="w-[60%] text-start font-bold text-black font-merryweather text-sm lg:text-2xl xl:text-3xl flex flex-wrap  gap-[15px]">
          {title}
        </div>
        <button
          onClick={addToFavs}
          className="bg-[#395143] rounded-[8px] lg:rounded-[15px] px-[10px] lg:px-[20px] py-[8px]">
          Ajouter aux favoris
        </button>
        {/* See PDF button, when clicked opens the PDF file for the article */}
        <button
          onClick={handleSeePDF}
          className="bg-[#395143] rounded-[8px] lg:rounded-[15px] px-[10px]  lg:px-[20px] py-[8px]">
          Voir le PDF
        </button>
        <div className="w-[3%] flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid */}
      <div className="overflow-x-hidden px-[0px] gap-[20px] mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[80%]">
        {/* article text section */}
        <div className="text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          {text}
        </div>
      </div>
    </div>
  );
};
