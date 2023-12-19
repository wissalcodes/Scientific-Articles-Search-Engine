import React, { useState, useEffect } from "react";
import RegisterNav from "../components/layout/RegisterNav";
import SignUpIllustration from "../../public/images/authentication/sign-up-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
import ErrorMessage from "../components/authentication/Error";
import axios from "axios";
import Cookies from "js-cookie";
const SignIn = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [mailerrorMsg, setmailErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastNameerrorMsg, setLastNameErrorMsg] = useState("");
  const [firstNameerrorMsg, setFirstNameErrorMsg] = useState("");
  const [usernameerrorMsg, setusernameErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [user, setUser] = useState(null);
  const handleSignUp = async () => {
    setErrorMsg("");
    setmailErrorMsg("");
    setLastNameErrorMsg("");
    setusernameErrorMsg("");
    if ((lastName === "") | (firstName === "")) {
      setLastNameErrorMsg("Les champs NOM et PRENOM sont obligatoire");
    }
    if (username === "") {
      setusernameErrorMsg("Le champs USERNAME est obligatoire");
    }
    if (email === "") {
      setmailErrorMsg("Le champs E-mail ne peut pas etre vide!");
    } else if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas");
    } else {
      setUser({
        email: email,
        password: password,
        lastName: lastName,
        firstName: firstName,
        username: username,
      });
      console.log(user);
      try {
        // call the POST api for sign up
        const response = await axios.post("http://localhost:5000/auth/signup", {
          email: email,
          password: password,
          last_name: lastName,
          first_name: firstName,
          username: username,
        });
        if (response.status === 201) {
          console.log("Successful sign up ", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          setmailErrorMsg("");
          setLastNameErrorMsg("");
          if (error.response.status === 401) {
            setmailErrorMsg("Adresse mail deja utilisee");
          }
          if (error.response.status === 400) {
            setLastNameErrorMsg("Nom d'utilisateur deja utilise");
          } else {
            console.log("Network error");
          }
        } else {
          setErrorMsg("An error occurred during sign-in");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-[#395143] to-[#A79629] ">
      <RegisterNav />
      <div className="w-screen h-screen flex flex-col lg:grid lg:grid-cols-2">
        <div className="lg:h-full h-[70vh] w-full  flex flex-col items-center rounded-[20px] lg:rounded-[0px] justify-center">
          <img
            className="mt-[44px] sm:mt-[80px] lg:mt-0 w-[70%] h-[60%]"
            src={SignUpIllustration}
          />
        </div>
        <div className="h-full pb-[30px] lg:py-0 w-full  items-start justify-center flex flex-col">
          <div className="flex bg-[#E7E4D5] w-[90%] rounded-[15px] flex-col  xl:px-[40px] py-[20px] lg:py-[5%] justify-center items-center">
            <div className="w-[90%] flex flex-col justify-start items-start">
              <h1 className="text-[#152522] w-[50vw] text-start hidden lg:block font-semibold font-merryweather text-[24px] lg:text-[40px] xl:text-[44px]">
                Inscrivez-vous maintenant !
              </h1>
              <ErrorMessage message={lastNameerrorMsg} />
            </div>
            <div className="w-full h-full grid-cols-2 grid gap-[10px]">
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px]  lg:pt-[20px] flex  justify-start items-start">
                  <h1 className="lg:pt-0 font-semibold font-merryweather text-[#395143]">
                    NOM
                  </h1>
                </div>
                <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                  <input
                    className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px]  lg:pt-[20px] flex  justify-start items-start">
                  <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                    PRENOM
                  </h1>
                  <ErrorMessage message={firstNameerrorMsg} />
                </div>
                <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                  <input
                    className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center "></div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full h-full grid-cols-[60%,40%] grid gap-[10px]">
                <div className="w-full">
                  <div className="w-full mb-[5px] pt-[10px]  lg:pt-[15px] flex justify-start items-start">
                    <h1 className="font-semibold font-merryweather text-[#395143]">
                      E-MAIL
                    </h1>
                    <ErrorMessage message={mailerrorMsg} />
                  </div>
                  <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                    <input
                      className="font-lora w-[90%] text-[16px] focus:outline-none focus:border-transparent  bg-transparent pr-[10px]"
                      type="e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full pr-[10px]">
                  <div className="w-full mb-[5px] pt-[10px] lg:pt-[15px] flex justify-start items-start">
                    <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                      USERNAME
                    </h1>
                    <ErrorMessage message={usernameerrorMsg} />
                  </div>
                  <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                    <input
                      className="font-lora w-[90%] text-[16px] focus:outline-none focus:border-transparent  bg-transparent pr-[10px]"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px] pt-[10px]  lg:pt-[15px] flex  justify-start items-start">
                <h1 className="font-semibold  font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
                <ErrorMessage message={errorMsg} />
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                <input
                  className="focus:outline-none w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController onVisibilityChange={setIsPasswordVisible} />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px]  pt-[10px] lg:pt-[15px] flex flex-col justify-center items-start">
                <h1 className="font-semibold font-merryweather text-[#395143]">
                  CONFIRMATION MOT DE PASSE
                </h1>
              </div>
              <div className="relative w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                <input
                  className="focus:outline-none w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute right-[16px] lg:right-[16px]">
                  <EyeController
                    onVisibilityChange={setIsConfirmPasswordVisible}
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-center items-start pt-[20px]">
                <div className=" bg-[#395143] transform transition-transform duration-200 ease-in-out hover:scale-110 lg:w-[50%] w-full flex px-[20px] py-[5px] rounded-[10px]">
                  <button
                    onClick={handleSignUp}
                    className="text-[24px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                    S'INSCRIRE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
