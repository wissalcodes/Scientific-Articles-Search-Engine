import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDPOublie from "../../public/images/authentication/mdps-oublie.svg";
import ErrorMessage from "../components/authentication/Error";
import AuthNavbar from "../components/layout/AuthNavbar";
import Cookies from "js-cookie";
import axios from "axios";

export const Reset = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { token } = useParams();
  console.log(token);
  const email = Cookies.get("email");
  console.log(email);
  const handleResetPassword = async () => {
    try {
      // Call the API to reset the password with the new password
      const response = await axios.post(
        `http://127.0.0.1:5000/forgot_password/reset_password/${token}`,
        {
          password: newPassword,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        //log user in
        try {
          // call the POST api for sign in
          const response = await axios.post(
            "http://127.0.0.1:5000/auth/signin",
            {
              email: email,
              password: newPassword,
            }
          );
          if (response.status >= 200) {
            const token = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            console.log(token);
            Cookies.set("authToken", token, {
              expires: 7,
            });
            Cookies.set("refreshToken", refreshToken, {
              expires: 7,
            });

            console.log("Successful sign-in ", response.data);
            // get the user's information
            const userResponse = await axios.get(
              "http://127.0.0.1:5000/auth/redirect",
              {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
            );
            if (userResponse.status >= 200 && userResponse.status < 300) {
              navigate("/user_lobby");
            }
          } else {
            console.log("Failed to log in user");
          }
        } catch (error) {
          console.error("Error:", error);
          if (error.response) {
            console.error("Server Error Message:", error.response.data);
            setErrorMsg(
              error.response.data.message ||
                "Les informations que vous avez entrees sont incorrectes!"
            );
          } else {
            setErrorMsg("An error occurred during sign-in");
          }
        }
      } else {
        console.log("Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    // main content grid
    <div className="rounded-b-lg lg:rounded-none relative w-screen overflow-hidden h-screen lg:grid lg:grid-cols-[40%,60%] xl:grid-cols-[40%,60%] items-center justify-center">
      <AuthNavbar inv={true} />
      <div className="h-[55vh] lg:h-full w-full px-[50px] py-[40px]  bg-[#395143] lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        <div className="flex h-full justify-center items-center flex-col">
          <img className="w-[90%]" src={MDPOublie} />
        </div>
      </div>
      <div className="h-full w-full flex flex-col px-[20px] sm:px-[70px] justify-start items-center bg-[#E7E4D5]">
        <div className="w-full flex flex-col items-center justify-center lg:h-full z-80">
          {/* section title */}
          <h1 className="z-70 text-[#395143] w-full font-bold hidden lg:flex text-start font-merryweather  text-md lg:text-3xl xl:text-5xl">
            Réinitialiser le mot de passe
          </h1>
          <ErrorMessage message={errorMsg} />

          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex pt-[5%] pb-[10px] text-md lg:text-xl xl:text-2xl">
                Nouveau mot de passe
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Nouveau mot de passe
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[10px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder=". . . . . . . . . . . . . . ."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // update the password state
            />
          </div>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex pt-[5%] pb-[10px] text-md lg:text-xl xl:text-2xl">
                Confirmer le mot de passe
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Confirmer le mot de passe
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[10px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder=". . . . . . . . . . . . . . ."
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)} //update confirm password state
            />
          </div>
          <div className="lg:pt-[40px] pt-[20px] xl:pt-[54px] w-full flex items-end justify-end">
            <div className="lg:w-[30%] w-full flex bg-[#395143] px-[20px] py-[5px] rounded-[10px] ">
              <button
                onClick={handleResetPassword}
                className="text-md lg:text-2xl xl:text-3xl mx-auto font-lora text-[#F1D896] bg-transparent ">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
