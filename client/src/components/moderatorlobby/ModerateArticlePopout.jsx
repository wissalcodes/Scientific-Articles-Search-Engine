import React, { useState, useEffect } from "react";
import Edit from "../../../public/images/moderator/edit.svg";
import x from "../../../public/images/admin/x.svg";
import save from "../../../public/images/moderator/save.svg";

export const ModerateArticlePopout = ({ onClose, article }) => {
  // State for each section
  const [title, setTitle] = useState(article.title);
  const [resume, setResume] = useState(article.resume);
  const [auteurs, setAuteurs] = useState(article.auteurs);
  const [institutions, setInstitutions] = useState(article.institutions);
  const [motscle, setMotscle] = useState(article.motscle);
  const [refs, setRefs] = useState(article.refs);
  const [text, setText] = useState(article.text);

  // State to track the editing mode for each section
  const [isEditing, setIsEditing] = useState({
    title: false,
    resume: false,
    auteurs: false,
    institutions: false,
    motscle: false,
    refs: false,
    text: false,
  });

  const handleDeleteArticle = async () => {
    /* 
  const response = await axios.delete(url, article)
  */
    alert("delete article");
  };

  const handleSeePDF = () => {
    alert("See pdf");
  };

  const handleEdit = (field) => {
    // Set the corresponding field to editing mode
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSave = (field) => {
    // Save the changes and exit editing mode
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleEditArrayElement = (field) => {
    // Set the editing mode for the entire array
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSaveArrayElement = (field) => {
    // Save the changes to the entire array and exit editing mode
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };
  return (
    <div className="z-20 drop-shadow px-[20px] lg:py-[30px] lg:px-[60px] flex flex-col rounded-[40px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[87%] xl:w-[85%] h-[80vh] bg-[#BEB9A1]">
      <div className="text-[#E7E4D5] gap-[15px] text-sm lg:text-lg xl:text-xl justify-end flex w-full">
        <button
          onClick={handleDeleteArticle}
          className="bg-[#DC7163A6] rounded-[15px] px-[20px] py-[8px]">
          Supprimer l'article
        </button>
        <button
          onClick={handleSeePDF}
          className="bg-[#395143] rounded-[15px] px-[20px] py-[8px]">
          Voir le PDF
        </button>

        <div className="w-[3%] flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid of asset and inputs */}
      <div className="overflow-x-hidden gap-[20px] mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[80%]">
        {/* article title */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Titre</h1>
          {isEditing.title ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" text-center flex focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C]"
              />
              <button onClick={() => handleSave("title")} className="w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{title}</h1>
              <img
                className="w-[25px]"
                src={Edit}
                onClick={() => handleEdit("title")}
              />
            </>
          )}{" "}
        </div>
        {/* article resume */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Résumé</h1>
          {isEditing.resume ? (
            <>
              <input
                type="text"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="text-start flex focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
              />
              <button onClick={() => handleSave("resume")} className="w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{resume}</h1>
              <img
                className="w-[25px]"
                src={Edit}
                onClick={() => handleEdit("resume")}
              />
            </>
          )}{" "}
        </div>
        {/* article auteurs */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Auteurs</h1>
          {isEditing.auteurs ? (
            <div className="w-full flex">
              {auteurs.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedAuteurs = [...auteurs];
                      updatedAuteurs[index] = e.target.value;
                      setAuteurs(updatedAuteurs);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {auteurs.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.auteurs ? (
            <img
              className="w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("auteurs")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("auteurs")}
              className="w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article Institutions */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">
            Institutions
          </h1>
          {isEditing.institutions ? (
            <div className="w-full flex">
              {institutions.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedInstitutions = [...institutions];
                      updatedInstitutions[index] = e.target.value;
                      setInstitutions(updatedInstitutions);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {institutions.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.institutions ? (
            <img
              className="w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("institutions")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("institutions")}
              className="w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article keywords */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Mots cles</h1>
          {isEditing.motscle ? (
            <div className="w-full flex">
              {motscle.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedMotsCle = [...motscle];
                      updatedMotsCle[index] = e.target.value;
                      setInstitutions(updatedMotsCle);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {motscle.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.motscle ? (
            <img
              className="w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("motscle")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("motscle")}
              className="w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article references */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">
            Références bibliographique
          </h1>
          {isEditing.refs ? (
            <div className="w-full flex">
              {refs.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedrefs = [...refs];
                      updatedrefs[index] = e.target.value;
                      setRefs(updatedrefs);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {refs.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.refs ? (
            <img
              className="w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("refs")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("refs")}
              className="w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article text */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl grid grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Texte</h1>
          {isEditing.text ? (
            <>
              <textarea
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className=" flex  focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C]  h-[250px] px-[10px] text-start"
              />
              <button onClick={() => handleSave("text")} className="w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{text}</h1>
              <img
                className="w-[25px]"
                src={Edit}
                onClick={() => handleEdit("text")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};