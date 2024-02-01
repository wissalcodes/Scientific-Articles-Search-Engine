import { useState } from "react";
import { useParams } from "react-router-dom";
import MDPOublie from "../../public/images/authentication/mdps-oublie.svg";
import ErrorMessage from "../components/authentication/Error";
import AuthNavbar from "../components/layout/AuthNavbar";
import axios from "axios";

export const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { token } = useParams();
  console.log(token);

  const handleResetPassword = async () => {
    try {
      // Call the API to reset the password with the new password
      const response = await axios.post(
        `http://127.0.0.1:5000/forgot_password/reset_password/${token}`,
        {
          password: newPassword,
        }
      );
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        console.log("Password reset successful");
      } else {
        console.log("Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    // main content grid
    <div className="bg-[#E7E4D5] relative w-screen overflow-hidden h-screen lg:grid lg:grid-cols-[40%,60%] xl:grid-cols-[30%,70%] items-center justify-center">
      <AuthNavbar />
      <div className="absolute left-[20px] lg:translate-y-[25vh] xl:translate-y-[18vh] h-full w-0 lg:w-[500px] xl:w-[720px]">
        <img src={MDPOublie} />
      </div>
      <div className="h-[55vh] lg:h-full w-full px-[50px] py-[40px] bg-[#BEB9A1] lg:rounded-b-[0px] rounded-b-[30px] flex flex-col">
        <div className="flex h-full justify-center items-center flex-col">
          <img className="w-[400px]" src={MDPOublie} />
        </div>
      </div>
      <div className="h-full w-full flex flex-col px-[20px] sm:px-[70px] md:px-[100px] lg:px-[80px] xl:px-[330px] justify-start items-center bg-[#E7E4D5]">
        <div className="w-full h-full z-80">
          {/* section title */}
          <h1 className="z-70 text-[#395143] font-bold hidden lg:flex text-start font-merryweather lg:pt-[40%] xl:pt-[20%] text-[42px] xl:text-[58px]">
            Reinitialiser le mot de passe
          </h1>
          <ErrorMessage message={errorMsg} />

          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-[27px] pt-[5%] pb-[10px] xl:text-[32px]">
                Nouveau mot de passe
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Nouveau mot de passe
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[15px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder="E-mail..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // update the password state
            />
          </div>
          <div className="flex w-full ">
            {window.innerWidth > 1023 ? (
              <p className="w-full flex text-[27px] pt-[5%] pb-[10px] xl:text-[32px]">
                Confirmer le mot de passe
              </p>
            ) : (
              <p className="w-full flex text-[20px] pt-[5%] pb-[10px] xl:text-[32px]">
                Confirmer le mot de passe
              </p>
            )}
          </div>
          <div className="flex w-full drop-shadow bg-[#EBEFEE] py-[15px] px-[20px] rounded-[8px]">
            <input
              className="w-full focus:outline-none focus:border-transparent  bg-[#EBEFEE]"
              type="text"
              placeholder="E-mail..."
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)} //update confirm password state
            />
          </div>
          <div className="lg:pt-[40px] pt-[20px] xl:pt-[54px] w-full flex items-end justify-end">
            <div className="lg:w-[30%] w-full flex bg-[#395143] px-[20px] py-[5px] rounded-[10px] ">
              <button
                onClick={handleResetPassword}
                className="lg:text-[28px] text-[24px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
