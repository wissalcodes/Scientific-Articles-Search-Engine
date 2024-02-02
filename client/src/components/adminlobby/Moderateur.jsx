import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
export const Moderateur = ({ moderateur }) => {
  //get the access token
  const token = Cookies.get("authToken");

  // track if the admin is editing or not
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    nom: moderateur.last_name,
    prenom: moderateur.first_name,
    username: moderateur.username,
    email: moderateur.email,
  });

  // function for calling the moderator DELETE API to delete moderator
  const deleteModerator = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:5000/admin_dashboard/all_moderators",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: moderateur.id,
          },
        }
      );

      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        console.log("Moderateur supprime avec succes");
      } else {
        console.log("Error deleting moderator");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // if the Edit button is clicked, update editing state
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // function for calling the POST API for updating moderator info
  const handleSaveClick = async () => {
    console.log(editedValues);
    setIsEditing(false);
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/admin_dashboard/all_moderators/${moderateur.id}`,
        {
          first_name: editedValues.prenom,
          last_name: editedValues.nom,
          username: editedValues.username,
          email: editedValues.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        console.log("Moderateur mis-a-jour avec succes");
      } else {
        console.log("Error updating moderator info");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // update the edited values of the fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="lg:px-[20px] w-full text-black lg:text-[#E7E4D5] py-[20px] lg:py-[10px] h-[80px] grid grid-cols-[40%,60%] lg:grid-cols-[1fr,1fr,2fr,2fr,2fr,1.5fr,1.5fr]">
      <div className="lg:block hidden w-[50px] h-[50px] rounded-full bg-black">
        <img src={moderateur.imgUrl} />
      </div>
      <div
        key={`nom-${Date.now()}`}
        className="w-full h-full hidden lg:flex justify-center items-center">
        {isEditing ? (
          <input
            className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
            type="text"
            name="nom"
            value={editedValues.nom}
            onChange={handleInputChange}
          />
        ) : (
          editedValues.nom
        )}
      </div>
      <div
        key={`prenom-${Date.now()}`}
        className="w-full h-full hidden lg:flex justify-center items-center">
        {isEditing ? (
          <input
            className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
            type="text"
            name="prenom"
            value={editedValues.prenom}
            onChange={handleInputChange}
          />
        ) : (
          editedValues.prenom
        )}
      </div>
      <div className="w-full h-full flex justify-start lg:justify-center items-center">
        {isEditing ? (
          <input
            className=" flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
            type="text"
            name="username"
            value={editedValues.username}
            onChange={handleInputChange}
          />
        ) : (
          editedValues.username
        )}
      </div>
      <div className="w-full h-full flex justify-start lg:justify-center  items-center">
        {isEditing ? (
          <input
            className=" flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
            type="text"
            name="email"
            value={editedValues.email}
            onChange={handleInputChange}
          />
        ) : (
          editedValues.email
        )}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {isEditing ? (
          <button
            className="bg-[#E7E4D5] w-full text-[#395143] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px] py-[5px] lg:py-[10px] max-w-[120px] lg:max-w-[800px]"
            onClick={handleSaveClick}>
            Enregistrer
          </button>
        ) : (
          <button
            className="bg-[#E7E4D5] text-[#395143] transform transition-transform lg:w-[90%] duration-200 ease-in-out w-[80%] hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px] py-[5px] lg:py-[10px] max-w-[120px] lg:max-w-[800px]"
            onClick={handleEditClick}>
            Modifier
          </button>
        )}
      </div>
      <div className="w-full h-full flex lg:justify-center justify-end items-center">
        <button
          onClick={deleteModerator}
          className="bg-[#E09A8A] w-[70%] lg:w-full text-[#E7E4D5] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px]  py-[5px] lg:py-[10px] max-w-[120px] lg:max-w-[800px]">
          Supprimer
        </button>
      </div>
    </div>
  );
};
