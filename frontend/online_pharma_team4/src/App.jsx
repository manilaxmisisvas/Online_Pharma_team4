import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import Admin from "./components/Admin.jsx";
import OAuthSuccess from "./services/OAuthSuccess.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./components/cartcontext.jsx"; // ✅ add this import
import PaymentPage from "./components/PaymentPage.jsx";


function App() {
  return (
    <CartProvider> {/* ✅ wrap everything with cart context */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDashboard />} />

          <Route path="/payment" element={<PaymentPage />} /> {/* new route */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/cart" element={<Cart />} /> {/* lowercase route */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;