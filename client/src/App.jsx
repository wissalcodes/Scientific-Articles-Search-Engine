import { useState, useEffect } from "react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
      <SignUp />
      {/* <MemoryRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign_in" element={<div>hehheh</div>} />
        </Routes>
      </MemoryRouter>
      <Navbar />
      <Footer /> */}
    </div>
  );
}

export default App;
