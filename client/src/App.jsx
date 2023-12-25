//import { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopoutArticle from "./component/PopoutArticle";
import "./App.css";
function App () {
  return (
     <div className="flex flex-col h-screen w-screen">
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<PopoutArticle/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
  );
}
export default App;