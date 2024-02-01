import logo from "../../../public/images/light-logo.svg";
import { Link } from "react-router-dom";
const AuthNavbar = () => {
  return (
    <div className="px-[30px]  lg:bg-transparent pt-[10px] py-[40px] font-bold top-0  fixed w-full h-[80px] text-[14px] xl:text-[20px] grid-cols-[4fr,1fr] gap-[10px] lg:gap-0 md:grid-cols-[5fr,1.5fr] lg:grid-cols-[7fr,1fr] grid justify-center items-center">
      <div className="w-[150px] lg:w-[200px] flex items-start h-full flex-col justify-center ">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className=" lg:flex flex-col items-center h-full justify-center">
        <p className="font-merryweather text-[#F4F2E6]">
          <Link
            to="/sign_up"
            className="text-[#F4F2E6]  border-b-[4px] border-[#395143] font-merryweather">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthNavbar;
