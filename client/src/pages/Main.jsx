import Navbar from "../components/layout/Navbar";
import AboutUs from "../components/main/AboutUs";
import History from "../components/main/History";
import Mission from "../components/main/Mission";
import Contact from "../components/main/Contact";
import Footer from "../components/layout/Footer";
import Register from "../components/main/Register";
function Main() {
  return (
    <div className="h-full relative text-black font-bold flex-col w-screen 8E4E] bg-[#E7E4D5] text-center items-center pt-[50px] lg:pt-[45px] xl:pt-[20px]">
      <Navbar />
      <AboutUs />
      <History />
      <Mission />
      <Register />
      <Footer />
    </div>
  );
}

export default Main;
