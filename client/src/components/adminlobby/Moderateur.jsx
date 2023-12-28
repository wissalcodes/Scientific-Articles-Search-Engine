import React, { useState, useEffect } from "react";

export const Moderateur = ({ moderateur }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: moderateur.name,
    username: moderateur.username,
    email: moderateur.email,
  });

  const deleteModerator = async () => {
    // const response = await axios.delete(moderatorURL, {})
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log(editedValues);
    // Simulate updating UI
    setIsEditing(false);
    // try {
    //   const response = await axios.put(yourUpdateEndpoint, {
    //     name: editedValues.name,
    //     username: editedValues.username,
    //     email: editedValues.email,
    //   });
    //   // Handle successful response (e.g., update state or UI)
    //   console.log("Update success:", response.data);
    // } catch (error) {
    //   // Handle error (e.g., display an error message)
    //   console.error("Update error:", error);
    // }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Log editedValues for debugging
  }, [editedValues.email | editedValues.name | editedValues.username]);

  return (
    <div className="lg:px-[20px] w-full text-black lg:text-[#E7E4D5] py-[20px] lg:py-[10px] h-[80px] grid grid-cols-[40%,60%] lg:grid-cols-[1fr,2fr,2fr,2fr,1.5fr,1.5fr]">
      <div className="lg:block hidden w-[50px] h-[50px] rounded-full bg-black">
        <img src={moderateur.imgUrl} />
      </div>
      <div
        key={`name-${Date.now()}`}
        className="w-full h-full hidden lg:flex justify-center items-center">
        {isEditing ? (
          <input
            className="flex w-full focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
            type="text"
            name="name"
            value={editedValues.name}
            onChange={handleInputChange}
          />
        ) : (
          editedValues.name
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
            className="bg-[#E7E4D5]  text-[#395143] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px]  lg:px-[10px] xl:px-[40px] py-[5px] lg:py-[10px] max-w-[120px] lg:max-w-[800px]"
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
