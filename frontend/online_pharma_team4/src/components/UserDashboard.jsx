import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./cartcontext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import axios from "axios";
const UserDashboard = () => {
  const [medicine, setMedicine] = useState([]);
=======
import { Modal, Button } from "react-bootstrap";

const UserDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/drugs")
      .then((response) => {
<<<<<<< HEAD
        setMedicine(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
=======
        setDrugs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drug data:", error);
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
      });
  }, []);

  const handleAddToCart = (drug) => {
    addToCart({ id: drug.id, name: drug.name, price: drug.price, quantity: 1 });
    alert(`${drug.name} added to cart!`);
  };

  // 🔹 Filter: Only show non-banned drugs (banned !== 2)
  const filteredDrugs = drugs
    .filter((drug) => drug.banned !== 2)
    .filter((drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
<<<<<<< HEAD
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
=======


<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container">
    <a className="navbar-brand" href="#">Online Pharmacy</a>

    <div className="d-flex flex-grow-1 justify-content-center">
      <form className="d-flex w-75">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>

    <div className="d-flex gap-2">
      <button className="btn btn-outline-light" onClick={() => navigate("/cart")}>
        🛒 My Cart
      </button>
     <button
  className="btn btn-outline-light"
  onClick={() => {
    localStorage.clear(); 
    navigate("/login"); 
  }}
>
  Logout
</button>


    </div>
  </div>
</nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">🧾 Drug List</h2>
        <div className="row">
          {filteredDrugs.map((drug) => (
            <div key={drug.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 text-center">
                <img src="..." className="card-img-top" alt={drug.name} />
                <div className="p-3 d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
                  <div>
                    <h5 className="card-title">{drug.name}</h5>
                    <p className="card-text">₹{drug.price}</p>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-outline-info w-50" onClick={() => setSelectedDrug(drug)}>Details</button>
                    <button className="btn btn-success w-50" onClick={() => handleAddToCart(drug)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredDrugs.length === 0 && (
            <p className="text-center text-muted">No medicines found.</p>
>>>>>>> 2d2362a9391b4c4fc294f355fe4895055b42737f
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedDrug && (
        <Modal show={true} onHide={() => setSelectedDrug(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedDrug.name} - Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Type:</strong> {selectedDrug.type}</p>
            <p><strong>Price:</strong> ₹{selectedDrug.price}</p>
            <p><strong>Quantity:</strong> {selectedDrug.quantity}</p>
            <p><strong>Rating:</strong> ⭐ {selectedDrug.rating}</p>
            <p><strong>Company:</strong> {selectedDrug.company}</p>
            <p><strong>Description:</strong> {selectedDrug.description || "N/A"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedDrug(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

    </>
  );
};

export default UserDashboard;