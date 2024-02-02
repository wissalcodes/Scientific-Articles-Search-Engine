import { useState } from "react";
import MDPOublie from "../../public/images/authentication/mdps-oublie.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthNavbar from "../components/layout/AuthNavbar";
import Cookies from "js-cookie";
export const PasswordRecovery = () => {
  // e-mail input field
  const [email, setEmail] = useState("");
  // to navigate between routes
  const navigate = useNavigate();

  const handleResetMail = async () => {
    if (email != "") {
      try {
        // call the POST api for password recovery
        const response = await axios.post(
          "http://localhost:5000/forgot_password/",
          {
            email,
          }
        );
        if (response.status >= 200 && response.status < 300) {
          console.log(
            "Successfully sent request to reset pass ",
            response.data
          );
          // save the e-mail adress in cookies
          Cookies.set("email", email);
          // navigate to the mail sent page
          navigate("/mail_sent");
        } else {
          console.log("Failed to request reset link");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.error("Server Error Message:", error.response.data);
        } else {
          console.log("An error occurred during mail sending");
        }
      }
    }
  };

  return (
    // main container, displays a grid in large screens and a flex in mobiles
    <div className="bg-[#E7E4D5] relative w-screen overflow-hidden h-screen lg:grid lg:grid-cols-[40%,60%] xl:grid-cols-[35%,65%] items-center justify-center">
      <AuthNavbar inv={true} />
      <div className="h-[55vh] lg:h-full w-full px-[50px] py-[40px] bg-[#395143] lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        <div className="flex h-full w-full justify-center items-center flex-col">
          <img
            className="lg:fixed left-0 top-1/2 lg:-translate-y-1/2 lg:w-[500px] xl:w-[650px] w-[400px]"
            src={MDPOublie}
          />
        </div>
      </div>
      {/* div conatining the e-mail input and button */}
      <div className="h-full w-full flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:px-[80px] xl:px-[120px] justify-start lg:justify-center items-center bg-[#E7E4D5]">
        <div className="w-full h-full lg:flex flex-col items-center justify-center z-80">
          <h1 className="z-70 text-[#395143] font-bold hidden lg:flex text-start font-merryweather text-4xl xl:text-5xl">
            Vous avez oublié votre mot de passe ?
          </h1>
          <div className="flex w-full ">
            {/* In large screens */}
            {window.innerWidth > 1023 ? (
              <p className="w-full flex  text-md lg:text-xl xl:text-2xl pt-[5%] pb-[20px] ">
                E-mail associé à ce compte
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                E-mail
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[15px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . ."
              value={email}
              onChange={(e) => setEmail(e.target.value)} //update the e-mail state variable
            />
          </div>
          <div className="lg:pt-[40px] pt-[20px] xl:pt-[54px] w-full flex items-end justify-end">
            <div className="transform transition-transform duration-200 ease-in-out hover:scale-110 lg:w-[30%] w-full flex bg-gradient-to-r from-[#395143] to-[#A79629] px-[20px] py-[5px] rounded-[10px] ">
              <button
                onClick={handleResetMail}
                className="text-md lg:text-lg xl:text-2xl mx-auto font-lora text-[#F1D896] bg-transparent ">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
