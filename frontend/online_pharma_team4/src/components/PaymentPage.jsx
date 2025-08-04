import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(location.state?.total || 0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      alert("Failed to load user details.");
    }
  };

  const handlePayment = async () => {
    if (!user) {
      alert("User details not loaded yet.");
      return;
    }

    const options = {
      key: "rzp_test_4Ea0vvGa7O4ivP", // Your Razorpay Test Key
      amount: amount * 100,
      currency: "INR",
      name: "Online Pharma",
      description: "Order Payment",
      handler: async function (response) {
        try {
          await axios.post("http://localhost:8080/api/drug_order", {
            order_amount: amount,
            user_id: user.id,
          });

          alert("✅ Payment successful. Order saved!");
          navigate("/user");
        } catch (error) {
          console.error("❌ Failed to store order:", error);
          alert("Payment succeeded, but storing order failed.");
        }
      },
      prefill: {
        name: user.name || "User",
        email: user.email || "email@example.com",
        contact: user.mobile || "",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">💳 Payment Page</h2>
      <div className="card p-4 mt-4">
        <h5 className="mb-3">🧾 Order Summary</h5>
        <p><strong>Total Amount:</strong> ₹{amount}</p>

        {user ? (
          <div className="mt-4">
            <h5>👤 User Details</h5>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>DOB:</strong> {user.dob || "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;