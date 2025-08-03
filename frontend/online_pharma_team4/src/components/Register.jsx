import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Importing Axios
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State hooks for each form field
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (
      !username ||
      !email ||
      !password ||
      !dob ||
      !city ||
      !state ||
      !zipCode ||
      !mobile ||
      !street
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const userData = {
      name: username,
      email,
      password, // send password to backend for encoding
      role,
      gender,
      dob,
      mobile,
      address: {
        street,
        city,
        state,
        zipCode,
      },
    };

    try {
      // Using Axios for the POST request
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Registration successful! Please login.");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER");
        setGender("Male");
        setDob("");
        setCity("");
        setState("");
        setZipCode("");
        setMobile("");
        setStreet("");
        navigate("/login");
      }
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <div className="card-body">
          <h2>Create Account</h2>
          <p className="text-secondary">
            Please fill in the form to create an account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* New Mobile Field */}
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            {/* New Street Address Field */}
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Enter street address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  id="role"
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="zipCode" className="form-label">
                  Zip Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <p className="text-secondary" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary fw-semibold text-decoration-none"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="info-side">
          <h3>Glad to see You!</h3>
          <p>Welcome to Online Pharmacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;