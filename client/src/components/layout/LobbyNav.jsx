import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../../public/images/dark-logo.svg";

const LobbyNav = () => {
  //get the access token
  const token = Cookies.get("authToken");
  const handleLogOut = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/logout/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log("Logged out successfully");
      } else {
        console.log("Issue when calling the log out endpoint");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-20 grid px-[7%] py-[20px] w-full grid-cols-2 justify-center fixed top-0">
      <div className="w-[150px] lg:w-[200px] flex items-center h-full flex-col justify-center ">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className=" lg:flex flex-col items-end h-full justify-center">
        <p className="text-end font-merryweather font-bold text-[#F4F2E6]">
          <Link
            onClick={handleLogOut}
            to="/sign_in"
            className="text-[#152522] py-[4px] border-b-[4px] border-[#D9C65A] font-merryweather">
            Se deconnecter
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LobbyNav;
