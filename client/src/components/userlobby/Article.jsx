import React, { useState, useEffect } from "react";
import axios from "axios";
import artAssetDark from "../../../public/images/user/article-dark.svg";
import heart from "../../../public/images/user/e-heart.svg";
import filledheart from "../../../public/images/user/filledheart.svg";
import { ArticlePopout } from "../moderatorlobby/ArticlePopout";
import Cookies from "js-cookie";

export const Article = ({ article, type, profile }) => {
  const token = Cookies.get("authToken");
  const [isFavorited, setIsFavorited] = useState(type);
  const toggleIsFavorited = () => setIsFavorited(!isFavorited);
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
  const handleRemoveFav = async () => {
    toggleIsFavorited();

    try {
      const favsUrl = `http://localhost:5000/favori_manager/remove_favorite/${profile.id}/${article._id}`;
      console.log(favsUrl);
      const response = await axios.post(favsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    toggleIsFavorited();
    try {
      const favsUrl = `http://localhost:5000/favori_manager/add_favorite/${profile.id}/${article._id}`;
      console.log(favsUrl);
      const response = await axios.post(favsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <div
      key={isFavorited}
      className="text-black md:px-[20px] lg:px-0 justify-center items-center lg:py-[10px] xl:py-[20px] font-merryweather flex flex-wrap  w-full md:grid md:grid-cols-[80%,15%,5%] lg:grid-cols-[5%,65%,20%,10%]">
      {isPopoutOpen && (
        <ArticlePopout article={article} onClose={togglePopout} />
      )}
      <img
        className="hidden lg:block w-[30px]"
        src={artAssetDark}
        alt="Article Asset"
      />
      {/* Article title */}
      <h1
        onClick={togglePopout}
        className="lg:px-[10px] text-start text-sm lg:text-xl xl:text-xl">
        {article.source.title || "Title Not Available"}
      </h1>
      {/* Article release date */}
      <p className="text mt-[4px] lg:mt-0 text-md py-[10px] lg:py-0 lg:text-xl xl:text-xl flex justify-center items-center lg:px-[10px]">
        {article.source.date || "Date Not Available"}
      </p>
      <button
        className="flex flex-col items-center justify-center pl-[10px] lg:pl-0"
        onClick={isFavorited ? handleRemoveFav : handleAddFav}>
        <img
          className="w-[20px] lg:w-[30px] xl:w-[30px]"
          src={isFavorited ? filledheart : heart}
          alt={isFavorited ? "Remove from favorites" : "Add to favorites"}
        />
      </button>
    </div>
  );
};
