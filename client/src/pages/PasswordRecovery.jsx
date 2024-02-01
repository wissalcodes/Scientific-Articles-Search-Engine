import { useState } from "react";
import MDPOublie from "../../public/images/authentication/mdps-oublie.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
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
        if (response.status === 200) {
          console.log(
            "Successfully sent request to reset pass ",
            response.data
          );
          navigate("/mail_sent");
        } else {
          console.log("Failed to request reset link");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.error("Server Error Message:", error.response.data);
          //  setErrorMsg(error.response.data.message || "Sign-in failed");
        } else {
          //  setErrorMsg("An error occurred during sign-in");
        }
      }
    }
  };

  return (
    // main container, displays a grid in large screens and a flex in mobiles
    <div className="bg-[#E7E4D5] relative w-screen overflow-hidden h-screen lg:grid lg:grid-cols-[40%,60%] xl:grid-cols-[35%,65%] items-center justify-center">
      <div className="h-[55vh] lg:h-full w-full px-[50px] py-[40px] bg-[#395143] lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        {/* Website Logo */}
        <div className="flex items-center justify-start h-[10%] w-full">
          <div>Logo</div>
          <div>Websitename</div>
        </div>
        <div className="flex h-full w-full justify-center items-center flex-col">
          <img
            className="lg:fixed left-0 top-1/2 lg:-translate-y-1/2 lg:w-[600px] xl:w-[650px] w-[400px]"
            src={MDPOublie}
          />
        </div>
      </div>
      {/* div conatining the e-mail input and button */}
      <div className="h-full w-full flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:px-[80px] xl:px-[120px] justify-start lg:justify-center items-center bg-[#E7E4D5]">
        <div className="w-full h-full lg:flex flex-col items-center justify-center z-80">
          <h1 className="z-70 text-[#395143] font-bold hidden lg:flex text-start font-merryweather text-5xl xl:text-5xl">
            Vous avez oublié votre mot de passe ?
          </h1>
          <div className="flex w-full ">
            {/* In large screens */}
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-[27px] pt-[5%] pb-[8%] xl:text-[32px]">
                Entrez l'e-mail associé à ce compte.
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
              placeholder="Entrez l'adresse associee a ce compte"
              value={email}
              onChange={(e) => setEmail(e.target.value)} //update the e-mail state variable
            />
          </div>
          <div className="lg:pt-[40px] pt-[20px] xl:pt-[54px] w-full flex items-end justify-end">
            <div className="transform transition-transform duration-200 ease-in-out hover:scale-110 lg:w-[30%] w-full flex bg-gradient-to-r from-[#395143] to-[#A79629] px-[20px] py-[5px] rounded-[10px] ">
              <button
                onClick={handleResetMail}
                className="lg:text-[28px] text-[24px] mx-auto font-lora text-[#E7E4D5] bg-transparent ">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
