import { ProfileCard } from "../components/adminlobby/laptops/ProfileCard";
import { ProfileSection } from "../components/adminlobby/mobile/ProfileSection";
import LobbyNav from "../components/layout/LobbyNav";
import { Article } from "../components/moderatorlobby/Article";
import { articles } from "../data/data";
import { profile } from "../data/data";
import "../styles/globals.css";
export const ModeratorLobby = () => {
  return (
    <div className=" bg-[#E7E4D5] bg-none w-screen h-screen lg:h-screen pt-[100px] lg:pt-[2%] flex flex-col items-center justify-center px-[20px] lg:px-[7%] xl:px-[8%]">
      {/* Navbar */}
      <LobbyNav />
      <div className="w-full h-full flex items-start flex-col">
        {/* profule card if the screen is small */}
        <div className="sm:pt-[50px] md:pt-[100px] w-full flex flex-col lg:hidden">
          <ProfileSection profile={profile} />
        </div>
        {/* pending articles section */}
        <div className="pt-[40px] flex items-start pb-[10px] border-[#56695C] border-b-[4px] ">
          <h1
            id="main-container"
            className="text-md lg:text-4xl xl:text-5xl font-merryweather font-semibold">
            Articles en attente
          </h1>
        </div>
        {/* iterate through the pending articles and display each one */}
        <div className="mt-[50px] flex flex-col w-full overflow-x-hidden custom-scrollBar overflow-y-scroll relative text-xs max-h-[50vh] lg:max-h-[70vh]">
          {articles.map((a, index) => (
            <Article key={index} article={a} />
          ))}
        </div>
      </div>
      {/* Profile card for large screens */}
      <div className="lg:block hidden w-full">
        <ProfileCard profile={profile} />
      </div>
    </div>
  );
};
