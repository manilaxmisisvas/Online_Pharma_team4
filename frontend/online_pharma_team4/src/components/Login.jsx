import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginData}),
      });

      if (response.ok) {
        const token = await response.text(); // backend returns JWT as plain text
        alert("Login successful");
        // Option-> save token in localStorage for authenticated requests
        localStorage.setItem("jwtToken", token);

        // Reset fields
        setUsername("");
        setPassword("");
      } else {
        alert("Login failed: Invalid username or password");
      }
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <p className="text-center mb-4">Please enter your valid credentials to log in.</p>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="row mb-4 align-items-center">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
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
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
