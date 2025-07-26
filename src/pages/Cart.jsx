import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleRemove = (indexToRemove) => {
    const updatedCart = cart.filter((_, i) => i !== indexToRemove);
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, (updatedCart[index].quantity || 1) + delta);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ""));
      const qty = item.quantity || 1;
      return sum + price * qty;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const fakeDiscount = totalPrice > 1000 ? 150 : 50;
  const grandTotal = totalPrice - fakeDiscount;
  const estimatedDelivery = "2 - 4 Days";

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cart.map((item, index) => {
              const price = parseInt(item.price.replace(/[₹,]/g, ""));
              const qty = item.quantity || 1;
              return (
                <li key={index} style={styles.item}>
                  <img src={item.image} alt={item.name} style={styles.image} />
                  <div style={styles.details}>
                    <h3 style={styles.name}>{item.name}</h3>
                    <p style={styles.info}><strong>Price:</strong> ₹{price.toLocaleString()}</p>
                    <p style={styles.info}><strong>Total:</strong> ₹{(price * qty).toLocaleString()}</p>

                    <div style={styles.qtyRow}>
                      <span style={styles.qtyLabel}>Qty:</span>
                      <button onClick={() => handleQuantityChange(index, -1)} style={styles.qtyBtn}>-</button>
                      <span style={styles.qtyCount}>{qty}</span>
                      <button onClick={() => handleQuantityChange(index, 1)} style={styles.qtyBtn}>+</button>
                    </div>

                    <button
                      style={styles.removeBtn}
                      onClick={() => handleRemove(index)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>🧾 Order Summary</h2>
            <div style={styles.priceLine}>
              <span>Subtotal:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div style={styles.priceLine}>
              <span>Discount:</span>
              <span style={{ color: "#2e7d32" }}>-₹{fakeDiscount}</span>
            </div>
            <div style={styles.priceLine}>
              <span>Delivery:</span>
              <span>Free</span>
            </div>
            <div style={styles.priceLine}>
              <span>Estimated Delivery:</span>
              <span>{estimatedDelivery}</span>
            </div>
            <hr style={{ margin: "15px 0" }} />
            <div style={{ ...styles.priceLine, fontSize: "20px", fontWeight: "bold" }}>
              <span>Grand Total:</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button
              style={styles.buyBtn}
              onClick={() => navigate("/checkout")}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1976d2")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2196f3")}
            >
              🛍️ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "50px 5%",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9fbfc",
    minHeight: "100vh",
    color: "#2c3e50",
  },
  title: {
    fontSize: "36px",
    color: "#222",
    marginBottom: "35px",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "1px",
  },
  empty: {
    fontSize: "20px",
    color: "#999",
    textAlign: "center",
    marginTop: "60px",
    fontStyle: "italic",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "40px",
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "30px",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    gap: "20px",
  },
  itemHover: {
    transform: "scale(1.01)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },
  image: {
    width: "140px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  details: {
    flex: 1,
  },
  name: {
    margin: "0 0 12px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#1f1f1f",
  },
  info: {
    margin: "6px 0",
    fontSize: "16px",
    color: "#555",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "12px",
  },
  qtyLabel: {
    marginRight: "10px",
    fontSize: "15px",
  },
  qtyBtn: {
    padding: "6px 14px",
    fontSize: "17px",
    background: "#e0e0e0",
    border: "1px solid #bbb",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "0 6px",
    transition: "all 0.25s ease",
  },
  qtyBtnHover: {
    backgroundColor: "#cfd8dc",
  },
  qtyCount: {
    fontSize: "16px",
    width: "32px",
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
  },
  removeBtn: {
    marginTop: "16px",
    padding: "8px 16px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "background 0.3s ease",
    boxShadow: "0 4px 10px rgba(255,77,79,0.1)",
  },
  removeBtnHover: {
    backgroundColor: "#d63031",
  },
  summary: {
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
    maxWidth: "480px",
    marginLeft: "auto",
    position: "sticky",
    top: "20px",
  },
  summaryTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    borderBottom: "2px dashed #ddd",
    paddingBottom: "10px",
    color: "#2c3e50",
  },
  priceLine: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    fontSize: "16px",
    color: "#555",
  },
  priceTotal: {
    fontWeight: "700",
    color: "#222",
  },
  buyBtn: {
    marginTop: "30px",
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
  },
  buyBtnHover: {
    backgroundColor: "#0d47a1",
  },
};


export default Cart;
