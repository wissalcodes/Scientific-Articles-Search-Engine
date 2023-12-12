import Navbar from "../components/layout/Navbar";
import AboutUs from "../components/main/AboutUs";
import History from "../components/main/History";
import Mission from "../components/main/Mission";
import Articles from "../components/main/Articles";
import Register from "../components/main/Register";
import Contact from "../components/main/Contact";
function Main() {
  return (
    <div className="h-full relative text-black font-bold flex-col w-screen 8E4E] bg-[#E7E4D5] text-center items-center py-[50px] lg:py-[45px] xl:py-[20px]">
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
