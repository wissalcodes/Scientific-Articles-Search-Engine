import { useState, useEffect } from "react";
import blobs from "../../public/images/main/blured-blobs.svg";
import urlImg from "../../public/images/admin/url.svg";
import upload from "../../public/images/admin/upload.svg";
import { Moderateurs } from "../components/adminlobby/laptops/Moderateurs";
import { ModeratorsSection } from "../components/adminlobby/mobile/ModeratorsSection";
import { ProfileCard } from "../components/shared/ProfileCard";
import { ProfileSection } from "../components/shared/ProfileSection";
import LobbyNav from "../components/layout/LobbyNav";
import axios from "axios";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";

// Admin's lobby
export const AdminLobby = () => {
  const [profile, setProfile] = useState({});
  // fetch all the moderators
  const [moderateurs, setModerateurs] = useState([]);

  // get the access token
  const token = Cookies.get("authToken");
  const refreshToken = Cookies.get("refreshToken");
  // decode token to test if it's expired
  const { decodedToken, isExpired } = useJwt(refreshToken);

  // the upload URL
  const [url, setUrl] = useState("");

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

          // fetch all the moderators
          const moderatorsResponse = await axios.get(
            "http://127.0.0.1:5000/admin_dashboard/all_moderators",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (
            moderatorsResponse.status >= 200 &&
            moderatorsResponse.status < 300
          ) {
            setModerateurs(moderatorsResponse.data);
          } else {
            console.log("error fetching all moderators");
          }
        } else {
          console.log("error fetching admin data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // if the token has expired, refresh it
    isExpired && refreshAccessToken();
  }, []);

  // function to upload the articles to articles search
  const handleUpload = async () => {
    if (url) {
      try {
        // fetch the admin's personal information
        const response = await axios.post(
          "http://127.0.0.1:5000/admin_dashboard/upload_articles",
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
          alert("Articles uploades avec succes");
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      alert("Veuillez introduire un lien");
    }
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

  return (
    // Background image if the screen is large, raw otherwise
    <div
      style={{
        backgroundImage: window.innerWidth > 1024 ? `url(${blobs})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" bg-[#E7E4D5] bg-none w-screen h-screen pt-[100px] lg:pt-[2%] flex flex-col items-center justify-center px-[30px] lg:px-[10%]">
      {/* Navbar */}
      <LobbyNav />
      {/* main page content, to be blured when the add moderator popout is open */}
      <div id="main-container" className="w-full h-full flex flex-col">
        <div className="pt-[4%] w-full h-full hidden lg:grid lg:grid-cols-[40%,60%]">
          <div className=" hidden lg:flex w-[100%] flex-col items-center justify-center">
            <img src={urlImg} className="w-[70%]" />
          </div>
          <div className="w-full hidden lg:flex flex-col justify-center items-center h-full">
            <p className=" font-merryweather text-md lg:text-[50px] text-start font-bold">
              Entrez l’URL des articles scientifiques
            </p>
          </div>
        </div>
        <p className="lg:hidden font-merryweather text-lg lg:text-[50px] text-start font-bold">
          Upload des articles
        </p>
        {/* URL input field */}
        <div className="w-full flex flex-col lg:flex-row h-[60px] justify-center items-center  my-[40px]">
          <div className="pl-[20px] drop-shadow flex w-full h-full lg:mr-[15px] bg-[#56695C] lg:bg-[#BEB9A1B2] rounded-[10px]">
            <img className="lg:block hidden w-[25px]" src={upload} />
            <input
              placeholder="..."
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)} //update the URL state variable as the input changes in value
              className="lg:py-0 py-[10px] pl-[15px] text-[16px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent "
            />
          </div>
          <div className="flex justify-end lg:justify-center w-full lg:w-[30%] ">
            <div className="lg:mt-0 mt-[10px] transform h-full transition-transform duration-200 ease-in-out hover:scale-110 w-[40%] lg:w-[90%] drop-shadow flex bg-gradient-to-r from-[#395143] to-[#AF9A27] px-[10px] lg:px-[20px]  rounded-[10px]  ">
              <button
                onClick={handleUpload}
                className="text-[18px] lg:py-[5px] flex flex-col justify-center items-center lg:text-[20px] xl:text-[20px] mx-auto font-lora text-[#E7E4D5] bg-transparent px-[10px]">
                Confirmer
              </button>
            </div>
          </div>
        </div>
        {/* if the screen if small, display 2 extensible sections of profile and moderators */}
        <div className="sm:pt-[50px] md:pt-[100px] h-full w-full flex flex-col lg:hidden">
          <ProfileSection profile={profile} />
          <ModeratorsSection moderateurs={moderateurs} />
        </div>
      </div>
      {/* if the screen is large, display the fixed animated sections  */}
      <div className="lg:block hidden w-full">
        <Moderateurs moderateurs={moderateurs} />
        <ProfileCard profile={profile} />
      </div>
    </div>
  );
};
