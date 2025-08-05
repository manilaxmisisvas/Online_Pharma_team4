import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import axios from "axios"; // Importing Axios
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State hooks for each form field
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
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
=======
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  // Address fields separately
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client side validation
    if (
      !username || !email || !password || !dob || !gender || !mobile ||
      !street || !city || !state || !postalCode || !country
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const addressObj = {
      street,
      city,
      state,
      postalCode,
      country,
    };

    const userData = {
      name: username,
      email,
      password,
      role,
<<<<<<< HEAD
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
=======
      dob,
      gender,
      mobile,
      address: addressObj,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
        alert("Registration successful! Please login.");
        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER");
<<<<<<< HEAD
        setGender("Male");
        setDob("");
        setCity("");
        setState("");
        setZipCode("");
        setMobile("");
        setStreet("");
        navigate("/login");
=======
        setDob("");
        setGender("");
        setMobile("");
        setStreet("");
        setCity("");
        setState("");
        setPostalCode("");
        setCountry("");
        navigate("/login");
      } else {
        const err = await response.json();
        alert("Registration failed: " + (err.message || JSON.stringify(err)));
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
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
<<<<<<< HEAD
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
=======
          <p className="text-secondary">Please fill in the form to create an account.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input type="text"
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
                id="username"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
<<<<<<< HEAD
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
=======
              <label htmlFor="email">Email</label>
              <input type="email"
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
                id="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
<<<<<<< HEAD
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
=======
              <label htmlFor="password">Password</label>
              <input type="password"
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
                id="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

<<<<<<< HEAD
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
=======
            <div className="mb-3">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date"
                id="dob"
                className="form-control"
                value={dob}
                onChange={e => setDob(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select id="gender"
                className="form-select"
                value={gender}
                onChange={e => setGender(e.target.value)}
                required>
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="mobile">Mobile</label>
              <input type="text"
                id="mobile"
                className="form-control"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
                required
              />
            </div>

<<<<<<< HEAD
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
=======
            <h5>Address</h5>

            <div className="mb-3">
              <label htmlFor="street">Street</label>
              <input type="text"
                id="street"
                className="form-control"
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city">City</label>
              <input type="text"
                id="city"
                className="form-control"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="state">State</label>
              <input type="text"
                id="state"
                className="form-control"
                value={state}
                onChange={e => setState(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text"
                id="postalCode"
                className="form-control"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country">Country</label>
              <input type="text"
                id="country"
                className="form-control"
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role">Role</label>
              <select id="role"
                className="form-select"
                value={role}
                onChange={e => setRole(e.target.value)}
                required>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
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
      </div>
    </div>
  );
};

export default Register;