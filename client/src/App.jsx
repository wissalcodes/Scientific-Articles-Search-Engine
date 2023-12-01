import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Sample } from "./components/sample/Sample";
import "./App.css";
function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex font-bold flex-col h-screen w-screen bg-slate-500 justify-center items-center text-[50px]">
                Welcome!
                <div className="font-light text-[30px]">
                  * in the link, add /members to view running flask server
                </div>
                <div className="font-light text-[30px]">
                  * in the link, add /teammembers to view rendering of API
                  response
                </div>
              </div>
            }
          />
          <Route path="teammembers" element={<Sample />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
