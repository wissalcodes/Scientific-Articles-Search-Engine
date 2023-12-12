import React, { useState, useEffect } from "react";
import AuthNavbar from "../components/layout/AuthNavbar";
import SignInIllustration from "../../public/images/authentication/sign-in-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
import ErrorMessage from "../components/authentication/Error";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState(null);
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
        // const token = responseData.data.member.memberId;
        // Cookies.set("authToken", token, { expires: 7 }); // Set the cookie to expire in 7 days
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

  useEffect(() => {}, [user]);
  return (
    <div className="w-screen h-screen relative bg-[#E7E4D5]">
      <AuthNavbar />
      <div className="w-screen h-screen flex flex-col lg:grid lg:grid-cols-[55%,45%] xl:grid-cols-2">
        <div className="lg:hidden h-[90vh] lg:h-full w-full rounded-[20px] bg-[#395143] flex flex-col items-center justify-center">
          <img className="w-[80%] h-[80%]" src={SignInIllustration} />
        </div>
        <div className="h-full w-full mb-[100px] bg-[#E7E4D5] ietms-center justify-center flex flex-col">
          <div className="flex flex-col mx-[20px] sm:mx-[30px] md:mx-[70px] lg:mx-[100px] justify-center items-center">
            <div className="w-full flex justify-start items-start">
              <h1 className="text-[#152522] hidden lg:block font-semibold font-merryweather text-[24px] lg:text-[40px] xl:text-[50px]">
                Se connecter
              </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px] pt-[20px] lg:pt-[60px] flex justify items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  E-MAIL
                </h1>
                <ErrorMessage message={errorMsg} />
              </div>
              <div className="w-full flex bg-[white] px-[20px]  py-[10px] lg:py-[15px]  rounded-[10px]">
                <input
                  className="text-[16px] font-lora w-[90%] focus:outline-none focus:border-transparent bg-transparent pr-[10px]"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[10px] pt-[10px] lg:pt-[30px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[10px] lg:py-[15px] rounded-[10px]">
                <input
                  className="text-[16px] focus:outline-none w-[90%] focus:border-transparent  bg-transparent pr-[10px]"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController onVisibilityChange={setIsPasswordVisible} />
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-center lg:items-start pt-[40px]">
                <div className="lg:w-[50%] w-full  flex bg-[#1D3A35] px-[20px] py-[3px] lg:py-[10px] rounded-[10px]">
                  <button
                    onClick={handleSignIn}
                    className="text-[25px] lg:text-[32px]  mx-auto font-lora text-[#F1D896] bg-transparent pr-[10px]">
                    Sign in
                  </button>
                </div>
                <p className="font-lora text-[#395143] font-semibold pt-[40px]">
                  <span className="text-[#8C876F]">Mot de passe oublié ? </span>
                  <Link to="/reset_password"> Récupérez-le maintenant !</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden h-full w-full bg-[#395143] lg:flex flex-col items-center justify-center">
          <img className="w-[70%] h-[70%]" src={SignInIllustration} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
