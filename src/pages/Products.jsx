import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart, FaSearch } from "react-icons/fa";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

const Product = () => {
  const navigate = useNavigate();
  const { cart, setCart, wishlist, setWishlist } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const mainProduct = {
    id: 1,
    name: "Main Product",
    image: "https://m.media-amazon.com/images/I/41YSKIo6kwL._SX300_SY300_QL70_FMwebp_.jpg",
    price: "₹1,22,499",
    description: "The Lenovo Yoga Pro 7 (AMD Ryzen) is a premium ultrabook offering powerful performance with AMD Ryzen 7 processors, integrated Radeon graphics, a vibrant 2.5K display, and long battery life. Sleek and lightweight, it’s perfect for professionals and creators seeking portability, speed, and stunning visuals in a modern design..",
    category: "Featured"
  };

  const relatedProducts = [
    { id: 2, name: "Stylish Pen", image: "https://m.media-amazon.com/images/I/81iP9z00jML._AC_UL480_FMwebp_QL65_.jpg", price: "₹199", category: "Stationery" },
    { id: 3, name: "Office Notebook", image: "https://m.media-amazon.com/images/I/912+mfE2XBL._AC_UL480_FMwebp_QL65_.jpg", price: "₹149", category: "Stationery" },
    { id: 4, name: "Marker Set", image: "https://m.media-amazon.com/images/I/81luvvAbegL._AC_UL480_FMwebp_QL65_.jpg", price: "₹249", category: "Art Supplies" },
    { id: 5, name: "Ruler Pack", image: "https://m.media-amazon.com/images/I/71+ik77bEuL._AC_UL480_FMwebp_QL65_.jpg", price: "₹99", category: "Stationery" },
    { id: 6, name: "Sticky Notes", image: "https://m.media-amazon.com/images/I/81RFwqD8s2L._AC_UL480_FMwebp_QL65_.jpg", price: "₹79", category: "Office Supplies" },
    { id: 7, name: "Ball Pens", image: "https://m.media-amazon.com/images/I/71RVj1XNisL._AC_UL480_FMwebp_QL65_.jpg", price: "₹149", category: "Stationery" },
    { id: 8, name: "Drawing Pencils", image: "https://m.media-amazon.com/images/I/71WDH+nwjsL._AC_UL480_FMwebp_QL65_.jpg", price: "₹129", category: "Art Supplies" },
    { id: 9, name: "Stapler Set", image: "https://m.media-amazon.com/images/I/61+byUwEwEL._AC_UL480_FMwebp_QL65_.jpg", price: "₹199", category: "Office Supplies" },
    { id: 10, name: "Desk Organizer", image: "https://m.media-amazon.com/images/I/51dT1m433vL._AC_UL480_FMwebp_QL65_.jpg", price: "₹549", category: "Office Supplies" },
    { id: 11, name: "File Holder", image: "https://m.media-amazon.com/images/I/81MASzB24zL._AC_UL480_FMwebp_QL65_.jpg", price: "₹349", category: "Office Supplies" }
  ];

  const allCategories = ["All", ...new Set(relatedProducts.map(p => p.category))];

  const handleAddToCart = async (item) => {
    try {
      setCart([...cart, item]);
      alert(`${item.name} added to cart`);
      navigate("/cart");

      await axios.post("http://localhost:5000/api/cart", item);
    } catch (err) {
      console.error("Error saving to cart:", err.message);
    }
  };

  const handleAddToWishlist = async (item) => {
    try {
      setWishlist([...wishlist, item]);
      alert(`${item.name} added to wishlist`);

      await axios.post("http://localhost:5000/api/wishlist", item);
    } catch (err) {
      console.error("Error saving to wishlist:", err.message);
    }
  };

  const filteredProducts = relatedProducts.filter(p => {
    return (
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 SmartStore</h1>

      {/* Search & Filter */}
      <div style={styles.topBar}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.dropdown}
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Main Product */}
      <h2 style={styles.section}>✨ Featured Product</h2>
      <div style={styles.mainProduct}>
        <img src={mainProduct.image} alt={mainProduct.name} style={styles.image} />
        <div style={styles.details}>
          <h3>{mainProduct.name}</h3>
          <p>{mainProduct.description}</p>
          <p style={styles.price}>{mainProduct.price}</p>
          <button onClick={() => handleAddToCart(mainProduct)} style={styles.button}>
            <FaCartPlus style={styles.icon} /> Add to Cart
          </button>
          <button onClick={() => handleAddToWishlist(mainProduct)} style={styles.wishlistButton}>
            <FaHeart style={styles.icon} /> Wishlist
          </button>
        </div>
      </div>

      {/* Related Products */}
      <h2 style={styles.section}>🧾 Related Products</h2>
      <div style={styles.relatedContainer}>
        {filteredProducts.map(item => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.cardImage} />
            <h4>{item.name}</h4>
            <p style={styles.price}>{item.price}</p>
            <button onClick={() => handleAddToCart(item)} style={styles.buttonSmall}>
              <FaCartPlus style={styles.iconSmall} /> Cart
            </button>
            <button onClick={() => handleAddToWishlist(item)} style={styles.wishlistSmall}>
              <FaHeart style={styles.iconSmall} /> Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #f5f7fa, #e4ebf5)",
    minHeight: "100vh",
    color: "#2c3e50"
  },
  title: {
    textAlign: "center",
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "40px",
    color: "#1a237e",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(6px)",
    borderRadius: "12px",
    padding: "10px 15px",
    border: "1px solid #ccc",
    flex: 1,
    maxWidth: "350px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
  },
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    background: "transparent"
  },
  dropdown: {
    padding: "10px",
    fontSize: "15px",
    borderRadius: "10px",
    background: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer"
  },
  mainProduct: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    background: "#ffffffc7",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)"
  },
  image: {
    width: "360px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.05)"
    }
  },
  details: {
    flex: 1,
    minWidth: "300px"
  },
  price: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#43a047",
    margin: "20px 0"
  },
  button: {
    padding: "12px 24px",
    background: "linear-gradient(90deg, #1e88e5, #1976d2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "15px",
    transition: "all 0.3s ease-in-out"
  },
  wishlistButton: {
    padding: "12px 24px",
    background: "linear-gradient(90deg, #ec407a, #d81b60)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out"
  },
  relatedContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px",
    marginTop: "50px"
  },
  card: {
    background: "linear-gradient(to bottom, #ffffff, #f7f7f7)",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    position: "relative"
  },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
    marginBottom: "12px"
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#222"
  },
  buttonSmall: {
    padding: "8px 14px",
    fontSize: "13px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "5px",
    transition: "0.2s"
  },
  wishlistSmall: {
    padding: "8px 14px",
    fontSize: "13px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "5px",
    transition: "0.2s"
  },
  badgeSale: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  badgeNew: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  ratingStars: {
    color: "#ffc107",
    fontSize: "16px",
    marginTop: "6px"
  },
  testimonial: {
    marginTop: "60px",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.08)"
  },
  review: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "20px"
  },
  reviewer: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333"
  },
  tooltip: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    position: "absolute",
    zIndex: "10",
    top: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap"
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000
  },
  modalContent: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    zIndex: 1001,
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  }
};


export default Product;
