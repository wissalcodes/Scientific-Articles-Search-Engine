/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Edit from "../../../public/images/moderator/edit.svg";
import x from "../../../public/images/admin/x.svg";
import save from "../../../public/images/moderator/save.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { pdfjs } from "react-pdf";
// Core viewer
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { Document, Page } from "react-pdf";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const ModerateArticlePopout = ({ onClose, article }) => {
  // retrieve access token
  const token = Cookies.get("authToken");

  // for PDF viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  // State for each section
  const [title, setTitle] = useState(article.source.title);
  const [resume, setResume] = useState(article.source.abstract);
  const [authors, setauthors] = useState(article.source.authors);
  const [institutions, setInstitutions] = useState(article.source.institutions);
  const [keywords, setkeywords] = useState(article.source.keywords);
  const [references, setreferences] = useState(article.source.references);
  const [text, setText] = useState(article.source.article);

  // for displaying the article PDF
  const [url, setUrl] = useState(article.source.url);

  // State to track the editing mode for each section
  const [isEditing, setIsEditing] = useState({
    title: false,
    resume: false,
    authors: false,
    institutions: false,
    keywords: false,
    references: false,
    text: false,
  });

  const handleDeleteArticle = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/moderator_dashboard/articles/moderate/${article.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        console.log("article deleted successfully");
      } else {
        console.log("failed to delete article");
      }
    } catch (error) {
      console.log(error);
    }
    alert("delete article");
  };

  // Create new plugin instance for the PDF package
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleSeePDF = () => {
    alert(url);
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

  const handleModerateArticle = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/moderator_dashboard/articles/moderate/${article.id}`,
        {
          title: title,
          authors: authors,
          institutions: institutions,
          abstract: resume,
          keywords: keywords,
          text: article,
          references: references,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        console.log("article moderated successfully");
      } else {
        console.log("failed to moderate article");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-20 drop-shadow px-[20px] pb-[40px] py-[20px] lg:py-[30px] lg:pb-[70px] lg:px-[60px] flex flex-col rounded-[12px] lg:rounded-[40px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-[87%] xl:w-[85%] h-[80vh] bg-[#BEB9A1]">
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      {/* Validate button, when clicked posts the data to the API endpoint */}
      <div className="absolute bottom-[10px] lg:bottom-[20px] right-[10px] lg:right-0  items-center w-[30%] justify-start">
        <button
          onClick={handleModerateArticle}
          className="bg-gradient-to-r from-[#395143] to-[#AF9A27] mt-[4px] text-[#E7E4D5] py-[7px] lg:py-[10px] transform transition-transform duration-200 ease-in-out hover:scale-105 rounded-[10px] h-[80%] w-full max-w-[150px] lg:w-[95%] xl:w-[70%]">
          Valider
        </button>
      </div>
      {/* Delete button, when clicked deletes the articles, in case there's a lot of errors in the data extraction result */}
      <div className="text-[#E7E4D5] gap-[15px] text-xsm lg:text-lg xl:text-xl justify-end flex w-full">
        <button
          onClick={handleDeleteArticle}
          className="bg-[#DC7163A6] rounded-[8px] lg:rounded-[15px] px-[10px] lg:px-[20px] py-[8px]">
          Supprimer l'article
        </button>
        {/* See PDF button, when clicked opens the PDF file for the article */}
        <button
          onClick={handleSeePDF}
          className="bg-[#395143] rounded-[8px] lg:rounded-[15px] px-[10px]  lg:px-[20px] py-[8px]">
          Voir le PDF
        </button>
        <div className="w-[3%] flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid */}
      <div className="overflow-x-hidden px-[0px] gap-[20px] mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[80%]">
        {/* article title section*/}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Titre</h1>
          {isEditing.title ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSave("title")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEdit("title")}
            />
          )}
          {isEditing.title ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" text-center flex focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C]"
              />
              <button
                onClick={() => handleSave("title")}
                className="hidden lg:block w-[15px] lg:w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{title}</h1>
              <img
                className="hidden lg:block w-[15px] lg:w-[25px]"
                src={Edit}
                onClick={() => handleEdit("title")}
              />
            </>
          )}{" "}
        </div>
        {/* article resume section*/}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Résumé</h1>
          {isEditing.resume ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSave("resume")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEdit("resume")}
            />
          )}
          {isEditing.resume ? (
            <>
              <input
                type="text"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="text-start flex focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
              />
              <button
                onClick={() => handleSave("resume")}
                className="hidden lg:block w-[15px] lg:w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{resume}</h1>
              <img
                className="hidden lg:block w-[15px] lg:w-[25px]"
                src={Edit}
                onClick={() => handleEdit("resume")}
              />
            </>
          )}{" "}
        </div>
        {/* article authors section */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">authors</h1>
          {isEditing.authors ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSaveArrayElement("authors")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("authors")}
            />
          )}
          {isEditing.authors ? (
            <div className="w-full flex">
              {authors.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedauthors = [...authors];
                      updatedauthors[index] = e.target.value;
                      setauthors(updatedauthors);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {authors.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.authors ? (
            <img
              className="hidden lg:block w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("authors")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("authors")}
              className="hidden lg:block w-[15px] lg:w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article Institutions section */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">
            Institutions
          </h1>
          {isEditing.institutions ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSaveArrayElement("institutions")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("institutions")}
            />
          )}
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
              className="hidden lg:block w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("institutions")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("institutions")}
              className="hidden lg:block w-[15px] lg:w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article keywords section */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Mots cles</h1>
          {isEditing.keywords ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSaveArrayElement("keywords")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("keywords")}
            />
          )}
          {isEditing.keywords ? (
            <div className="w-full flex">
              {keywords.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedkeywords = [...keywords];
                      updatedkeywords[index] = e.target.value;
                      setkeywords(updatedkeywords);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {keywords.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.keywords ? (
            <img
              className="hidden lg:block w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("keywords")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("keywords")}
              className="hidden lg:block w-[15px] lg:w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article references section */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">
            Références bibliographique
          </h1>
          {isEditing.references ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSaveArrayElement("references")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("references")}
            />
          )}
          {isEditing.references ? (
            <div className="w-full flex">
              {references.map((a, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={a}
                    onChange={(e) => {
                      const updatedreferences = [...references];
                      updatedreferences[index] = e.target.value;
                      setreferences(updatedreferences);
                    }}
                    className="mr-[5px] text-center flex max-w-[180px] focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C] "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap w-full">
              {references.map((a, index) => (
                <h1 className="pr-[20px] text-start" key={index}>
                  <p key={index} className=" text-start">
                    {a},
                  </p>
                </h1>
              ))}
            </div>
          )}
          {!isEditing.references ? (
            <img
              className="hidden lg:block w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEditArrayElement("references")}
            />
          ) : (
            <button
              onClick={() => handleSaveArrayElement("references")}
              className="hidden lg:block w-[15px] lg:w-[25px]">
              <img src={save} />
            </button>
          )}
        </div>
        {/* article text section */}
        <div className="w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap lg:grid lg:grid-cols-[12%,78%,10%] gap-[15px]">
          <h1 className="font-bold text-start font-merryweather">Texte</h1>
          {isEditing.text ? (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={save}
              onClick={() => handleSave("text")}
            />
          ) : (
            <img
              className="lg:hidden w-[15px] lg:w-[25px]"
              src={Edit}
              onClick={() => handleEdit("text")}
            />
          )}
          {isEditing.text ? (
            <>
              <textarea
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className=" flex  focus:outline-none focus:border-transparent bg-[#E7E4D5] text-[#56695C]  h-[250px] px-[10px] text-start"
              />
              <button
                onClick={() => handleSave("text")}
                className="hidden lg:block w-[15px] lg:w-[25px]">
                <img src={save} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-start">{text}</h1>
              <img
                className="hidden lg:block w-[15px] lg:w-[25px]"
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
