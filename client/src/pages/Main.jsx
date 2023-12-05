import Navbar from "../components/layout/Navbar";
import AboutUs from "../components/main/AboutUs";
import History from "../components/main/History";
import Mission from "../components/main/Mission";
import Articles from "../components/main/Articles";
import Register from "../components/main/Register";
import Contact from "../components/main/Contact";
function Main() {
  return (
    <div className="h-full relative text-white font-bold flex-col w-screen bg-gradient-to-b  from-[#392549] via-[#535393] via-[#6f6fba] to-[#dbf44d] text-center items-center py-[50px] lg:py-[45px] xl:py-[20px] px-[30px] lg:px-[70px] xl:px-[108px]">
      <Navbar />
      <AboutUs />
      <History />
      <Mission />
      <Articles />
      <Register />
      <Contact />
    </div>
  );
}

export default Main;
