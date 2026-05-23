import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Brands from "./pages/Brands";
import BrandProducts from "./pages/BrandProducts";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";

import logo1 from "./assets/logo1.png";

// ================= TYPES =================
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  brand?: string;
  rating: number;
  category: string;
  size?: string;
};

type CartItem = Product & {
  quantity: number;
};

function App() {
  // ================= CART =================
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================= ADD TO CART =================
  const addToCart = (product: Product) => {
    const exist = cart.find(
      (item) => item.id === product.id && item.size === product.size
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setMessage("✔ Successfully Added to Cart");

    setTimeout(() => setMessage(""), 2000);
  };

  const increaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

return (
  <div className="app-container">
        {showLogo && (
          <div
            onClick={() => setShowLogo(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <img
              src={logo1}
              alt="big logo"
              style={{
                width: "300px",
                height: "250px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* ================= MESSAGE ================= */}
        {message && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#deedf8",
              color: "#0e0238",
              padding: "12px 18px",
              borderRadius: "8px",
              zIndex: 9999,
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}

        {/* ================= NAVBAR ================= */}
        <nav
          style={{
            padding: "20px",
            background: "#0e0238",
            color: "lightblue",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src={logo1}
              alt="logo"
              onClick={(e) => {
                e.preventDefault();
                setShowLogo(true);
              }}
              style={{
                width: "55px",
                height: "45px",
                borderRadius: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </Link>

          <div style={{ display: "flex", gap: "20px" }}>
            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? "darkred" : "lightblue",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}>
              Home
            </NavLink>

            <NavLink to="/brands" style={({ isActive }) => ({
              color: isActive ? "darkred" : "lightblue",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}>
              Brands
            </NavLink>

            <NavLink to="/contact" style={({ isActive }) => ({
              color: isActive ? "darkred" : "lightblue",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}>
              Contact
            </NavLink>

            <NavLink to="/cart" style={({ isActive }) => ({
              color: isActive ? "red" : "lightblue",
              textDecoration: "none",
              fontWeight: "bold",
            })}>
              🛒 ({cart.reduce((s, i) => s + i.quantity, 0)})
            </NavLink>
          </div>
        </nav>

        {/* ================= PAGE CONTENT (IMPORTANT FIX) ================= */}
        <div className="page-content">
          <Routes>
            {/* 🔥 HOME FIRST ALWAYS */}
            <Route path="/" element={<Home addToCart={addToCart} />} />

            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:name" element={<BrandProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} increaseQty={increaseQty} decreaseQty={decreaseQty} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:type" element={<Category addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          </Routes>
        </div>

        {/* ================= FOOTER ================= */}
        <Footer />

      </div>
    
  );
}

export default App;