import { useState, useEffect } from "react";
import blobs from "../../public/images/main/blured-blobs.svg";
import urlImg from "../../public/images/main/welcome.svg";
import searchAsset from "../../public/images/user/search.svg";
import noresult from "../../public/images/user/noresult.svg";
import { ProfileCard } from "../components/shared/ProfileCard";
import LobbyNav from "../components/layout/LobbyNav";
import axios from "axios";
import Cookies from "js-cookie";
import { Favoris } from "../components/userlobby/Favoris";
import { Article } from "../components/userlobby/Article";
import { useJwt } from "react-jwt";

export const UserLobby = () => {
  // get the access token
  const token = Cookies.get("authToken");
  const refreshToken = Cookies.get("refreshToken");
  // decode token to test if it's expired
  const { decodedToken, isExpired } = useJwt(refreshToken);
  const [favorites, setFavorites] = useState([]);
  // to control displaying the search results or the input field
  const [search, setSearch] = useState(false);
  // fetch user profile data after login
  const [profile, setProfile] = useState({});
  // search result
  const [searchResult, setSearchResult] = useState([]);
  // the search input
  const [searchTerms, setSearchTerms] = useState("");
  // track the filtering buttons state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [authorClicked, setAuthorClicked] = useState(false);
  const [institutionClicked, setInstitutionClicked] = useState(false);
  const [keywordsClicked, setKeywordsClicked] = useState(false);

  // Function to handle author button click
  const handleAuthorClick = () => {
    setAuthorClicked(!authorClicked);
  };

  // Function to handle institution button click
  const handleInstitutionClick = () => {
    setInstitutionClicked(!institutionClicked);
  };

  // Function to handle keywords button click
  const handleKeywordsClick = () => {
    setKeywordsClicked(!keywordsClicked);
  };

  // Function to handle changes in start date input
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Function to handle changes in end date input
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // function to refresh access token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        const response = await axios.post("http://127.0.0.1:5000/auth/refresh");

        if (response.status === 200) {
          const newAccessToken = response.data.access_token;

          // Update the stored access token
          Cookies.set("authToken", newAccessToken, {
            expires: 7,
            secure: true,
            httpOnly: true,
          });

          console.log("Access token refreshed successfully");
        } else {
          console.log("Failed to refresh access token");
        }
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch the user's personal information on component mount
        const userResponse = await axios.get(
          "http://127.0.0.1:5000/user_dashboard/my_profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (userResponse.status >= 200 && userResponse.status < 300) {
          // save user infos
          setProfile(userResponse.data);
          // fetch the user's favourite articles
          const response = await axios.get(
            `http://127.0.0.1:5000/favori_manager/favorite_articles/${userResponse.data.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavorites(response.data.articles);
        } else {
          console.log("error fetching data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // if the token has expired, refresh it
    isExpired && refreshAccessToken();
  }, []);

  // function to post the search terms and parameters to the search API
  const handleSearch = async () => {
    setSearch(true);
    setSearchResult([]);
    // call the search API with corresponding filters
    try {
      const response = await axios.post(
        "http://localhost:5000/article_manager/search_articles",
        {
          search_terms: searchTerms,
          institutions_filter: institutionClicked ? true : false,
          authors_filter: authorClicked ? true : false,
          keywords_filter: keywordsClicked ? true : false,
          start_date: startDate,
          end_date: endDate,
        }
      );
      console.log(startDate, endDate);
      if (response.status >= 200 && response.status < 300) {
        console.log("successful search");
        const articles = response.data.results;
        // save the search results
        setSearchResult(articles);
      } else {
        console.log("error searching articles");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // Background image if the screen is large
    <div
      style={{
        backgroundImage: !search ? `url(${blobs})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" bg-[#E7E4D5] z-0 bg-none w-screen h-screen py-[50px] md:pt-[8%] lg:pt-[2%] flex flex-col items-center justify-center px-[40px] md:px-[30px] lg:px-[8%] xl:px-[10%] ">
      {/* Navbar */}
      <LobbyNav />
      {/* if the screen if small, display 2 extensible sections of profile and favorites */}
      <div className="lg:h-[30vh] lg:hidden  z-50">
        <ProfileCard profile={profile} role={"user"} />
        <Favoris favorites={favorites} profile={profile} />
      </div>
      <div id="main-container" className="pt-[90px] w-full flex flex-col">
        {!search && (
          <div className="pt-[4%] w-full h-full hidden lg:grid lg:grid-cols-[50%,50%]">
            <div className="hidden lg:flex w-[100%] flex-col items-center justify-center">
              <img src={urlImg} className="w-[70%]" />
            </div>
            <div className="w-full hidden lg:flex flex-col justify-center items-center h-full">
              <p className=" font-merryweather text-md lg:text-[40px] xl:text-[50px] text-start font-bold">
                Explorez instantanément les articles scientifiques les plus
                récents
              </p>
            </div>
          </div>
        )}
        {/* URL input field */}
        <div
          className={`md:mt-[300px] lg:mt-0 w-full text-[#395143] flex flex-col lg:flex-row h-[50px] justify-center items-center my-[40px]`}>
          <div className="pl-[20px] drop-shadow flex w-full lg:h-[80%] xl:h-full lg:mr-[15px] bg-[#56695C] lg:bg-[#BEB9A1B2] rounded-[10px] ">
            <img className="lg:block hidden w-[25px]" src={searchAsset} />
            <input
              placeholder="Rechercher des articles..."
              type="text"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)} //update the URL state variable as the input changes in value
              className="text-[black] lg:py-0 py-[10px] pl-[15px] text-[16px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent "
            />
          </div>
          <div className="flex justify-end lg:justify-center w-full lg:w-[30%] ">
            <div className="lg:mt-0 mt-[10px] transform h-full transition-transform duration-200 ease-in-out hover:scale-110 w-[40%] lg:w-[90%] drop-shadow flex bg-gradient-to-r from-[#395143] to-[#AF9A27] px-[10px] lg:px-[20px]  rounded-[10px]  ">
              <button
                onClick={handleSearch}
                className="text-sm lg:text-lg xl:text-xl lg:py-[5px] xl:py-[10px] flex flex-col justify-center items-center lg:text-[20px] xl:text-[24px] mx-auto font-lora text-[#E7E4D5] bg-transparent px-[10px]">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div
          className={`"pt-[80px] w-full flex gap-[10px] flex-wrap h-[100px] md:grid md:grid-cols-[0.75fr,1fr,1fr,1fr,1fr,1fr] xl:grid-cols-[2fr,1fr,1fr,1fr,1.5fr,1.5fr] lg:flex-row lg:h-[50px] text-sm lg:text-lg  lg:justify-center items-center mb-[40px]"`}>
          <p className="font-merryweather text-start font-bold">Filtrer Par</p>
          <button
            className={`${
              authorClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px]  lg:px-[10px] xl:w-[90%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleAuthorClick}>
            Auteurs
          </button>
          <button
            className={`${
              institutionClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px] lg:px-[10px] xl:w-[90%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleInstitutionClick}>
            Institutions
          </button>
          <button
            className={`${
              keywordsClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px] lg:px-[10px] xl:w-[90%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleKeywordsClick}>
            Mots Clés
          </button>
          {/* Date inputs */}
          <div className="w-full text-sm xl:text-md font-merryweather flex lg:justify-center items-center ">
            <p>Date debut</p>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="bg-[#E7E4D5] px-[5px] rounded-[10px] border-[1px] border-[#E7E4D5]  focus:outline-none"
            />
          </div>
          <div className="w-full text-sm xl:text-md font-merryweather flex lg:justify-center items-center ">
            <p>Date fin</p>
            <input
              type="date"
              placeholder="Date de fin"
              value={endDate}
              onChange={handleEndDateChange}
              className="bg-[#E7E4D5] px-[5px] rounded-[10px] border-[1px] border-[#E7E4D5]  focus:outline-none"
            />
          </div>
        </div>
      </div>
      {/* To be displayed once the user clicks on the search button */}
      {search && favorites && (
        <div className="w-full ">
          <p className=" font-merryweather text-md lg:text-[40px] xl:text-[40px] text-start font-bold py-[10px]">
            {searchResult.length > 0
              ? "Résultats de la recherche"
              : "Pas de résultats.."}
          </p>
          <div className=" h-[50vh] flex flex-col items-center custom-scrollBar overflow-y-scroll">
            {searchResult.length > 0 ? (
              searchResult.map((article, index) => {
                const isFavorite = favorites.some(
                  (fav) => fav._id === article.id
                );
                console.log(isFavorite);
                return (
                  <Article
                    key={index}
                    article={article}
                    profile={profile}
                    type={isFavorite ? "fav" : ""}
                  />
                );
              })
            ) : (
              <img src={noresult} className="h-[80%]" />
            )}
          </div>
        </div>
      )}

      {/* if the screen is large, display the fixed animated sections  */}
      <div className="lg:block hidden w-full">
        <ProfileCard profile={profile} role={"user"} />
        <Favoris favorites={favorites} profile={profile} />
      </div>
    </div>
  );
};
