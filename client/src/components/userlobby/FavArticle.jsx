import React, { useState, useEffect } from "react";
import axios from "axios";
import artAsset from "../../../public/images/user/article.svg";
import artAssetDark from "../../../public/images/user/article-dark.svg";
import heart from "../../../public/images/user/e-heart.svg";
import bin from "../../../public/images/user/bin.svg";

export const FavArticle = ({ article, type, profile }) => {
  const handleRemoveFav = async () => {
    try {
      const favsUrl = `http://localhost:5000/favori_manager/remove_favorite/${profile.id}/${article._id}`;
      console.log(favsUrl);
      const response = await axios.post(favsUrl, {});
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      } else {
        console.log("error removing from favs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFav = async () => {
    try {
      const favsUrl = `http://localhost:5000/favori_manager/add_favorite/${profile.id}/${article._id}`;
      console.log(favsUrl);
      const response = await axios.post(favsUrl, {});
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      } else {
        console.log("error adding to favs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:py-[10px] xl:py-[20px] font-merryweather flex flex-wrap  w-full lg:grid lg:grid-cols-[5%,70%,15%,10%]">
      <img
        className="hidden lg:block w-[40px]"
        src={type === "fav" ? artAsset : artAssetDark}
      />
      {/* Article title */}
      <h1 className="lg:px-[10px] text-start text-sm lg:text-xl xl:text-2xl">
        {type === "fav" ? article._source.title : article._source.title}
      </h1>
      {/* Article release date */}
      <p className="text  mt-[4px] lg:mt-0 text-md py-[10px] lg:py-0 lg:text-xl xl:text-2xl flex justify-center items-center lg:px-[10px]">
        {type === "fav" ? article._source.date : article._source.date}
      </p>
      <button
        className="pl-[10px] lg:pl-0"
        onClick={type === "fav" ? handleRemoveFav : handleAddFav}>
        <img
          className="w-[20px] lg:w-[30px] xl:w-[40px]"
          src={type === "fav" ? bin : heart}
        />
      </button>
    </div>
  );
};
