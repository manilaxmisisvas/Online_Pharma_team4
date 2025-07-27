import UserDashboard from "./components/UserDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
