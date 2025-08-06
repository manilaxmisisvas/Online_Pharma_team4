import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  // Address fields separately
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client side validation
    if (
      !username || !email || !password || !dob || !gender || !mobile ||
      !street || !city || !state || !zipcode || !country
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const addressObj = {
      street,
      city,
      state,
      zipcode,
      country,
    };

    const userData = {
      name: username,
      email,
      password,
      role,
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
        alert("Registration successful! Please login.");
        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER");
        setDob("");
        setGender("");
        setMobile("");
        setStreet("");
        setCity("");
        setState("");
        setZipcode("");
        setCountry("");
        navigate("/login");
      } else {
        const err = await response.json();
        alert("Registration failed: " + (err.message || JSON.stringify(err)));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <div className="card-body">
          <h2>Create Account</h2>
          <p className="text-secondary">Please fill in the form to create an account.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

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
                required
              />
            </div>

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
              <label htmlFor="zipcode">zipcode</label>
              <input type="text"
                id="zipcode"
                className="form-control"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
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
                value={role}P
                onChange={e => setRole(e.target.value)}
                required>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>

          <p className="text-secondary" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;