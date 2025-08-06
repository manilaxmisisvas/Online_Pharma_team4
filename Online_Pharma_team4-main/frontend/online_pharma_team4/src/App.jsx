import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserDashboard from "./components/UserDashboard.jsx";


import Cart from "./components/Cart.jsx";
import { CartProvider } from "./components/cartcontext.jsx"; // ✅ add this import
import PaymentPage from "./components/PaymentPage.jsx";

import Admin from "./components/AdminDashboard.jsx";
import UserProfile from "./components/UserProfile.jsx";
import OAuthSuccess from "./services/OAuthSuccess .jsx";


function App() {
  return (
    <CartProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;