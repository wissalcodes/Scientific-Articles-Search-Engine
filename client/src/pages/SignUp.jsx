import React, { useState, useEffect } from "react";
import RegisterNav from "../components/layout/RegisterNav";
import SignUpIllustration from "../../public/images/authentication/sign-up-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
import ErrorMessage from "../components/authentication/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignIn = () => {
  //auth token
  const [token, setToken] = useState("token");

  // fields variables
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // error messages states
  const [mailerrorMsg, setmailErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastNameerrorMsg, setLastNameErrorMsg] = useState("");
  const [firstNameerrorMsg, setFirstNameErrorMsg] = useState("");
  const [usernameerrorMsg, setusernameErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // user object
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    // clean up the error messages variables
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
        const response = await axios.post("http://127.0.0.1:5000/auth/signup", {
          email: email,
          password: password,
          last_name: lastName,
          first_name: firstName,
          username: username,
        });
        if (response.status === 201) {
          try {
            // call the POST api for sign in
            const response = await axios.post(
              "http://127.0.0.1:5000/auth/signin",
              {
                email,
                password,
              }
            );
            if (response.status === 200) {
              const token = response.data.access_token;
              const refreshToken = response.data.refresh_token;

              // Store tokens securely (e.g., in cookies or localStorage)
              Cookies.set("authToken", token, {
                expires: 7,
              });
              Cookies.set("refreshToken", refreshToken, {
                expires: 7,
              });
              setToken();

              // get the user's information
              const userResponse = await axios.get(
                "http://127.0.0.1:5000/auth/redirect",
                {
                  headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                  },
                }
              );
              setUser(userResponse.data);
              console.log("Successful sign-in ", response.data);
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
          navigate("/user_lobby");
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
    <div className="w-screen lg:h-screen relative bg-[#E7E4D5] lg:bg-gradient-to-r lg:from-[#395143] lg:to-[#A79629] ">
      <RegisterNav />
      <div className="w-screen text-sm lg:text-md xl:text-xl lg:h-screen flex flex-col lg:grid lg:grid-cols-[55%,45%] xl:grid-cols-2">
        <div className="h-full pb-[20px] lg:py-0 w-full  items-center lg:items-center justify-center flex flex-col">
          <div className="px-[20px]  flex bg-[#E7E4D5] w-full sm:w-[70%] md:w-[70%] lg:w-[90%]  lg:rounded-[15px] flex-col lg:px-[50px] xl:px-[40px] py-[20px] lg:pt-[20px] justify-center items-center">
            <div className="w-[90%] flex flex-col justify-start items-start">
              <h1 className="text-[#152522] -translate-x-[30px] w-[150%] text-start hidden lg:block font-semibold font-merryweather text-lg lg:text-3xl xl:text-4xl">
                Inscrivez-vous maintenant !
              </h1>
              <ErrorMessage message={lastNameerrorMsg} />
            </div>
            <div className="w-full h-full grid-cols-2 grid gap-[10px]">
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px]  lg:pt-[20px] flex  justify-start items-start">
                  <h1 className="lg:pt-0 text-sm font-semibold font-merryweather text-[#395143]">
                    NOM
                  </h1>
                </div>
                <div className="w-full drop-shadow flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
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
                  <h1 className=" lg:pt-0 text-sm  font-semibold font-merryweather text-[#395143]">
                    PRENOM
                  </h1>
                  <ErrorMessage message={firstNameerrorMsg} />
                </div>
                <div className="w-full drop-shadow flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
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
                    <h1 className="font-semibold text-sm  font-merryweather text-[#395143]">
                      E-MAIL
                    </h1>
                    <ErrorMessage message={mailerrorMsg} />
                  </div>
                  <div className="w-full flex drop-shadow bg-[white] px-[20px] py-[9px] rounded-[10px]">
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
                    <h1 className=" lg:pt-0 text-sm  font-semibold font-merryweather text-[#395143]">
                      USERNAME
                    </h1>
                    <ErrorMessage message={usernameerrorMsg} />
                  </div>
                  <div className="w-full flex drop-shadow bg-[white] px-[20px] py-[9px] rounded-[10px]">
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
                <h1 className="font-semibold text-sm font-merryweather text-[#395143]">
                  MOT DE PASSE
                </h1>
                <ErrorMessage message={errorMsg} />
              </div>
              <div className="relative drop-shadow w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
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
                <h1 className="font-semibold text-sm  font-merryweather text-[#395143]">
                  CONFIRMATION MOT DE PASSE
                </h1>
              </div>
              <div className="relative drop-shadow w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                <input
                  className="focus:outline-none  w-[90%] focus:border-transparent text-[20px] bg-transparent pr-[10px]"
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
                    className="text-sm lg:text-md xl:text-lg  py-[3px] xl:py-[4px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                    S'INSCRIRE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:bg-none bg-gradient-to-r from-[#395143] to-[#A79629] h-[40vh] w-full  flex flex-col items-center rounded-b-[20px] lg:rounded-[0px] justify-center">
          <img
            className="mt-[44px] sm:mt-[80px] lg:mt-0 w-[70%] lg:w-[60%] h-[60%]"
            src={SignUpIllustration}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
