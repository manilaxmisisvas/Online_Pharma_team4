import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(location.state?.total || 0);
  const [drugs, setDrugs] = useState(location.state?.drugs || []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.drugs || !location.state.total) {
      alert("No order data found, redirecting to cart.");
      navigate("/cart");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        navigate("/login");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization:` Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      alert("Failed to load user details.");
      navigate("/login");
    }
  };

  const handlePayment = () => {
    if (!user) {
      alert("User details not loaded yet.");
      return;
    }

    if (!drugs.length) {
      alert("No products selected.");
      navigate("/cart");
      return;
    }

    const options = {
      key: "rzp_test_4Ea0vvGa7O4ivP",
      amount: amount * 100,
      currency: "INR",
      name: "Online Pharma",
      description: "Order Payment",
      handler: async function (response) {
        try {
          const upiId=response.razorpay_payment_id;
          await axios.post(
            `http://localhost:8080/api/user/${user.id}/orders`,
            { drugs ,upiId}, // send drugs with id and quantity
            { headers: { Authorization:` Bearer ${localStorage.getItem("token")}` } }
          );

          alert("✅ Payment successful. Order saved!");
          navigate("/user");  // or wherever you want to go next
        } catch (error) {
          alert("Payment succeeded but storing order failed.");
          console.error(error);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
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

        <div>
          <h6>Products:</h6>
          <ul>
            {drugs.map((drug, i) => (
              <li key={drug.id || i}>
                Drug ID: {drug.id}, Quantity: {drug.quantity}
              </li>
            ))}
          </ul>
        </div>

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
          <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;