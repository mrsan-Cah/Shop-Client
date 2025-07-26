import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaPhone,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    navigate("/login", { state: { message: "Logged out successfully!" } });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="nav-link">SmartStore</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={22} color="#fff" /> : <FaBars size={22} color="#fff" />}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}><FaHome /> Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}><FaBoxOpen /> Shop</Link></li>
        <li><Link to="/contact" onClick={closeMenu}><FaPhone /> Contact</Link></li>
        <li><Link to="/cart" onClick={closeMenu}><FaShoppingBag />Cart</Link></li>

        {isLoggedIn ? (
          <>
            <li className="user"><FaUser /> {userName}</li>
            <li>
              <button onClick={logout} className="logout-btn"><FaSignOutAlt /> Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login" onClick={closeMenu} className="logout-btn">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
