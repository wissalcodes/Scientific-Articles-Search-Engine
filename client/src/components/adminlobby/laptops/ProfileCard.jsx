import React, { useState, useEffect } from "react";
import right from "../../../../public/images/admin/right.svg";
import rightSmall from "../../../../public/images/user/right-small-yellow.svg";
import img from "../../../../public/images/admin/profile.svg";
import ErrorMessage from "../../authentication/Error";
import Edit from "../../../../public/images/moderator/edit2.svg";
import Cookies from "js-cookie";
import axios from "axios";

export const ProfileCard = ({ profile, role }) => {
  //get the access token
  const token = Cookies.get("authToken");
  // when the fields are being edited
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username,
    email: profile.email,
  });

  // API call functions for user
  const toggleEdit = () => {
    setEditing(!editing);
  };
  // function to update the value of the input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSaveClick = async () => {
    // Determine which fields are edited
    const editedFields = {};
    Object.keys(editedValues).forEach((key) => {
      if (editedValues[key] !== profile[key]) {
        editedFields[key] = editedValues[key];
      }
    });

    // Handle saving edited profile information
    setEditing(false);

    // Call updateInfo with the edited fields
    console.log(editedFields);
    await updateInfo(editedFields);
  };
  // control the state of the input fields
  const [message, setMessage] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [showCard, setShowCard] = useState(false);
  const handleCardAnimation = () => {
    setShowCard((prevShowCard) => !prevShowCard);
  };

  // function to POST passwords to the resetting password API endpoint for admin
  const resetPasswordAdmin = async () => {
    try {
      // fetch the admin's personal information
      const response = await axios.post(
        "http://127.0.0.1:5000/admin_dashboard/my_profile",
        {
          old_password: passwordOld,
          new_password: passwordNew,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert("mot de passe MAJ avec succes");
      } else {
        console.log("error updating password");
      }
    } catch (error) {
      alert("Mot de passe incorrect!");
    }
  };

  const resetPasswordModerator = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/moderator_dashboard/my_profile/change_password",
        {
          old_password: passwordOld,
          new_password: passwordNew,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert("mot de passe du moderateur MAJ avec succes");
      } else {
        console.log("error updating password");
      }
    } catch (error) {
      alert("Mot de passe incorrect!");
    }
  };
  const resetPasswordUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user_dashboard/my_profile/change_password",
        {
          old_password: passwordOld,
          new_password: passwordNew,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert("mot de passe de l'utilisateur MAJ avec succes");
      } else {
        console.log("error updating password");
      }
    } catch (error) {
      alert("Mot de passe incorrect!");
    }
  };
  const updateInfo = async (updatedFields) => {
    console.log(updatedFields);
    console.log(token);
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/${
          role === "moderator" ? `moderator` : `user`
        }_dashboard/my_profile/change_infos`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        alert("info updated successfully");
      } else {
        console.log("error updating info");
      }
    } catch (error) {
      alert("error updating infos");
    }
  };

  useEffect(() => {
    setEditedValues({
      first_name: profile.first_name,
      last_name: profile.last_name,
      username: profile.username,
      email: profile.email,
    });
  }, [profile]);
  return (
    <div
      className={`bg-[#F5EAAB]  drop-shadow py-[10px] font-lora rounded-br-[14px] top-1/3 xl:top-1/4 fixed left-0 -translate-y-[20vh] w-[300px] lg:w-[350px] 
        h-[400px]
       transform transition-transform duration-500 ease-in-out ${
         showCard
           ? "translate-x-0"
           : "-translate-x-[300px] lg:-translate-x-[351px]"
       }`}>
      <div className="px-[20px] flex flex-col  items-start h-full w-full">
        <h1 className="z-30 text-[32px] pt-[10px] font-bold font-merryweather">
          Mon Profile
        </h1>
        <p className="py-[10px] font-merryweather text-md lg:text-lg font-bold">
          Information personnelles
        </p>
        <div className="grid grid-cols-[30%,50%,20%] w-full items-center">
          <div className="flex">Prenom</div>
          <div className="flex">
            {editing ? (
              <input
                className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                type="text"
                name="first_name"
                value={editedValues.first_name}
                onChange={handleInputChange}
              />
            ) : (
              <div>{editedValues.first_name}</div>
            )}
          </div>
          {editing ? (
            <button
              className="bg-[#395143] w-full z-40  text-[#E7E4D5] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px]  py-[5px]"
              onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            // Only render the "Edit" image if the username is not "admin"
            profile.username !== "admin" && (
              <img
                onClick={toggleEdit}
                src={Edit}
                alt="Edit"
                className="z-40 w-[20px]"
              />
            )
          )}
        </div>
        <div className="grid grid-cols-[30%,50%,20%] w-full items-center">
          <div className="flex">Nom</div>
          <div className="flex">
            {editing ? (
              <input
                className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                type="text"
                name="last_name"
                value={editedValues.last_name}
                onChange={handleInputChange}
              />
            ) : (
              <div>{editedValues.last_name}</div>
            )}
          </div>
          {editing ? (
            <button
              className="bg-[#395143] w-full z-40  text-[#E7E4D5] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px]  py-[5px]"
              onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            // Only render the "Edit" image if the username is not "admin"
            profile.username !== "admin" && (
              <img
                onClick={toggleEdit}
                src={Edit}
                alt="Edit"
                className="z-40 w-[20px]"
              />
            )
          )}
        </div>
        <div className="grid grid-cols-[30%,50%,20%] w-full items-center">
          <div className="flex">Pseudo</div>
          <div className="flex">
            {editing ? (
              <input
                className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                type="text"
                name="username"
                value={editedValues.username}
                onChange={handleInputChange}
              />
            ) : (
              <div>{editedValues.username}</div>
            )}
          </div>
          {editing ? (
            <button
              className="bg-[#395143] w-full z-40  text-[#E7E4D5] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px]  py-[5px]"
              onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            // Only render the "Edit" image if the username is not "admin"
            profile.username !== "admin" && (
              <img
                onClick={toggleEdit}
                src={Edit}
                alt="Edit"
                className="z-40 w-[20px]"
              />
            )
          )}
        </div>
        <div className="grid grid-cols-[30%,50%,20%] w-full items-center">
          <div className="flex">E-mail</div>
          <div className="flex">
            {editing ? (
              <input
                className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                type="text"
                name="email"
                value={editedValues.email}
                onChange={handleInputChange}
              />
            ) : (
              <div>{editedValues.email}</div>
            )}
          </div>
          {editing ? (
            <button
              className="bg-[#395143] w-full z-40  text-[#E7E4D5] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px]  py-[5px]"
              onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            // Only render the "Edit" image if the username is not "admin"
            profile.username !== "admin" && (
              <img
                onClick={toggleEdit}
                src={Edit}
                alt="Edit"
                className="z-40 w-[20px]"
              />
            )
          )}
        </div>
        <p
          className={`pt-[10%] py-[10px] text-md lg:text-lg font-merryweather font-bold ${
            profile.role !== "moderator" ? "hidden" : ""
          }`}>
          Parametres du compte
        </p>
        <div className={`grid grid-cols-[60%,40%] w-full `}>
          <p className="text-start">Mot de passe</p>
          <div className="border-5 border-b-[1px] border-black flex w-full">
            <input
              className="text-black flex w-full focus:outline-none focus:border-transparent bg-transparent pb-[8px]"
              type="text"
              value={passwordOld}
              onChange={(e) => setPasswordOld(e.target.value)}
              placeholder="....................."
            />
          </div>
        </div>
        <div className={`grid grid-cols-[60%,40%] w-full `}>
          <p className="text-start">Nouveau Mot de passe</p>
          <div className="border-5 border-b-[1px] border-black flex w-full">
            <input
              className="text-black flex w-full focus:outline-none focus:border-transparent bg-transparent pb-[8px]"
              type="text"
              value={passwordNew}
              placeholder="....................."
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          </div>
        </div>
        <div className={`mt-[50px]  w-full justify-end items-end flex `}>
          <ErrorMessage message={message} />
          <button
            onClick={
              profile.username === "admin"
                ? resetPasswordAdmin
                : role === "moderator"
                ? resetPasswordModerator
                : resetPasswordUser
            }
            className="bg-[#152522] text-[#F1D896] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px] px-[10px] xl:px-[40px] py-[5px]">
            Confirmer
          </button>
        </div>
      </div>
      <div className="top-0 flex flex-col absolute h-full right-[0px] translate-x-[35px] lg:translate-x-[45px]">
        <img src={window.innerWidth > 1023 ? right : rightSmall} />
        <button onClick={handleCardAnimation}>
          <img
            className="fixed right-[10px] lg:right-[9px] top-[15px] lg:top-[20px] w-[23px] lg:w-[35px]"
            src={img}
          />
        </button>
      </div>
    </div>
  );
};
