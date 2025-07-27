import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [medicine, setMedicine] = useState([]);

  //sample data for initial development
  const InitialMedicineList = [
    { id: "1", name: "paracetamol" },
    { id: "2", name: "Dolo650" },
    { id: "3", name: "Dart" },
    { id: "4", name: "citrizen" },
    { id: "5", name: "Dethromax" },
    { id: "6", name: "medicine6" },
  ];

  useEffect(() => {
    setMedicine(InitialMedicineList);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          {Medicines.map((medicine) => (
            <div key={medicine.id} className="col-md-4 mb-4">
              <div
                style={{ height: "200px", paddingTop: "20px" }}
                className="card shadow-sm border border-3 border-warning "
              >
                <div className=" m-auto  h-50 border border-3 border-blue">
                  <img src="//" alt="--medicine---" />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <h5 className="card-title ">{medicine.name}</h5>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
                {Medicines.length === 0 && (
                  <p className="text-center text-muted">No medicines found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
