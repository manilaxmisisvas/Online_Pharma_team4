import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const UserDashboard = () => {
  const [medicine, setMedicine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/drugs")
      .then((response) => {
        setMedicine(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    // logout logic here later
    console.log("Logged out");
  };

  //filtering medicines based on search parameters
  const Medicines = searchTerm
    ? medicine.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : medicine;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100 m-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Online Pharmacy
          </a>

          <form className="d-flex mx-auto" style={{ width: "50%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="d-flex align-items-center gap-3">
            {/* Cart Icon */}
            <button className="btn btn-outline-light position-relative">
              <i className="bi bi-cart-fill"></i>
            </button>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-4 px-4">
        <div className="row">
          {Medicines.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-muted">No medicines found.</p>
            </div>
          ) : (
            Medicines.map((medicine) => (
              <div key={medicine.id} className="col-md-4 col-lg-3 mb-4">
                <div className="card shadow-sm border border-3 border-warning h-100">
                  <div
                    className="d-flex justify-content-center align-items-center p-3"
                    style={{ height: "100px" }}
                  >
                    <img
                      src="https://via.placeholder.com/80"
                      alt={medicine.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{medicine.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Company:</strong> {medicine.company}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Type:</strong> {medicine.type}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Price:</strong> ₹{medicine.price}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Stock:</strong> {medicine.quantity} units
                    </p>
                    <p className="card-text mb-1">
                      <strong>Rating:</strong> {medicine.rating} ⭐
                    </p>
                    {medicine.banned && (
                      <p className="card-text text-danger">
                        <strong>BANNED</strong>
                      </p>
                    )}
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-primary">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
