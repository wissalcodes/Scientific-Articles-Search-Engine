import { useEffect, useState } from "react";
import LobbyNav from "../components/layout/LobbyNav";
import { ProfileCard } from "../components/shared/ProfileCard";
import { ProfileSection } from "../components/shared/ProfileSection";
import { Article } from "../components/moderatorlobby/Article";
import axios from "axios";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";
import "../styles/globals.css";

export const ModeratorLobby = () => {
  // retrieve access token
  const token = Cookies.get("authToken");
  const refreshToken = Cookies.get("refreshToken");
  // decode token to test if it's expired
  const { decodedToken, isExpired } = useJwt(refreshToken);
  // fetch all the articles
  const [articles, setArticles] = useState([]);
  // fetch moderator data after login
  const [profile, setProfile] = useState({});

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
    let fetchData = async () => {
      try {
        // fetch the moderator's personal information
        let response = await axios.get(
          "http://127.0.0.1:5000/moderator_dashboard/my_profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setProfile(response.data);
          console.log(response.data);
        }
        // fetch all the articles that haven't been moderated yet
        response = await axios.get(
          "http://127.0.0.1:5000/moderator_dashboard/articles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setArticles(response.data.results);
          console.log("Articles fetched successfully", response.data.results);
        } else {
          console.log("error fetching articles data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // if the token has expired, refresh it
    isExpired && refreshAccessToken();
  }, []);

  return (
    <div className=" bg-[#E7E4D5] bg-none w-screen h-screen lg:h-screen pt-[100px] lg:pt-[2%] flex flex-col items-center justify-center px-[20px] lg:px-[7%] xl:px-[8%]">
      {/* Navbar */}
      <LobbyNav />
      <div className="w-full h-full flex items-start flex-col">
        {/* profile card if the screen is small */}
        <div className="sm:pt-[50px] md:pt-[100px] w-full flex flex-col lg:hidden">
          <ProfileSection profile={profile} />
        </div>
        {/* pending articles section */}
        <div className="pt-[40px] lg:pt-[80px] flex items-start pb-[10px] border-[#56695C] border-b-[4px] ">
          <h1
            id="main-container"
            className="text-md lg:text-4xl xl:text-4xl font-merryweather font-semibold">
            Articles en attente
          </h1>
        </div>
        {/* iterate through the pending articles and display each one */}
        <div className="mt-[50px] flex flex-col w-full overflow-x-hidden custom-scrollBar overflow-y-scroll relative text-xs max-h-[60vh] lg:max-h-[70vh]">
          {articles.map((a, index) => (
            <Article key={index} article={a} />
          ))}
        </div>
      </div>
      {/* Profile card for large screens */}
      <div className="lg:block hidden w-full">
        <ProfileCard profile={profile} role={"moderator"} />
      </div>
    </div>
  );
};
