import React from "react";

const Contact = () => {
  const handleSendMail = () => {
    alert("Send mail");
  };
  return (
    <div className=" w-full md:grid md:grid-cols-2 pt-[70px] pb-[100px]">
      <div className="w-full h-full flex flex-col items-center md:items-start justify-center">
        <h1 className="xl:text-[40px] lg:text-[30px] font-light text-[24px]">
          Contactez-nous
        </h1>
        <div className="w-full text-white  font-light flex items-center md:items-start flex-col h-[80px] justify-center">
          <button
            onClick={handleSendMail}
            className="bg-[#4b4a4a] px-[10px] rounded-[15px] h-[50px] w-[70%] md:w-[35%]">
            Envoyer un e-mail
          </button>
        </div>
        <p className="font-light text-[20px]">
          Ou bien retrouvez-nous sur les medias
        </p>
      </div>
      <div className="w-full hidden md:flex justify-center items-center md:justify-end md:items-end">
        <div className="w-[150px] h-[150px] bg-[gray] rounded-[15px]"></div>
      </div>
    </div>
  );
};
export default Contact;
