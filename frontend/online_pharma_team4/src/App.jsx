import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import Admin from "./components/AdminDashboard.jsx";
import OAuthSuccess from "./services/OAuthSuccess .jsx"
import Cart from "./components/Cart.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { CartProvider } from "./components/cartcontext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  return (
    <CartProvider> {/* Wrap everything with Cart context */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDashboard />} />

          {/* Protected admin route */}
          <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* Other routes */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
