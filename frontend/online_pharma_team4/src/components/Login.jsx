import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );

      // Check if the response status is 200 (success)
      if (response.status === 200) {
        const { token, role, email } = response.data;

        // Store JWT token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);

        // Redirect based on the user's role
        if (role === "USER") {
          navigate("/user"); // Navigate to user page
        } else if (role === "ADMIN") {
          navigate("/admin"); // Navigate to admin page
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="card-body">
          <h2>Login</h2>
          <p className="text-secondary">
            Please enter your credentials to login.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <p className="text-secondary" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/"
              className="text-primary fw-semibold text-decoration-none"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="info-side">
          <h3>Welcome Back!</h3>
          <p>We are glad to see you back!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
