import React, { useState, useEffect, useRef } from "react";
import { getUserProfile } from "../services/UserService";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [medicine, setMedicine] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profileRef = useRef(null);

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

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out!");
    window.location.href = "/login";
  };

  const toggleProfile = async () => {
    // Open profile view and fetch if not currently visible
    if (!isProfileVisible) {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const data = await getUserProfile();
        setProfile(data);
        setIsProfileVisible(true);
      } catch {
        setProfileError("Failed to load profile");
      } finally {
        setLoadingProfile(false);
      }
    } else {
      // Close profile view if visible
      setIsProfileVisible(false);
    }
  };

  useEffect(() => {
    if (!isProfileVisible) return;

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileVisible]);

  const filteredMedicines = searchTerm
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
        <div className="mb-4 p-3 border rounded shadow-sm position-relative">
          <h3>User Profile</h3>
          <button
            className="btn btn-primary mb-3"
            onClick={toggleProfile}
            disabled={loadingProfile}
          >
            {loadingProfile
              ? "Loading Profile..."
              : isProfileVisible
              ? "Hide Profile"
              : "View Profile"}
          </button>

          {profileError && <p className="text-danger">{profileError}</p>}

          {isProfileVisible && profile && (
            <div ref={profileRef} className="card p-3">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Mobile:</strong> {profile.mobile}</p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {profile.dob ? new Date(profile.dob).toLocaleDateString() : "N/A"}
              </p>
              <p><strong>Gender:</strong> {profile.gender || "N/A"}</p>
              <p><strong>Status:</strong> {profile.disabled ? "Disabled" : "Active"}</p>
              {profile.address && (
                <>
                  <p><strong>Address:</strong></p>
                  <p>
                    {profile.address.street || ""} {profile.address.city || ""},{" "}
                    {profile.address.state || ""} {profile.address.zipcode || ""}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="row">
          {filteredMedicines.map((med) => (
            <div key={med.id} className="col-md-4 mb-4">
              <div
                style={{ height: "200px", paddingTop: "20px" }}
                className="card shadow-sm border border-3 border-warning"
              >
                <div className="m-auto h-50 border border-3 border-blue">
                  <img src="//" alt="--medicine---" />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{med.name}</h5>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
                {filteredMedicines.length === 0 && (
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