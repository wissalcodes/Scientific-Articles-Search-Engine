import Navbar from "../components/layout/Navbar";
import AboutUs from "../components/main/AboutUs";
import Services from "../components/main/Services";
import Mission from "../components/main/Mission";
import Footer from "../components/layout/Footer";
import Contact from "../components/main/Contact";

function Main() {
  // Landing page
  return (
    <div className="h-full relative text-black font-bold flex-col w-screen 8E4E] bg-[#E7E4D5] text-center items-center pt-[50px] lg:pt-[45px] xl:pt-[20px]">
      <Navbar />
      <AboutUs />
      <Services />
      <Mission />
      <Contact />
      <Footer />
    </div>
  );
}

export default Main;
