import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const loginData = {
      email: emailOrUsername.includes("@") ? emailOrUsername : null,
      username: !emailOrUsername.includes("@") ? emailOrUsername : null,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", loginData);

      if (response.status === 200) {
        const { token, role, email } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);

        if (role === "USER") {
          navigate("/user");
        } else if (role === "ADMIN") {
          navigate("/admin");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Check your credentials.");
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <p className="text-center mb-4">Please enter your valid credentials to log in.</p>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email or Username */}
          <div className="mb-3">
            <label htmlFor="emailOrUsername" className="form-label">Email or Username</label>
            <input
              type="text"
              className="form-control"
              id="emailOrUsername"
              placeholder="Enter email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
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

          {/* Submit */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <p className="text-secondary text-center">
          Don't have an account?{" "}
          <Link to="/" className="text-primary fw-semibold text-decoration-none">
            Register here
          </Link>
        </p>

        {/* OAuth2 */}
        <div className="oauth-section mt-4">
          <p className="text-center">Or login with:</p>
          <button className="btn btn-outline-danger w-100 mb-2" onClick={() => handleOAuth("google")}>
            <i className="fab fa-google me-2"></i> Google
          </button>
          <button className="btn btn-outline-dark w-100" onClick={() => handleOAuth("github")}>
            <i className="fab fa-github me-2"></i> GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
