<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation
=======
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/AuthService"; // New service file
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({
    emailOrName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    setForm({ emailOrName: "", password: "" });
  }, []);
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

<<<<<<< HEAD
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
=======
    if (!form.emailOrName || !form.password) {
      alert("Both fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      const { token, role, email } = await login(form);
      alert("Login successful!");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

        // Reset form fields
        setForm({ emailOrName: "", password: "" });

      if (role === "USER") {
        navigate("/user");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email/username or password.");
    } finally {
      setIsLoading(false);
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
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

<<<<<<< HEAD
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
=======
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailOrName" className="form-label">
                Email or Username
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
              </label>
              <input
                type="email"
                className="form-control"
<<<<<<< HEAD
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
=======
                id="emailOrName"
                name="emailOrName"
                placeholder="Enter email or username"
                value={form.emailOrName}
                onChange={handleChange}
                autoComplete="off"
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
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
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="mb-3">
<<<<<<< HEAD
              <button type="submit" className="btn btn-primary">
                Login
=======
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
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

<<<<<<< HEAD
=======
        <div className="oauth-section">
          <p>Or login with:</p>
          <div className="oauth-buttons">
            <button
              className="btn btn-outline-danger mb-2 w-100"
              onClick={() => handleOAuth("google")}
            >
              <i className="fab fa-google me-2"></i> Google
            </button>
            <button
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => handleOAuth("github")}
            >
              <i className="fab fa-github me-2"></i> GitHub
            </button>
          </div>
        </div>

>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
        <div className="info-side">
          <h3>Welcome Back!</h3>
          <p>We are glad to see you back!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;