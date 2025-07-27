import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Login.css';


const Login = () => {
    const [identifier,setIdentifier]=useState("");
    const[password,setPassword]=useState("");
    // Handle login logic here
    const handleSubmit=(e)=>{
        e.preventDefault();
        // Validate the form before proceeding
        if (!validateForm()) return;
        console.log("Identifier: ",identifier);
        console.log("Password: ",password);
        // Reset form fields
        setIdentifier("");
        setPassword("");
    }
    //validate the input fields
    const validateForm = () => {
        if (!identifier.trim() || !password.trim()) {
            alert("Please fill in all fields.");
            return false; //stop form submission
        }
        return true; //proceed with form submission
    }

  return (
    <div className="login-container">
      <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center mb-4">Please enter your valid credentials to log in.</p>
              <form onSubmit={handleSubmit}>
                {/* username */}
                <div className="row mb-3 align-items-center">
                  <label htmlFor="identifier" className="col-sm-3 col-form-label">
                    Username
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="identifier"
                      placeholder="Enter username"
                      value={identifier}
                      onChange={(e)=>setIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                {/* password */}
                <div className="row mb-4 align-items-center">
                  <label htmlFor="Password" className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <br />
                
                </div>
              </form>
            </div>
          </div>
  );
};

export default Login;