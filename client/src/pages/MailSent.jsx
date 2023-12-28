import React from "react";
import MailSentPic from "../../public/images/authentication/mail-envoye.svg";
import MailSentMobile from "../../public/images/authentication/mailbox.svg";
import Navbar from "../components/layout/Navbar";
import Typed from "react-typed";
export const MailSent = () => {
  return (
    <div className="bg-gradient-to-r from-[#395143] to-[#A79629] relative w-screen overflow-hidden h-screen flex flex-col items-center lg:justify-center lg:grid lg:grid-cols-[60%,40%]">
      <div className="h-full w-full hidden lg:flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:pl-[10%] xl:px-[70px] xl:pl-[90px] justify-start items-center ">
        <div className="flex items-center justify-start h-[10%] w-full">
          <div>Logo</div>
          <div>Websitename</div>
        </div>
        <div className="w-full text-[#E7E4D5] flex flex-col justify-center items-start h-full z-80">
          <h1 className="z-70 text-[#FFF3B2] font-bold hidden lg:flex text-start font-merryweather  text-5xl xl:text-6xl">
            <Typed typeSpeed={55} strings={["Mail envoyé!"]} />
          </h1>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-2xl leading-[140%] text-start pt-[5%] pb-[8%] lg:text-3xl xl:text-4xl">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
                envoyé
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
              </p>
            )}
          </div>
        </div>
      </div>
      <div className=" absolute lg:relative w-[110px] md:w-[150px] translate-x-[15%] lg:translate-x-0 translate-y-[18%] md:translate-y-[40px] lg:right-[50px] xl:right-[100px] lg:translate-y-[25vh] xl:translate-y-[18vh] h-full lg:w-[100%]">
        {window.innerWidth > 1023 ? (
          <img src={MailSentPic} />
        ) : (
          <img src={MailSentMobile} />
        )}
      </div>
      <div className="lg:hidden items-center h-screen justify-center w-full px-[50px] py-[40px]  lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        <div className="h-[50%] bg-[#E7E4D5]  w-[90vw] lg:hidden flex flex-col items-center justify-center  md:pt-[20px] lg:pt-0 rounded-[10px] md:rounded-[17px]">
          <h1 className="text-[28px] md:text-[36px] font-bold font-merryweather text-[#1D3A35]">
            <Typed typeSpeed={55} strings={["Lien envoyé!"]} />
          </h1>
          <p className="flex lg:hidden flex-col text-[18px] sm:text-[24px] px-[20px] sm:px-[60px] pt-[50px]">
            Vérifiez votre courriel et cliquez sur le lien qui vous a été
            envoyé.
          </p>
        </div>
      </div>
    </div>
  );
};
