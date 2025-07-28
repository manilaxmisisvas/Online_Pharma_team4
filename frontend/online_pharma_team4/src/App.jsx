import UserDashboard from "./components/UserDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
