import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/UserService";
import "../styles/Admin.css";
import {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
  disableUserById,
  getAllDrugs,
  addDrug,
  updateDrug,
  updateAdminProfile,
  deleteDrugById,
} from "../services/AdminService";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  // Profile states
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profileRef = useRef(null);

  // Users states
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isViewUsersOpen, setIsViewUsersOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    disabled: false,
    mobile: "",
    gender: "",
    dob: "",
  });
  const [userError, setUserError] = useState(null);
  const [userSuccessMessage, setUserSuccessMessage] = useState(null);

  // Products states
  const [products, setProducts] = React.useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
  const [isViewProductsOpen, setIsViewProductsOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [newProduct, setNewProduct] = React.useState({
    imgurl: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    company: "",
    type: "",
    banned: false,
    rating: 0.0,
  });
  const [productError, setProductError] = React.useState(null);
  const [productSuccessMessage, setProductSuccessMessage] =
    React.useState(null);
  const [image, setImage] = useState(null);
  // Check token presence on mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // --- Profile ---
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await updateAdminProfile(editProfile);
      setProfile(res.data); // update state with new profile
      setIsEditing(false); // close edit mode
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out!");
    navigate("/login");
  };

  const toggleProfile = async () => {
    if (!isProfileVisible) {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile();
        setProfile(data);
        setIsProfileVisible(true);
      } catch {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    } else {
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

  // --- Users ---

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
      setUserError(null);
    } catch (err) {
      setUserError(
        err.response?.data?.message || err.message || "Failed to fetch users"
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchUsers();
  }, []);

  const openAddUserModal = () => {
    setSelectedUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "",
      disabled: false,
      mobile: "",
      gender: "",
      dob: "",
    });
    setUserError(null);
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      disabled: user.disabled || false,
      mobile: user.mobile || "",
      gender: user.gender || "",
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
    });
    setUserError(null);
    setIsUserModalOpen(true);
  };

  const handleUserChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateOrUpdateUser = async () => {
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.role.trim()) {
      setUserError("Name, Email, and Role are required.");
      return;
    }
    try {
      if (selectedUser) {
        await updateUserById(selectedUser.id, newUser);
        setUserSuccessMessage("User updated successfully!");
      } else {
        await createUser(newUser);
        setUserSuccessMessage("User created successfully!");
      }
      setUserError(null);
      setIsUserModalOpen(false);
      fetchUsers();
      setTimeout(() => setUserSuccessMessage(null), 3000);
    } catch (err) {
      setUserError(
        err.response?.data?.message || err.message || "Failed to save user"
      );
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserById(id);
      setUserSuccessMessage("User deleted successfully!");
      fetchUsers();
      setTimeout(() => setUserSuccessMessage(null), 3000);
    } catch (err) {
      setUserError(
        err.response?.data?.message || err.message || "Failed to delete user"
      );
    }
  };

  const handleDisableUser = async (id, disabled) => {
    try {
      await disableUserById(id);
      setUserSuccessMessage(
        disabled ? "User disabled successfully!" : "User enabled successfully!"
      );
      fetchUsers();
      setTimeout(() => setUserSuccessMessage(null), 3000);
    } catch (err) {
      setUserError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update user status"
      );
    }
  };

  // --- Products ---

  const fetchProducts = async () => {
    try {
      const response = await getAllDrugs();
      setProducts(response.data || []);
      setProductError(null);
    } catch (err) {
      setProductError(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchProducts();
  }, []);

  const openAddProductModal = () => {
    setSelectedProduct(null);
    setNewProduct({
      imgurl: "",
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      company: "",
      type: "",
      banned: false,
      rating: 0.0,
    });
    setProductError(null);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      imgurl: product.imgurl || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      quantity: product.quantity || 0,
      company: product.company || "",
      type: product.type || "",
      banned: product.banned || false,
      rating: product.rating || 0.0,
    });
    setProductError(null);
    setIsProductModalOpen(true);
  };

  const handleAddOrUpdateProduct = async () => {
    if (!newProduct.name.trim()) {
      setProductError("Product name is required.");
      return;
    }

    try {
      if (selectedProduct) {
        // Update existing product
        await updateDrug(selectedProduct.id, newProduct);
        setProductSuccessMessage("Product updated successfully!");
      } else {
        // Upload new product with image
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "your_preset");
        data.append('cloudinary','cloudinary_User_ID');
        
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/cloudinary_User_ID/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const cloudData = await res.json();

        const updatedProduct = { ...newProduct, imgurl: cloudData.secure_url };
        setNewProduct(updatedProduct);

        await uploadToDatabase(updatedProduct); // ensure DB upload finished
        setProductSuccessMessage("Product added successfully!");
      }

      setProductError(null);
      setIsProductModalOpen(false);
      fetchProducts();

      setTimeout(() => setProductSuccessMessage(null), 3000);
    } catch (err) {
      setProductError(
        err.response?.data?.message || err.message || "Failed to save product"
      );
    }
  };

  const uploadToDatabase = async (product) => {
    await addDrug(product);
  };

  const handleDeleteProductById = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteDrugById(id);
      setProductSuccessMessage("Product deleted successfully!");
      fetchProducts();
      setTimeout(() => setProductSuccessMessage(null), 3000);
    } catch (err) {
      setProductError(
        err.response?.data?.message || err.message || "Failed to delete product"
      );
    }
  };

  // --- User select handlers for dropdown ---

  const handleUserSelect = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    const user = users.find((u) => String(u.id) === userId);
    setSelectedUser(user || null);
    if (user) {
      setNewUser({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        disabled: user.disabled || false,
        mobile: user.mobile || "",
        gender: user.gender || "",
        dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
      });
    }
  };

  // --- Product select handlers for dropdown ---

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const product = products.find((p) => String(p.id) === productId);
    setSelectedProduct(product || null);
    if (product) {
      setNewProduct({
        imgurl: product.imgurl || "",
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        company: product.company || "",
        type: product.type || "",
        banned: product.banned || false,
        rating: product.rating || 0.0,
      });
    }
  };

  // --- Modal close handlers for clicking outside

  const userModalRef = useRef(null);
  const productModalRef = useRef(null);

  useEffect(() => {
    if (!isUserModalOpen) return;

    function handleClickOutside(event) {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target)
      ) {
        setIsUserModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserModalOpen]);

  useEffect(() => {
    if (!isProductModalOpen) return;

    function handleClickOutside(event) {
      if (
        productModalRef.current &&
        !productModalRef.current.contains(event.target)
      ) {
        setIsProductModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductModalOpen]);

  return (
    <div className="admin-bg min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg admin-navbar shadow-sm mb-5">
        <div className="container">
          <Link className="navbar-brand fs-3 fw-bold text-light" to="/admin">
            Admin Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
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

      <div className="container pb-3">
        <h1
          className="text-center mt-5 display-4 fw-bold text-primary"
          id="welcome-admin"
        >
          Welcome, Admin!
        </h1>

        {/* Success and error messages */}
        {(userSuccessMessage || productSuccessMessage) && (
          <div
            className="alert alert-success alert-dismissible fade show"
            onClick={() => {
              setUserSuccessMessage(null);
              setProductSuccessMessage(null);
            }}
            role="alert"
          >
            {userSuccessMessage || productSuccessMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setUserSuccessMessage(null);
                setProductSuccessMessage(null);
              }}
            />
          </div>
        )}
        {(userError || productError || error) && (
          <div className="alert alert-danger" role="alert">
            {userError || productError || error}
          </div>
        )}

        {/* Users Section */}
        <div id="users-section" className="row mt-5">
          <div className="col-12">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-users d-flex align-items-center">
                <i className="bi bi-people me-2 fs-4" />
                <span className="fs-5">Manage Users</span>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Select User</label>
                  <select
                    className="form-select"
                    value={selectedUserId}
                    onChange={handleUserSelect}
                  >
                    <option value="">-- Select a User --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="btn-group w-100 mb-2" role="group">
                  <button
                    type="button"
                    className="btn admin-btn-primary flex-fill"
                    onClick={openAddUserModal}
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-secondary flex-fill"
                    onClick={() => {
                      fetchUsers();
                      setIsViewUsersOpen(true);
                    }}
                  >
                    View Users
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-warning flex-fill"
                    onClick={() =>
                      selectedUser && openEditUserModal(selectedUser)
                    }
                    disabled={!selectedUser}
                  >
                    Edit User
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-danger flex-fill"
                    onClick={() =>
                      selectedUser && handleDeleteUser(selectedUser.id)
                    }
                    disabled={!selectedUser}
                  >
                    Delete User
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-secondary flex-fill"
                    onClick={() =>
                      selectedUser &&
                      handleDisableUser(selectedUser.id, !selectedUser.disabled)
                    }
                    disabled={!selectedUser}
                  >
                    {selectedUser?.disabled ? "Enable User" : "Disable User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div id="products-section" className="row mt-5">
          <div className="col-12">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-products d-flex align-items-center">
                <i className="bi bi-box-seam me-2 fs-4" />
                <span className="fs-5">Manage Products</span>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Select Product</label>
                  <select
                    className="form-select"
                    value={selectedProductId}
                    onChange={handleProductSelect}
                  >
                    <option value="">-- Select a Product --</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (ID: {product.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="btn-group w-100 mb-2" role="group">
                  <button
                    type="button"
                    className="btn admin-btn-primary flex-fill"
                    onClick={openAddProductModal}
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-secondary flex-fill"
                    onClick={() => {
                      fetchProducts();
                      setIsViewProductsOpen(true);
                    }}
                  >
                    View Products
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-warning flex-fill"
                    onClick={() =>
                      selectedProduct && openEditProductModal(selectedProduct)
                    }
                    disabled={!selectedProduct}
                  >
                    Edit Product
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-danger flex-fill"
                    onClick={() =>
                      selectedProduct &&
                      handleDeleteProductById(selectedProduct.id)
                    }
                    disabled={!selectedProduct}
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
                <i className="bi bi-box-arrow-right me-2 fs-4" />
                <span className="fs-5">My Profile</span>
              </div>
              <div className="card-body text-center">
                {loading ? (
                  <button
                    type="button"
                    className="btn admin-btn-primary mt-2 rounded-pill"
                    disabled
                  >
                    Loading...
                  </button>
                ) : isProfileVisible ? (
                  <button
                    key="hide"
                    type="button"
                    className="btn admin-btn-primary mt-2 rounded-pill"
                    onClick={toggleProfile}
                  >
                    Hide Profile
                  </button>
                ) : (
                  <button
                    key="view"
                    type="button"
                    className="btn admin-btn-primary mt-2 rounded-pill"
                    onClick={toggleProfile}
                  >
                    My Profile
                  </button>
                )}

                {isProfileVisible && profile && (
                  <div ref={profileRef} className="mt-4 text-start">
                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile}>
                        <div className="mb-2">
                          <label>
                            <strong>Name:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProfile.name || ""}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label>
                            <strong>Email:</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={editProfile.email || ""}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label>
                            <strong>Mobile:</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editProfile.mobile || ""}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                mobile: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mb-2">
                          <label>
                            <strong>Date of Birth:</strong>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={editProfile.dob || ""}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                dob: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mb-2">
                          <label>
                            <strong>Gender:</strong>
                          </label>
                          <select
                            className="form-control"
                            value={editProfile.gender || ""}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <button type="submit" className="btn btn-success mt-3">
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary mt-3 ms-2"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <p>
                          <strong>Name:</strong> {profile.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {profile.email}
                        </p>
                        <p>
                          <strong>Role:</strong> {profile.role}
                        </p>
                        <p>
                          <strong>Mobile:</strong> {profile.mobile}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong>{" "}
                          {profile.dob
                            ? new Date(profile.dob).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Gender:</strong> {profile.gender || "N/A"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {profile.disabled ? "Disabled" : "Active"}
                        </p>

                        <button
                          className="btn btn-warning mt-3"
                          onClick={() => {
                            setEditProfile(profile);
                            setIsEditing(true);
                          }}
                        >
                          Edit Profile
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div id="logout-section" className="row mt-5">
          <div className="col-md-4 mx-auto">
            <div className="card admin-card border-0 shadow-lg">
              <div className="card-header admin-cardheader-logout d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-2 fs-4" />
                <span className="fs-5">Logout</span>
              </div>
              <div className="card-body text-center">
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

        {/* --- Users Modals --- */}
        {isUserModalOpen && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" ref={userModalRef}>
              <div className="modal-content">
                <div className="modal-header admin-cardheader-users">
                  <h5 className="modal-title">
                    {selectedUser ? "Edit User" : "Add User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsUserModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.name}
                      onChange={(e) => handleUserChange("name", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) =>
                        handleUserChange("email", e.target.value)
                      }
                      disabled={!!selectedUser} // Disable editing email on update
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.role}
                      onChange={(e) => handleUserChange("role", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.mobile}
                      onChange={(e) =>
                        handleUserChange("mobile", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.gender}
                      onChange={(e) =>
                        handleUserChange("gender", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newUser.dob}
                      onChange={(e) => handleUserChange("dob", e.target.value)}
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      id="disabled"
                      className="form-check-input"
                      checked={newUser.disabled}
                      onChange={(e) =>
                        handleUserChange("disabled", e.target.checked)
                      }
                    />
                    <label htmlFor="disabled" className="form-check-label">
                      Disabled
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn admin-btn-secondary"
                    onClick={() => setIsUserModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-primary"
                    onClick={handleCreateOrUpdateUser}
                  >
                    {selectedUser ? "Update User" : "Add User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Users View Modal --- */}
        {isViewUsersOpen && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header admin-cardheader-users">
                  <h5 className="modal-title">View Users</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsViewUsersOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {users.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Mobile</th>
                          <th>Gender</th>
                          <th>DOB</th>
                          <th>Disabled</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.mobile || "N/A"}</td>
                            <td>{user.gender || "N/A"}</td>
                            <td>
                              {user.dob
                                ? new Date(user.dob).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>{user.disabled ? "Yes" : "No"}</td>
                            <td>
                              <div className="d-flex gap-2 flex-wrap">
                                <button
                                  className="btn admin-btn-warning btn-sm"
                                  onClick={() => openEditUserModal(user)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn admin-btn-danger btn-sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn admin-btn-secondary btn-sm"
                                  onClick={() =>
                                    handleDisableUser(user.id, !user.disabled)
                                  }
                                >
                                  {user.disabled ? "Enable" : "Disable"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No users available.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn admin-btn-secondary"
                    onClick={() => setIsViewUsersOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Product Modals --- */}
        {isProductModalOpen && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" ref={productModalRef}>
              <div className="modal-content">
                <div className="modal-header admin-cardheader-products">
                  <h5 className="modal-title">
                    {selectedProduct ? "Edit Product" : "Add Product"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsProductModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Product add/edit form as in your code */}
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      // value={newProduct.imgurl}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.price}
                      min="0"
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.quantity}
                      min="0"
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newProduct.company}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newProduct.type}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, type: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={newProduct.banned}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          banned: e.target.checked,
                        })
                      }
                      id="bannedCheck"
                    />
                    <label htmlFor="bannedCheck" className="form-check-label">
                      Banned
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      step="0.1"
                      min="0"
                      max="5"
                      value={newProduct.rating}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn admin-btn-secondary"
                    onClick={() => setIsProductModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn admin-btn-primary"
                    onClick={handleAddOrUpdateProduct}
                  >
                    {selectedProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Products View Modal --- */}
        {isViewProductsOpen && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header admin-cardheader-products">
                  <h5 className="modal-title">View Products</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsViewProductsOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {products.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Company</th>
                          <th>Type</th>
                          <th>Banned</th>
                          <th>Rating</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.company || "N/A"}</td>
                            <td>{product.type || "N/A"}</td>
                            <td>{product.banned ? "Yes" : "No"}</td>
                            <td>{product.rating || 0.0}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn admin-btn-warning btn-sm"
                                  onClick={() => openEditProductModal(product)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn admin-btn-danger btn-sm"
                                  onClick={() =>
                                    handleDeleteProductById(product.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No products available.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn admin-btn-secondary"
                    onClick={() => setIsViewProductsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
