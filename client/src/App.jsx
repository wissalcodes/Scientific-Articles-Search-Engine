//import { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Favorite from "./component/Favorite";
function App () {
  return (
     <div className="flex flex-col h-screen w-screen">
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Favorite/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
  );
}
export default App;