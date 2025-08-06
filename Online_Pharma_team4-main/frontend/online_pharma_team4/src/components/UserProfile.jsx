import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { password, ...userData } = response.data;

        // Ensure address is initialized
        setUser({
          ...userData,
          address: userData.address || {
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
          },
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to load user profile.");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "zipcode", "country"].includes(name)) {
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const { password, ...safeUser } = user; // exclude password

    try {
      await axios.put("http://localhost:8080/api/user/update", safeUser, {
        headers: { Authorization:` Bearer ${token} `},
      });
      alert("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Update failed.");
    }
  };

  if (!user) return <div className="container mt-5">Loading user profile...</div>;

  const { address } = user;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">👤 User Profile</h2>
      <div className="card p-4 shadow">
        {isEditing ? (
          <>
            <div className="mb-2">
              <label>Name:</label>
              <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Email:</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" disabled />
            </div>
            <div className="mb-2">
              <label>Contact:</label>
              <input type="text" name="mobile" value={user.mobile} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>DOB:</label>
              <input type="date" name="dob" value={user.dob || ""} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Gender:</label>
              <select name="gender" value={user.gender || ""} onChange={handleChange} className="form-control">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <h5 className="mt-4">Address</h5>
            <div className="mb-2">
              <label>Street:</label>
              <input type="text" name="street" value={address?.street || ""} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>City:</label>
              <input type="text" name="city" value={address?.city || ""} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>State:</label>
              <input type="text" name="state" value={address?.state || ""} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Zip Code:</label>
              <input type="text" name="zipcode" value={address?.zipcode || ""} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Country:</label>
              <input type="text" name="country" value={address?.country || ""} onChange={handleChange} className="form-control" />
            </div>

            <button className="btn btn-success mt-3" onClick={handleUpdate}>
              ✅ Save Changes
            </button>
            <button className="btn btn-secondary mt-3 ms-2" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.mobile}</p>
            <p><strong>DOB:</strong> {user.dob || "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
            <p><strong>Address:</strong><br />
              {address?.street || "N/A"}, {address?.city || ""}<br />
              {address?.state || ""} - {address?.zipcode || ""}<br />
              {address?.country || ""}
            </p>
            <button className="btn btn-warning mt-3" onClick={() => setIsEditing(true)}>
              ✏ Edit Profile
            </button>
          </>
        )}
        <button className="btn btn-primary mt-3 ms-2" onClick={() => navigate("/user")}>
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserProfile;