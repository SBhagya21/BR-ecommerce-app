import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useState } from "react";

export default function ProductDetails({ addToCart }: any) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1); // ⭐ FIX ADDED

  if (!product) {
    return (
      <h2 style={{ padding: "20px", textAlign: "center" }}>
        Product not found
      </h2>
    );
  }

  const isShoe = product.category === "others";

  const sizes = isShoe
    ? ["6", "7", "8", "9", "10"]
    : ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      size,
      quantity: qty, // ⭐ SEND QUANTITY
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "40px",
        background: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "450px",
          background: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        {/* NAME */}
        <h1 style={{ marginTop: "15px", color: "#0e0238" }}>
          {product.name}
        </h1>

        {/* PRICE */}
        <p style={{ fontSize: "22px", color: "#0e0238" }}>
          Rs. {product.price}
        </p>

        {/* RATING */}
        <div style={{ color: "gold", fontSize: "18px" }}>
          {"★".repeat(product.rating || 5)}
          {"☆".repeat(5 - (product.rating || 5))}
        </div>

        {/* SIZE */}
        <div style={{ marginTop: "15px" }}>
          <p style={{ fontWeight: "bold" }}>Select Size</p>

          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                margin: "5px",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                border:
                  size === s ? "2px solid #0e0238" : "1px solid gray",
                background: size === s ? "#0e0238" : "white",
                color: size === s ? "white" : "black",
                transition: "0.3s",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* QUANTITY */}
        <div style={{ marginTop: "15px" }}>
          <p style={{ fontWeight: "bold" }}>Quantity</p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <button
              onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              −
            </button>

            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {qty}
            </span>

            <button
              onClick={() => setQty((q) => q + 1)}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              +
            </button>
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#0e0238",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "0.3s",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}