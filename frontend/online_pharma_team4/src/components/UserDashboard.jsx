import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./cartcontext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const UserDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/drugs")
      .then((response) => {
        setDrugs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drug data:", error);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Online Pharmacy
          </a>

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

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/profile")}
          >
            👤 Profile
          </button>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/cart")}
            >
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
                <img
                  src={drug.imgurl}
                  style={{ width: "250px", margin: "auto" }}
                  className="card-img-top"
                  alt={drug.name}
                />
                <div
                  className="p-3 d-flex flex-column justify-content-between"
                  style={{ flexGrow: 1 }}
                >
                  <div>
                    <h5 className="card-title">{drug.name}</h5>
                    <p className="card-text">₹{drug.price}</p>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-outline-info w-50"
                      onClick={() => setSelectedDrug(drug)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-success w-50"
                      onClick={() => handleAddToCart(drug)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredDrugs.length === 0 && (
            <p className="text-center text-muted">No medicines found.</p>
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
            <p>
              <strong>Type:</strong> {selectedDrug.type}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedDrug.price}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedDrug.quantity}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {selectedDrug.rating}
            </p>
            <p>
              <strong>Company:</strong> {selectedDrug.company}
            </p>
            <p>
              <strong>Description:</strong> {selectedDrug.description || "N/A"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedDrug(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserDashboard;
