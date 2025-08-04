import React from "react";
import { useCart } from "./cartcontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const goToPayment = () => {
    navigate("/payment", { state: { total } }); // pass total using state
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/user")}>
          ← Back
        </button>
        <h3>
          🛒 <strong>My Cart</strong>
        </h3>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-3 px-3">
            <h5>Total: ₹{total}</h5>
            <button className="btn btn-success" onClick={goToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;