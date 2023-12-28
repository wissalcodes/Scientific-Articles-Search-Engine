import React, { useState, useEffect } from "react";
import AuthNavbar from "../components/layout/AuthNavbar";
import SignInIllustration from "../../public/images/authentication/sign-in-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
import ErrorMessage from "../components/authentication/Error";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const SignIn = () => {
  // state variables for the input fields
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // state variable for the error message
  const [errorMsg, setErrorMsg] = useState("");
  // controls whether or not the password is visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // user state variable
  const [user, setUser] = useState(null);

  // Integration function for calling the Sign in API
  const handleSignIn = async () => {
    setErrorMsg("");
    if (email === "") {
      setErrorMsg("E-mail field cannot be empty.");
    } else if (password === "") {
      setErrorMsg("Password field cannot be empty.");
    } else {
      setUser({
        email: email,
        password: password,
      });
      try {
        // call the POST api for sign in
        const response = await axios.post("http://localhost:5000/auth/signin", {
          email,
          password,
        });
        if (response.status === 200) {
          const token = response.data.access_token;

          // Set the token in a secure HTTP-only cookie
          Cookies.set("authToken", token, {
            expires: 7,
            secure: true,
            httpOnly: true,
          });

          console.log("Successful sign in ", response.data);
        } else {
          console.log("Failed to log in user");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.error("Server Error Message:", error.response.data);
          setErrorMsg(error.response.data.message || "Sign-in failed");
        } else {
          setErrorMsg("An error occurred during sign-in");
        }
      }
    }
  };
  return (
    <div className="w-screen h-screen pb-[10%] lg:mb-0 relative bg-[#E7E4D5] lg:bg-gradient-to-r from-[#395143] to-[#A79629] ">
      <AuthNavbar />
      {/* Displays grid in large screens and a flex in mobiles */}
      <div className="w-screen h-screen flex flex-col lg:grid lg:grid-cols-[45%,55%] xl:grid-cols-2">
        {/* image assets */}
        <div className="hidden h-0 lg:h-full w-full lg:flex flex-col items-center justify-center">
          <img className="w-[70%] h-[70%]" src={SignInIllustration} />
        </div>
        <div className="lg:hidden h-full w-full rounded-b-[20px] bg-gradient-to-r from-[#395143] to-[#A79629] flex flex-col items-center justify-center py-[5%]">
          <img className="w-[80%]  h-[80%]" src={SignInIllustration} />
        </div>
        {/* Sign in form */}
        <div className="h-full  w-full  items-center justify-center flex flex-col">
          <div className="flex bg-[#E7E4D5] w-full lg:w-[80%] lg:rounded-[15px] px-[9%] py-[5%] flex-col  sm:px-[10%]  justify-center items-center">
            <div className="w-full flex justify-start items-start">
              <h1 className="text-[#152522] leading-[120%] hidden lg:block font-semibold font-merryweather text-start text-[24px] lg:text-[40px] xl:text-[50px]">
                Connectez-vous maintenant !
              </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px] pt-[20px] lg:pt-[60px] flex justify items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  E-MAIL
                </h1>
                <ErrorMessage message={errorMsg} />
              </div>
              <div className="w-full drop-shadow flex bg-[white] px-[20px]  py-[10px] lg:py-[15px]  rounded-[10px]">
                <input
                  className="text-[16px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent pr-[10px]"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px] pt-[10px] xl::pt-[30px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full drop-shadow flex bg-[white] px-[20px] py-[10px] lg:py-[15px] rounded-[10px]">
                <input
                  className="text-[16px] focus:outline-none w-[90%] focus:border-transparent  bg-transparent pr-[10px]"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} //update the password state
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController onVisibilityChange={setIsPasswordVisible} />
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-center lg:items-start pt-[40px]">
                <div className="transform transition-transform duration-200 ease-in-out hover:scale-110 lg:w-[60%] xl:w-[60%] w-full drop-shadow flex bg-[#395143] px-[20px] py-[10px] lg:py-[10px] rounded-[10px] lg:mb-[10px] ">
                  <button
                    onClick={handleSignIn}
                    className="text-md lg:text-lg xl:text-xl xl:py-[4px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                    SE CONNECTER
                  </button>
                </div>
                <p className="font-lora text-[#395143] font-semibold pt-[15px] ">
                  <span className="text-[#8C876F]">Mot de passe oublié ? </span>
                  <Link to="/reset_password"> Récupérez-le maintenant !</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
