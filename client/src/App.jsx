import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import "./App.css";

function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
      <div className="h-full w-full ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
