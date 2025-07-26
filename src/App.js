import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserList from "./pages/UserList";
import Contact from './pages/Contact';
import "./styles.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/contact" element={<Contact />} /> {/* ✅ Added route */}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
