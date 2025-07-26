import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import './styles.css';

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(GlobalContext);

  const products = [
    {
      img: "https://m.media-amazon.com/images/I/81iP9z00jML._AC_UL480_FMwebp_QL65_.jpg",
      name: "Classic",
      price: "25.00",
      brand: "Coffe"
    },
    {
      img: "https://m.media-amazon.com/images/I/81MASzB24zL._AC_UL480_FMwebp_QL65_.jpg",
      name: "File Folder",
      price: "40.00",
      brand: "Levi's"
    },
    {
      img: "https://m.media-amazon.com/images/I/912+mfE2XBL._AC_UL480_FMwebp_QL65_.jpg",
      name: "Classic Note Book",
      price: "120.00",
      brand: "H&M"
    },
    {
      img: "https://m.media-amazon.com/images/I/71+ik77bEuL._AC_UL480_FMwebp_QL65_.jpg",
      name: "Ruler Pack",
      price: "35.00",
      brand: "Natraj"
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Discover top-quality products at unbeatable prices.</p>
          <button className="hero-btn" onClick={() => navigate("/product")}>
            Shop Now
          </button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="product1" className="section-p1">
        <h2 className="product-title">Our Products</h2>
        <div className="pro-container">
          {products.map((product, idx) => (
            <div className="pro-card" key={idx}>
              <img src={product.img} alt={product.name} className="product-img" />
              <div className="des">
                <span className="brand">{product.brand}</span>
                <h5 className="product-name">{product.name}</h5>
                <div className="rating">
                  {[...Array(4)].map((_, i) => (
                    <i className="fas fa-star" key={i} />
                  ))}
                  <i className="far fa-star" />
                </div>
                <h4 className="price">${product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletters</h4>
          <p>
            Get E-mail updates about our latest shop and <span>special offers.</span>
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="santhanaezhilanp@gmail.com" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-p1">
  <div className="col">
    <h4>Contact</h4>
    <p><strong>Address:</strong> C.Abdul Hakeem College of Engineering and Technology, Ranipet</p>
    <p><strong>Phone:</strong>  (+91) 9361663265</p>
    <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Fri</p>
  </div>

   <div className="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">View Cart</a>
        </div>

        <div className="install">
    <h4>Install App</h4>
    <p>From App Store or Google Play</p>
    <div className="row">
      <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
        <img src="https://tse4.mm.bing.net/th/id/OIP.3ZgbHPwrR4rF9dJuFZpYlwHaCl?w=343&h=121&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="App Store" />
      </a>
      <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
        <img src="https://tse1.mm.bing.net/th/id/OIP.BKKGWXJXykRVpFzlhatyYwHaCl?w=301&h=122&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Google Play" />
      </a>
    </div>
  </div>

        <div className="copyright">
          <p>@ 2025, Santhana Ezhilan.P - CSE22691 Project</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
