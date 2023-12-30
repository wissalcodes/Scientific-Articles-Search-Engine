import React, { useState } from "react";
import { ProfileCard } from "../components/adminlobby/laptops/ProfileCard";
import { ProfileSection } from "../components/adminlobby/mobile/ProfileSection";
import LobbyNav from "../components/layout/LobbyNav";
import { Article } from "../components/moderatorlobby/Article";
import "../styles/globals.css";
export const ModeratorLobby = () => {
  // current admin profile
  const [profile, setProfile] = useState({
    firstName: "meow",
    lastName: "meow",
    pseudo: "meow",
    email: "meow@gmail.com",
  });

  const articles = [
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      date: "20/30/2023",
      resume:
        "popo on kaki popo kakalant kokokkokokookokokookokefh slifguqzenyfuiqzeybfuiezybdfv zeyfieudsbfiueydfniedsfinuzeo, iflusdjfoinlzeilufniodsfu heiuzbfyoizefsubienfoiezfune oifunozeifuiezfneiofnu zeioffsfihfoimzyfzbyfiusbfiunfiousnff",
      url: "hahahahhaha.pdf",
      auteurs: ["boubout mamat", "mimiw", "mimus", "tchat"],
      institutions: ["boubout mamat", "mimiw", "mimus", "tchat"],
      motscle: ["mimiw", "mimus", "bchbouchet"],
      refs: ["ninit", "ninit"],
      text: "In the fast-evolving landscape of technology, quantum computing stands out as a groundbreaking frontier, promising to revolutionize the way we process information. Unlike classical computers that rely on bits to represent either 0 or 1, quantum computers use quantum bits or qubits, leveraging the principles of quantum mechanics to perform complex computations at unprecedented speeds. Quantum Bits: The Building Blocks of Quantum ComputingAt the heart of quantum computing are qubits, which, thanks to the phenomenon of superposition, can exist in multiple states simultaneously. This unique property allows quantum computers to process a vast number of possibilities in parallel, leading to an exponential increase in computational power compared to classical computers.Entanglement: Quantum Computing's Secret SauceEntanglement is another fundamental quantum principle that sets quantum computing apart. When qubits become entangled, the state of one qubit becomes directly linked to the state of another, regardless of the physical distance between them. This interdependence enables quantum computers to solve certain problems more efficiently than classical computers.Quantum Supremacy: A Milestone Achieved. In recent years, there has been a race among researchers and tech giants to achieve quantum supremacy—the point at which a quantum computer can outperform the most powerful classical computers. Google's announcement of achieving quantum supremacy with its 53-qubit Sycamore processor in 2019 marked a significant milestone, showcasing the potential of quantum computing to solve complex problems beyond the reach of classical machines.Applications Across Industrieslecular interactions could significantly accelerate the identification of new drugs and materials.",
    },
  ];

  // the upload URL
  const [url, setUrl] = useState("");

  // integration function for Articles upload
  const handleUpload = async () => {
    // const response = await axios.post(url, {
    //   url
    // })
    // if (response.status >= 200 && response.status < 300) {
    //   // display success
    //   alert("Vos articles ont ete uploade et sont en attente de moderation!");
    // }
  };
  return (
    // Background image if the screen is large, raw otherwise
    <div className=" bg-[#E7E4D5] bg-none w-screen h-screen pt-[100px] lg:pt-[2%] flex flex-col items-center justify-center px-[30px] lg:px-[7%] xl:px-[8%]">
      {/* Navbar */}
      <LobbyNav />
      {/* main page content, to be blured when the add moderator popout is open */}
      <div className="w-full h-full flex items-start flex-col">
        <div className=" pt-[40px] flex items-start pb-[10px] border-[#56695C] border-b-[4px] ">
          <h1
            id="main-container"
            className="text-md lg:text-4xl xl:text-5xl font-merryweather font-semibold">
            Articles en attente
          </h1>
        </div>
        <div className="mt-[50px] flex flex-col w-full custom-scrollBar overflow-y-scroll relative text-xs  max-h-[70vh]">
          {articles.map((a) => (
            <Article article={a} />
          ))}
        </div>
        {/* if the screen if small, display 2 extensible sections of profile and moderators */}
        <div className="sm:pt-[50px] md:pt-[100px] h-full w-full flex flex-col lg:hidden">
          <ProfileSection profile={profile} />
        </div>
      </div>
      {/* if the screen is large, display the fixed animated sections  */}
      <div className="lg:block hidden w-full">
        <ProfileCard profile={profile} />
      </div>
    </div>
  );
};
