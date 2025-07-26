import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const logoutMessage = location.state?.message || ""; // Optional logout message

  // Redirect to home if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const login = async () => {
  if (!form.email || !form.password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const res = await axios.post("https://store-backend-sy48.onrender.com/api/auth/login", {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("authToken", res.data.token || "true");
    localStorage.setItem("userName", res.data.user?.name || "User");

    alert("Login successful!");
    navigate("/home");
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {logoutMessage && (
          <p style={styles.successMessage}>{logoutMessage}</p>
        )}

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

        <button style={styles.button} onClick={login}>Login</button>

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  linkText: {
    marginTop: "12px",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Login;
