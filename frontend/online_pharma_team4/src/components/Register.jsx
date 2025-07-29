import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Role:", role);
    setUsername("");
    setEmail("");
    setRole("user");
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        {/* Left Side - Form */}
        <div className="card-body">
          <h2>Create Account</h2>
          <p className="text-secondary">Please fill in the form to create an account.</p>
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
            <div className="mb-4">
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <p className="text-secondary" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Login here
            </Link>
          </p>
        </div>

        {/* Right Side - Info Panel */}
        <div className="info-side">
          <h3>Glad to see You!</h3>
          <p>Welcome to Online Pharmacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
