import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Login.css';


const Login = () => {
    const [identifier,setIdentifier]=useState("");
    const[Email,setEmail]=useState("");
    // Handle login logic here
    const handleSubmit=(e)=>{
        e.preventDefault();
        // Validate the form before proceeding
        if (!validateForm()) return;
        console.log("Identifier: ",identifier);
        console.log("Email: ",Email);
        // Reset form fields
        setIdentifier("");
        setEmail("");
    }
    //validate the input fields
    const validateForm = () => {
        if (!identifier.trim() || !Email.trim()) {
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

                {/* Email */}
                <div className="row mb-4 align-items-center">
                  <label htmlFor="Email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="Email"
                      className="form-control"
                      id="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e)=>setEmail(e.target.value)}
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