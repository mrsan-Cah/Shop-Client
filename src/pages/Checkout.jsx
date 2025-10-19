import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const Checkout = () => {
  const { cart, user } = useContext(GlobalContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    fullName: "",
    cardNumber: "",
    cvv: "",
    expiry: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const discount = 30;
  const estimatedDelivery = "3 - 5 Days";

  const calculateTotal = () =>
    cart.reduce(
      (sum, item) =>
        sum + parseInt(item.price.replace(/[₹,]/g, "")) * (item.quantity || 1),
      0
    );

  const subtotal = calculateTotal();
  const finalTotal = subtotal - discount;

  const handleOrder = async () => {
    if (!address.trim()) return alert("Please enter delivery address.");
    if (!paymentMethod) return alert("Please select a payment method.");

    if (paymentMethod === "upi" && !upiId.trim())
      return alert("Please enter UPI ID.");

    if (paymentMethod === "card") {
      const { fullName, cardNumber, cvv, expiry } = cardDetails;
      if (!fullName || !cardNumber || !cvv || !expiry)
        return alert("Please complete all card details.");
      if (cardNumber.length !== 16 || isNaN(cardNumber))
        return alert("Card number must be 16 digits.");
      if (cvv.length !== 3 || isNaN(cvv)) return alert("CVV must be 3 digits.");
    }

    const orderData = {
      user: user?.name || "Guest",
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: parseInt(item.price.replace(/[₹,]/g, ""))
      })),
      address,
      paymentMethod,
      paymentDetails:
        paymentMethod === "upi"
          ? { upiId }
          : paymentMethod === "card"
          ? { ...cardDetails }
          : {},
      subtotal,
      discount,
      total: finalTotal,
      estimatedDelivery,
      createdAt: new Date()
    };

    try {
      const res = await fetch("https://store-backend-1-l2mm.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setOrderInfo(orderData);
        setOrderPlaced(true);
      } else {
        const error = await res.json();
        alert(`Failed to place order: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (orderPlaced && orderInfo) {
    return (
      <div style={styles.invoiceContainer}>
        <h2 style={{ color: "green", fontSize: "26px", marginBottom: "10px" }}>
          ✅ Order Confirmed
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Your order will arrive in <strong>{orderInfo.estimatedDelivery}</strong>.
        </p>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Customer Info</h3>
          <p><strong>Name:</strong> {orderInfo.user}</p>
          <p><strong>Address:</strong> {orderInfo.address}</p>
          <p><strong>Payment:</strong> {orderInfo.paymentMethod.toUpperCase()}</p>
          <p><strong>Date:</strong> {new Date(orderInfo.createdAt).toLocaleString()}</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          {orderInfo.items.map((item, i) => (
            <div key={i} style={styles.itemRow}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div style={styles.summaryRow}><b>Subtotal:</b> ₹{orderInfo.subtotal}</div>
          <div style={styles.summaryRow}><b>Discount:</b> -₹{orderInfo.discount}</div>
          <div style={styles.summaryRow}><b>Total:</b> ₹{orderInfo.total}</div>
        </div>

        <button onClick={handlePrint} style={styles.printBtn}>🧾 Print Invoice</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>

      {cart.map((item, index) => (
        <div key={index} style={styles.cartItem}>
          <div>
            <p style={styles.itemName}>{item.name}</p>
            <p style={styles.itemQuantity}>Qty: {item.quantity || 1}</p>
          </div>
          <p style={styles.itemPrice}>
            ₹{parseInt(item.price.replace(/[₹,]/g, "")) * (item.quantity || 1)}
          </p>
        </div>
      ))}

      <div style={styles.summary}>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Discount: -₹{discount}</p>
        <p style={{ fontWeight: "bold" }}>Total: ₹{finalTotal}</p>
        <p style={{ color: "green" }}>Delivery: {estimatedDelivery}</p>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Delivery Address:</label>
        <textarea
          style={styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Payment Method:</label>
        <select
          style={styles.select}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {paymentMethod === "upi" && (
        <input
          style={styles.input}
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
      )}

      {paymentMethod === "card" && (
        <div>
          <input
            style={styles.input}
            placeholder="Full Name"
            value={cardDetails.fullName}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, fullName: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cvv: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Expiry (MM/YY)"
            value={cardDetails.expiry}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, expiry: e.target.value })
            }
          />
        </div>
      )}

      <button onClick={handleOrder} style={styles.orderBtn}>Place Order</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },
  itemName: { fontWeight: "500" },
  itemQuantity: { fontSize: "13px", color: "#666" },
  itemPrice: { fontWeight: "600" },
  summary: {
    marginTop: "20px",
    fontSize: "16px",
    borderTop: "1px dashed #ccc",
    paddingTop: "10px"
  },
  inputGroup: {
    marginTop: "20px"
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "10px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  orderBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "20px",
    fontSize: "16px",
    cursor: "pointer"
  },
  invoiceContainer: {
    padding: "40px",
    maxWidth: "700px",
    margin: "40px auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  section: {
    marginTop: "25px",
    borderTop: "1px solid #ddd",
    paddingTop: "15px"
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "18px"
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "500",
    marginTop: "6px"
  },
  printBtn: {
    marginTop: "30px",
    padding: "12px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Checkout;
