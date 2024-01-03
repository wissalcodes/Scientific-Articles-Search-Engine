import { useState, useEffect } from "react";
import blobs from "../../public/images/main/blured-blobs.svg";
import urlImg from "../../public/images/main/welcome.svg";
import searchAsset from "../../public/images/user/search.svg";
import { ProfileCard } from "../components/adminlobby/laptops/ProfileCard";
import { ProfileSection } from "../components/adminlobby/mobile/ProfileSection";
import LobbyNav from "../components/layout/LobbyNav";
import axios from "axios";
import Cookies from "js-cookie";
import { Favoris } from "../components/userlobby/Favoris";
import { Article } from "../components/userlobby/Article";
export const UserLobby = () => {
  const [favorites, setFavorites] = useState([
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "12/10/2023",
    },
  ]);
  // to control displaying the search results or the input field
  const [search, setSearch] = useState(false);
  // fetch admin data after login
  const [profile, setProfile] = useState({});
  //get the access token
  const token = Cookies.get("authToken");
  // the search URL
  const [url, setUrl] = useState("");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch the admin's personal information
        const response = await axios.get(
          "http://127.0.0.1:5000/admin_dashboard/my_profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setProfile(response.data);
        } else {
          console.log("error fetching admin data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // function to search the articles to articles search
  const handleSearch = async () => {
    setSearch(true);
    try {
      // fetch the admin's personal information
      const response = await axios.post(
        "http://127.0.0.1:5000/admin_dashboard/search_articles",
        {
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Articles searches avec succes");
      } else {
        console.log("error searching articles");
      }
    } catch (error) {
      alert(error.response.data.error);
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
      className=" bg-[#E7E4D5] bg-none w-screen h-screen pt-[50px] md:pt-[8%] lg:pt-[2%] flex flex-col items-center justify-center px-[40px] lg:px-[8%] xl:px-[10%] md:px-[10%]">
      {/* Navbar */}
      <LobbyNav />
      {/* if the screen if small, display 2 extensible sections of profile and favorites */}
      <div className="h-[30vh] lg:hidden">
        <ProfileCard profile={profile} />
        <Favoris profile={profile} />
      </div>

      <div id="main-container" className="w-full h-full flex flex-col">
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
        <div className="md:mt-[190px] lg:mt-0 w-full flex flex-col lg:flex-row h-[50px] justify-center items-center my-[40px]">
          <div className="pl-[20px] drop-shadow flex w-full h-full lg:mr-[15px] bg-[#56695C] lg:bg-[#BEB9A1B2] rounded-[10px]">
            <img className="lg:block hidden w-[25px]" src={searchAsset} />
            <input
              placeholder="Entrez l'URL des articles a searcher.."
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)} //update the URL state variable as the input changes in value
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
        <div className="w-full flex gap-[10px] flex-wrap h-[100px] lg:grid lg:grid-cols-[0.75fr,1fr,1fr,1fr,1fr,1fr] xl:grid-cols-[1fr,1fr,1fr,1fr,1.5fr,1.5fr] lg:flex-row lg:h-[50px] text-sm lg:text-lg xl:text-xl  lg:justify-center items-center mb-[40px]">
          <p className="font-merryweather text-start font-bold">Filtrer Par</p>
          <button
            className={`${
              authorClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px] xl:w-[80%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleAuthorClick}>
            Auteurs
          </button>
          <button
            className={`${
              institutionClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px] xl:w-[80%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleInstitutionClick}>
            Institutions
          </button>
          <button
            className={`${
              keywordsClicked
                ? `bg-[#BEB9A1] text-[#395143]`
                : ` bg-[#395143] text-[#BEB9A1]`
            } px-[5px] xl:w-[80%] lg:w-[90%] py-[4px] lg:rounded-[15px] rounded-[7px] border-[#395143] border-[1px] `}
            onClick={handleKeywordsClick}>
            Mots Clés
          </button>
          {/* Date inputs */}
          <div className="w-full text-sm xl:text-md font-merryweather flex lg:justify-center items-center ">
            <p>Date de debut</p>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="bg-[#E7E4D5] px-[5px] rounded-[10px] border-[1px] border-[#E7E4D5]  focus:outline-none"
            />
          </div>
          <div className="w-full text-sm xl:text-md font-merryweather flex lg:justify-center items-center ">
            <p>Date de fin</p>
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
      {search && (
        <div className="w-full h-full ">
          <p className=" font-merryweather text-md lg:text-[40px] xl:text-[50px] text-start font-bold">
            Résultats de la recherche
          </p>
          <div className="h-[50vh] md:h-[0vh] lg:h-[50vh] w-full custom-scrollBar overflow-y-scroll ">
            {favorites.map((f, index) => (
              <Article key={index} article={f} />
            ))}
          </div>
        </div>
      )}

      {/* if the screen is large, display the fixed animated sections  */}
      <div className="lg:block hidden w-full">
        <ProfileCard profile={profile} />
        <Favoris profile={profile} />
      </div>
    </div>
  );
};
