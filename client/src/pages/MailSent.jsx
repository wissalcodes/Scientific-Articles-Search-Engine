import React from "react";
import MailSentPic from "../../public/images/authentication/mail-envoye.svg";
import MailSentMobile from "../../public/images/authentication/mailbox.svg";

export const MailSent = () => {
  return (
    <div className="bg-[#E7E4D5] relative w-screen overflow-hidden h-screen flex flex-col items-center lg:grid lg:grid-cols-[40%,60%]">
      <div className="absolute w-[110px] md:w-[150px] translate-x-[15%] lg:translate-x-0 translate-y-[40px] md:translate-y-[40px] lg:left-[50px] xl:left-[100px] lg:translate-y-[25vh] xl:translate-y-[18vh] h-full lg:w-[500px] xl:w-[720px]">
        {window.innerWidth > 1023 ? (
          <img src={MailSentPic} />
        ) : (
          <img src={MailSentMobile} />
        )}
      </div>
      <div className="lg:h-full items-center h-screen justify-start w-full px-[50px] py-[40px] lg:bg-[#BEB9A1] lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        <div className="flex items-center justify-start h-[10%] w-full">
          <div>Logo</div>
          <div>Websitename</div>
        </div>
        <div className="h-[60vh]  w-[90vw] lg:hidden flex flex-col items-center bg-[#BEB9A1] justify-start pt-[80px] md:pt-[100px] lg:pt-0 rounded-[10px] md:rounded-[17px]">
          <h1 className="text-[36px] font-bold font-merryweather text-[#1D3A35]">
            Lien Envoye!
          </h1>
          <p className="flex lg:hidden flex-col text-[20px] sm:text-[24px] px-[20px] sm:px-[60px] pt-[50px]">
            Vérifiez votre courriel et cliquez sur le lien qui vous a été
            envoyé.
          </p>
        </div>
      </div>
      <div className="h-full w-full hidden lg:flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:pl-[130px] xl:px-[200px] justify-start items-center bg-[#E7E4D5]">
        <div className="w-full flex flex-col justify-center items-start h-full z-80">
          <h1 className="z-70 text-[#395143] font-bold hidden lg:flex text-start font-merryweather  text-[42px] xl:text-[64px]">
            Mail envoyé!
          </h1>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-[27px] text-start pt-[5%] pb-[8%] lg:text-[32px] xl:text-[40px]">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
                envoyé
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
                envoyé{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
