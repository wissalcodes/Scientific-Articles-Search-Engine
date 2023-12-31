import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserLobbySmall from "./page/UserLobbySmall";
function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
      <Router>
        <Routes>
        <Route path="/" element={<UserLobbySmall/>} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
