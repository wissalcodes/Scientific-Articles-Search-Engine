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

export const ArticlePopout = ({ onClose, article }) => {
  const title = article._source.title;
  const text = article._source.article;
  // for displaying the article PDF
  const url = article._source.url;

  const openPdfInNewTab = () => {
    const googleDriveViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
      url
    )}`;
    window.open(googleDriveViewerUrl, "_blank");
  };
  return (
    <div className="z-20 drop-shadow px-[20px] pb-[40px] py-[20px] lg:py-[30px] lg:pb-[40px] lg:px-[60px] flex flex-col rounded-[12px] lg:rounded-[40px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] lg:w-[87%] xl:w-[85vw] h-[80vh] bg-[#BEB9A1]">
      <div className="text-[#E7E4D5] items-center justify-center gap-[15px] text-xsm lg:text-lg xl:text-lg  flex w-full">
        <div className="w-[80%] text-start font-bold text-black font-merryweather text-sm lg:text-2xl xl:text-3xl flex  gap-[15px]">
          {title}
        </div>

        {/* See PDF button, when clicked opens the PDF file for the article */}
        <button
          onClick={openPdfInNewTab}
          className="bg-[#395143] rounded-[8px] lg:rounded-[15px] px-[10px]  lg:px-[20px] py-[8px]">
          Voir le PDF
        </button>
        <div className="w-[30px] flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid */}
      <div className="overflow-x-hidden px-[0px] gap-[20px] mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[80%]">
        {/* article text section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          {text}
        </div>
      </div>
    </div>
  );
};
