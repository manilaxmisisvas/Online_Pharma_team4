import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Admin.css";

const Admin = () => {
  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="admin-bg min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg admin-navbar shadow-sm mb-5">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold text-light" href="#">
            Admin Panel
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link text-light" href="#users-section">
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#products-section">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#profile-section">
                  Profile
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <button
                  className="btn btn-outline-light btn-sm px-4 rounded-pill shadow-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="container pb-3">
        <h1 className="text-center mt-5 display-4 fw-bold text-primary">
          Welcome, Admin!
        </h1>

        {/* Users Card */}
        <div id="users-section" className="row mt-5">
          <div className="col-12">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-users d-flex align-items-center">
                <i className="bi bi-people me-2 fs-4"></i>
                <span className="fs-5">Manage Users</span>
              </div>
              <div className="card-body">
                <div className="btn-group w-100 mb-2" role="group">
                  <button
                    type="button"
                    className="btn admin-btn-primary flex-fill"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-secondary flex-fill"
                  >
                    View Users
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-warning flex-fill"
                  >
                    Edit User
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-danger flex-fill"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div id="products-section" className="row mt-5">
          <div className="col-12">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-products d-flex align-items-center">
                <i className="bi bi-box-seam me-2 fs-4"></i>
                <span className="fs-5">Manage Products</span>
              </div>
              <div className="card-body">
                <div className="btn-group w-100 mb-2" role="group">
                  <button
                    type="button"
                    className="btn admin-btn-primary flex-fill"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-secondary flex-fill"
                  >
                    View Products
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-warning flex-fill"
                  >
                    Edit Product
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-danger flex-fill"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div id="profile-section" className="row mt-5">
          <div className="col-md-4 mx-auto">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-profile d-flex align-items-center">
                <i className="bi bi-person-circle me-2 fs-4"></i>
                <span className="fs-5">My Profile</span>
              </div>
              <div className="card-body text-center">
                <button
                  type="button"
                  className="btn admin-btn-primary mt-2 rounded-pill"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div id="logout-section" className="row mt-5">
          <div className="col-md-4 mx-auto">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-logout d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-2 fs-4"></i>
                <span className="fs-5">Logout</span>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <button
                    type="button"
                    className="btn admin-btn-danger mt-2 rounded-pill"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
