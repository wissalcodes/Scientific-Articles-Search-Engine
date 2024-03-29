import MailSentPic from "../../public/images/authentication/mail-envoye.svg";
import MailSentMobile from "../../public/images/authentication/mailbox.svg";
import Typed from "react-typed";
import AuthNavbar from "../components/layout/AuthNavbar";

// component to be redirected to when the user wants to reset their password
export const MailSent = () => {
  return (
    <div className="bg-gradient-to-r from-[#395143] to-[#A79629] relative w-screen overflow-hidden h-screen flex flex-col items-center lg:justify-center lg:grid lg:grid-cols-[45%,55%] xl:grid-cols-[50%,50%]">
      <AuthNavbar />
      {/* Hidden in small screens  */}
      <div className="h-full w-full hidden lg:flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:px-[50px]  xl:px-[70px] xl:pl-[90px] justify-start items-center ">
        <div className="w-full text-[#E7E4D5] flex flex-col justify-center items-start h-full z-80">
          <h1 className="z-70 text-[#FFF3B2] font-bold hidden lg:flex text-start font-merryweather text-lg lg:text-4xl xl:text-5xl">
            <Typed typeSpeed={55} strings={["Mail envoyé!"]} />
          </h1>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-2xl leading-[140%] font-merryweather text-start pt-[5%] pb-[8%] lg:text-2xl xl:text-4xl">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
                envoyé
              </p>
            ) : (
              <p className="w-full flex font-merryweather text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Vérifiez votre courriel et cliquez sur le lien qui vous a été
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="  absolute lg:relative w-[110px] md:w-[150px] translate-x-[15%] lg:translate-y-0 lg:translate-x-0 translate-y-[18%] flex flex-col justify-center items-center h-full lg:w-[80%] xl:w-[70%]">
        {window.innerWidth > 1023 ? (
          <img src={MailSentPic} />
        ) : (
          <img src={MailSentMobile} />
        )}
      </div>
      {/* Hidden in large screens */}
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
