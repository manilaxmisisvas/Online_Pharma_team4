
import UserDashboard from "./components/UserDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import Register from "./components/Register.jsx";

import OAuthSuccess from "./services/OAuthSuccess .jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<Admin />} />
        {/* OAuth Success Route */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
