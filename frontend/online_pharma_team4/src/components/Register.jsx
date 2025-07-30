import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!username || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    const userData = {
      name: username,
      email,
      password, // send password to backend for encoding
      role,
      // Add any other required fields if backend expects
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER");
      } else {
        const err = await response.json();
        alert("Registration failed: " + (err.message || "Unknown error"));
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
              <label htmlFor="username" className="form-label">Username</label>
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
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
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

            <div className="mb-4">
              <label htmlFor="role" className="form-label">Role</label>
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

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="text-secondary" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">Login here</Link>
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
