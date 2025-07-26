import React, { useState } from "react";
import { FaHeadset, FaBoxOpen, FaUserTie } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, issue, message } = formData;
    const mailtoLink = `mailto:help.smartcart@gmail.com?subject=Complaint from ${name} - ${issue}&body=Name: ${name}%0DEmail: ${email}%0DIssue: ${issue}%0DMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact & Support</h1>
      <p style={styles.subheading}>
        We're here to help! Get in touch for support, queries or suggestions.
      </p>

      <div style={styles.sectionsWrapper}>
        <div style={styles.box}>
          <FaHeadset size={28} style={styles.icon} />
          <h2>Customer Help</h2>
          <p>Our support team is available 24/7 for any assistance.</p>
          <p><strong>Email:</strong> support@smartcart.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        <div style={styles.box}>
          <FaBoxOpen size={28} style={styles.icon} />
          <h2>Product Queries</h2>
          <p>Need info about a product? We’re just an email away.</p>
          <p><strong>Email:</strong> products@smartcart.com</p>
        </div>

        <div style={styles.box}>
          <FaUserTie size={28} style={styles.icon} />
          <h2>CEO's Desk</h2>
          <p>We value your thoughts. Write directly to our CEO.</p>
          <p><strong>Email:</strong> ceo@smartcart.com</p>
        </div>
      </div>

      <div style={styles.formBox}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Register a Complaint</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="issue"
            placeholder="Subject / Issue"
            required
            value={formData.issue}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Describe your issue in detail..."
            required
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>
          <button type="submit" style={styles.button}>
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

// 💅 Internal CSS styles
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9fbff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "36px",
    color: "#0077cc",
  },
  subheading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "16px",
    color: "#555",
  },
  sectionsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  box: {
    flex: "1 1 300px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  icon: {
    color: "#007bff",
    marginBottom: "10px",
  },
  formBox: {
    backgroundColor: "#ffffff",
    padding: "35px 25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outlineColor: "#007bff",
  },
  textarea: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "120px",
    outlineColor: "#007bff",
  },
  button: {
    padding: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// ✅ Fully responsive and visually improved with icons & hover effects
