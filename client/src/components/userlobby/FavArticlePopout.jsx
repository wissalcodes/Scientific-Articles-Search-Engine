import x from "../../../public/images/admin/x.svg";

// Favorite Article Popout
export const FavArticlePopout = ({ onClose, article }) => {
  const title = article._source.title;
  console.log(article);
  const text = article._source.article;
  const abstract = article._source.abstract;
  const authors = article._source.authors;
  const institutions = article._source.institutions;
  const keywords = article._source.keywords;
  const references = article._source.references;

  // for displaying the article PDF
  const url = article._source.url;
  const openPdfInNewTab = () => {
    const googleDriveViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
      url
    )}`;
    // open pdf file in another tab
    window.open(googleDriveViewerUrl, "_blank");
  };
  return (
    <div className="z-20 drop-shadow px-[20px] pb-[40px] py-[20px] lg:py-[30px] lg:pb-[40px] lg:px-[60px] flex flex-col rounded-[12px] lg:rounded-[40px] fixed top-1/2 lg:top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2 lg:-translate-x-1/3 lg:-translate-y-[400px] w-[95vw] lg:w-[87%] xl:w-[85vw] h-[80vh] bg-[#BEB9A1]">
      <div className="text-[#E7E4D5] items-center justify-center lg:gap-[15px] text-xsm lg:text-lg xl:text-lg  grid grid-cols-[70%,20%,10%] w-full">
        <div className="w-[100%] text-start font-bold text-black font-merryweather text-sm lg:text-2xl xl:text-3xl flex gap-[15px]">
          {title}
        </div>
        <div className="w-full flex justify-center lg:justify-end">
          {/* See PDF button, when clicked opens the PDF file for the article */}
          <button
            onClick={openPdfInNewTab}
            className="bg-[#395143] w-[80%] rounded-[8px] lg:rounded-[15px] px-[10px]  lg:px-[20px] py-[8px]">
            {window.innerWidth > 1023 ? `Voir PDF` : `PDF`}
          </button>
        </div>
        <div className="w-[10px] lg:w-full flex items-center justify-end">
          <img src={x} onClick={onClose} />
        </div>
      </div>
      {/* grid */}
      <div className="overflow-x-hidden px-[0px] gap-[20px] mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[80%]">
        {/* article authors section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Auteurs
          </div>
          {authors.map((a, index) => (
            <div key={index}>{a}</div>
          ))}
        </div>
        {/* article institutions section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Institutions
          </div>
          {institutions.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
        </div>
        {/* article abstract section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Résumé
          </div>
          {abstract}
        </div>
        {/* article keywords section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Mots clés
          </div>
          {keywords.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
        </div>
        {/* article text section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Texte
          </div>
          {text}
        </div>
        {/* article text section */}
        <div className="text-[black] text-start w-full font-lora text-sm lg:text-lg xl:text-xl  flex flex-wrap px-[20px] gap-[15px]">
          <div className="font-merryweather font-bold text-md lg:text-lg xl:text-xl">
            Références
          </div>
          {references.map((i, index) => (
            <div key={index}>{i}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
