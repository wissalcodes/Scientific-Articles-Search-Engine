import React, { useState } from 'react';

 import closeIcon from '../image/Vector.png';// Replace with the correct path to your image

 const PopoutArticle = () => {
    const [isContainerOpen, setIsContainerOpen] = useState(true);
  
    const articleData = {
      title: "Exploring the Wonders of Quantum Computing",
      description: `
        In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds.
  
        Quantum Bits: The Building Blocks of Quantum Computing
        At the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.
        
        Entanglement: Quantum Computing's Secret Sauce
        Entanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.
        
        Quantum Supremacy: A Milestone Achieved
        In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.
        
        Applications Across Industries
        Molecular interactions could significantly accelerate the identification of new drugs and materials.
      `,
      pdfUrl: "https://example.com/pdf"
    };
  
    const handleCloseClick = () => {
      setIsContainerOpen(false);
    };
    
    const handleUpload = () => {
      // Handle the search button click
      // ...
    };
  
    return (
      <>
        {isContainerOpen && (

      <div> 
        <div className="bg-[#BEB9A1] w-[90%] lg:w-[40%]  md:min-h-[70vh] min-h[70dvh]    flex flex-col justify-center  mx-[5%] mt-[9rem] lg:mx-auto  lg:mt-[10%] lg:mb-[10%] px-4 lg:px-8 lg:py-7 rounded-[20px] relative">
          <img src={closeIcon} alt="Close Icon" className="absolute top-0 right-0 cursor-pointer " style={{ width: '16px', height: '15px', marginRight: '14px', marginTop: '15px' }} onClick={handleCloseClick} />
          <div className="grid-cols-1 gap-[20px] lg:grid-cols-[5fr,1fr,1fr] grid">
            <div className="flex items-center">
              <h1 className="text-black font-merriweather text-xl lg:text-2xl text-left mt-5 ml-5 font-semibold">
                Title: {articleData.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4 mr-[2rem]">
            <div className=' justify-center items-center bg-[#395143] flex-shrink-0 p-3 rounded-md transform transition-transform duration-200 ease-in-out hover:scale-110 lg:flex hidden' >
               <button
                onClick={handleUpload}
                className="text-[#E7E4D5] text-md font-semibold">Ajouter aux Favoris
              </button>
            </div>  
             <div className='justify-center items-center bg-[#395143] flex-shrink-0 p-3 rounded-md transform transition-transform duration-200 ease-in-out hover:scale-110 lg:flex hidden' >
              <button
               onClick={handleUpload}
               className="text-[#E7E4D5] text-md font-semibold ">Voir PDF
              </button>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto p-4 h-[500px] text-black font-lora text-xl font-normal text-left ml-0 ">
            {articleData.description}
          </div>
        </div>
      <div className="flex items-center space-x-4 ml-[8rem] mt-[1rem]  ">
        <div className=' justify-center items-center bg-[#395143] flex-shrink-0 p-3 rounded-md transform transition-transform duration-200 ease-in-out hover:scale-110 lg:hidden flex' >
           <button
            onClick={handleUpload}
            className="text-[#E7E4D5] text-md font-semibold">Ajouter aux Favoris
          </button>
        </div>  
         <div className='justify-center items-center bg-[#395143] flex-shrink-0 p-3 rounded-md transform transition-transform duration-200 ease-in-out hover:scale-110 lg:hidden flex ' >
          <button
           onClick={handleUpload}
           className="text-[#E7E4D5] text-md font-semibold ">Voir PDF
          </button>
          </div>
        </div> 
       </div>

      )}
    </>
  );
};



  export default PopoutArticle;