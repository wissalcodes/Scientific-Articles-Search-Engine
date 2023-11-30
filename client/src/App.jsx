import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // API call to fetch the members
    fetch("/members")
      // convert the response to json
      .then((res) => res.json())
      .then((data) => {
        // set members to reponse
        setMembers(data.members);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-[#a9dea9] w-screen h-screen flex flex-col justify-center items-center">
      <b className="text-[50px]">Welcome to IGL Project repo!</b>
      {/* map the members array and display members */}
      <div className="w-[50vw] bg-black rounded-[20px] py-[50px] mt-[50px]">
        <ol className="px-[40px] text-[25px] text-white  flex flex-col items-center justify-start">
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
