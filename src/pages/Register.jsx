import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const navigate = useNavigate();

 const register = async () => {
  if (!form.agree) {
    alert("Please agree to the terms and conditions.");
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post("https://store-backend-1-l2mm.onrender.com/api/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    alert("Registration successful! Please log in.");
    navigate("/login");
  } catch (err) {
    console.error("Registration failed", err);
    alert("Registration failed: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create an Account</h2>
        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
          />
          <span style={{ marginLeft: "8px" }}>I agree to the terms and conditions</span>
        </label>
        <button style={styles.button} onClick={register}>Register</button>
        <p style={styles.footerText}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9",
  },
  formContainer: {
    width: "350px",
    padding: "30px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
};

export default Register;
