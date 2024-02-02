import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import blobs from "../../../public/images/main/blured-blobs.svg";
import func1 from "../../../public/images/main/func1.svg";
import func2 from "../../../public/images/main/func2.svg";
import func3 from "../../../public/images/main/func3.svg";

const Services = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${blobs})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-full flex flex-col pt-[5%] pb-[2%] justify-center items-center">
      <div className="py-[40px] font-bold h-full  text-[#395143] leading-1 w-full flex flex-col justify-center items-center">
        <h1 className="text-center  text-2xl lg:text-4xl xl:text-5xl font-bold font-merryweather lg:pb-[8%] xl:pb-[4%] ">
          Nos services
        </h1>
        <div className=" w-full h-full px-[5%] md:mt-[60px] xl:px-[12%] pt-[5%] hidden md:grid grid-cols-3  gap-[40px] xl:gap-[80px]">
          <div className="transform transition-transform duration-200 ease-in-out hover:scale-110  drop-shadow w-full rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func1} className="w-[50%] lg:w-[70%] xl:w-[60%] " />
            <p className="text-[20px] md:text-[16px] px-[20px] font-lora leading-[150%]  pb-[20px] ">
              Personnalisez votre expérience de navigation pour un accès
              intuitif et rapide à vos articles préférés
            </p>
          </div>
          <div className=" transform transition-transform duration-200 ease-in-out hover:scale-110  drop-shadow -translate-y-[90px] w-full rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func2} className="w-[70%] lg:w-[90%] xl:w-[80%]" />
            <p className="leading-[150%] text-[20px] md:text-[16px] px-[20px] font-lora pb-[20px]">
              Utilisez notre moteur de recherche avec un Filtrage avancé pour
              une recherche ciblée.
            </p>
          </div>
          <div className="transform transition-transform duration-200 ease-in-out hover:scale-110  w-full drop-shadow rounded-[40px] px-[10px]  h-full bg-[#D6D2BD80] flex flex-col justify-center items-center">
            <img src={func3} className="w-[50%] lg:w-[60%]" />
            <p className="leading-[150%] text-[20px] md:text-[16px] px-[20px] font-lora pb-[20px]">
              Accédez à une vaste collection de plus de 500 articles récents
              couvrant une large gamme de domaines scientifiques."
            </p>
          </div>
        </div>
        <Swiper
          // configure how many cards to show and the spacing between the cards
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 35,
            },
            500: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
          freeMode={true}
          modules={[FreeMode]}
          className="h-full py-[40px] flex md:hidden px-[30px] sm:px-[90px] w-full">
          <SwiperSlide>
            <div className="px-[20px]  drop-shadow w-full sm:w-[70%] rounded-[40px] lg:px-[10px]  h-[340px] bg-[#D6D2BD80] flex flex-col justify-center items-center">
              <img
                src={func1}
                className="w-[50%] sm:w-[30%] lg:w-[70%] xl:w-[60%] "
              />
              <p className="lg:text-[20px] px-[20px] font-lora leading-[150%]  pb-[20px] ">
                Personnalisez votre expérience de navigation pour un accès
                intuitif et rapide à vos articles préférés
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="px-[20px]  drop-shadow w-full  sm:w-[70%] rounded-[40px] lg:px-[10px]  h-[340px] bg-[#D6D2BD80] flex flex-col justify-center items-center">
              <img
                src={func2}
                className="w-[50%] sm:w-[30%] lg:w-[70%] xl:w-[60%] "
              />
              <p className="lg:text-[20px] px-[20px] font-lora leading-[150%]  pb-[20px] ">
                Utilisez notre moteur de recherche avec un Filtrage avancé pour
                une recherche ciblée.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="px-[20px]  drop-shadow w-full  sm:w-[70%] rounded-[40px] lg:px-[10px]  h-[340px] bg-[#D6D2BD80] flex flex-col justify-center items-center">
              <img
                src={func3}
                className="w-[50%] sm:w-[30%] lg:w-[70%] xl:w-[60%] "
              />
              <p className="lg:text-[20px] px-[20px] font-lora leading-[150%]  pb-[20px] ">
                Accédez à une vaste collection de plus de 500 articles récents
                couvrant une large gamme de domaines scientifiques."
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Services;
