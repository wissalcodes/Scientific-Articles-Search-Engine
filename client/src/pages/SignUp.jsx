import React, { useState, useEffect } from "react";
import RegisterNav from "../components/layout/RegisterNav";
import SignUpIllustration from "../../public/images/authentication/sign-up-illustration.svg";
import { EyeController } from "../components/authentication/EyeController";
import ErrorMessage from "../components/authentication/Error";
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
        // call the POST api
        // const response = await axios.post(
        //   "https://project-platform.onrender.com/api/v1/auth/signIn",
        //   { email, password }
        // );
        // const responseData = response.data;
        // const token = responseData.data.member.memberId;
        // Cookies.set("authToken", token, { expires: 7 }); // Set the cookie to expire in 7 days
        // console.log("Sign-in successful", token);
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.error("Server Error Message:", error.response.data);
          setErrorMsg(error.response.data.message || "Sign-up failed");
        } else {
          setErrorMsg("An error occurred during sign-in");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen relative bg-[#E7E4D5]">
      <RegisterNav />
      <div className="w-screen h-screen flex flex-col lg:grid lg:grid-cols-2">
        <div className="lg:h-full h-[70vh] w-full bg-[#395143] flex flex-col items-center rounded-[20px] lg:rounded-[0px] justify-center">
          <img
            className="mt-[40px] sm:mt-[80px] lg:mt-0 w-[70%] h-[60%]"
            src={SignUpIllustration}
          />
        </div>
        <div className="h-full pb-[30px] lg:py-0 w-full bg-[#E7E4D5] ietms-center justify-center flex flex-col">
          <div className="flex flex-col mx-[30px] md:mx-[80px]  lg:mx-[80px] xl:mx-[150px] justify-center items-center">
            <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-[#152522] hidden lg:block font-semibold font-merryweather text-[24px] lg:text-[40px] xl:text-[50px]">
                S'Inscrire
              </h1>
              <ErrorMessage message={lastNameerrorMsg} />
            </div>
            <div className="w-full h-full grid-cols-2 grid gap-[10px]">
              <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full mb-[5px]  lg:pt-[20px] flex  justify-start items-start">
                  <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
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
            <div className="w-full flex flex-col justify-center items-center ">
              <div className="w-full mb-[5px]  lg:pt-[5px] flex  justify-start items-start">
                <h1 className=" lg:pt-0 font-semibold font-merryweather text-[#395143]">
                  USERNAME
                </h1>
                <ErrorMessage message={usernameerrorMsg} />
              </div>
              <div className="w-full flex bg-[white] px-[20px] py-[9px] rounded-[10px]">
                <input
                  className="font-lora w-[90%] focus:outline-none focus:border-transparent text-[20px] bg-transparent pr-[10px]"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center ">
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
                <div className="lg:w-[50%] w-full flex bg-[#1D3A35] px-[20px] py-[5px] rounded-[10px]">
                  <button
                    onClick={handleSignUp}
                    className="text-[28px] mx-auto font-lora text-[#F1D896] bg-transparent ">
                    S'inscrire
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