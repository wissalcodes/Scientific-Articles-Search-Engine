import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Footer from "./components/layout/Footer";
import SignUp from "./pages/SignUp";
import { PasswordRecovery } from "./pages/PasswordRecovery";
import SignIn from "./pages/SignIn";
import { MailSent } from "./pages/MailSent";
import "./App.css";
function App() {
  return (
    <div className="font-lora flex flex-col relative w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/reset_password" element={<PasswordRecovery />} />
          <Route path="/mail_sent" element={<MailSent />} />

          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
