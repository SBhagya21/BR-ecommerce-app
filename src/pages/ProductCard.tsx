import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: any) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        borderRadius: "15px",
        overflow: "hidden",
        background: "white",
        cursor: "pointer",

        /* ✅ smooth animation */
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}

      /* ✅ hover effect */
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow =
          "0 15px 30px rgba(24, 20, 147, 0.35)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover"
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* CONTENT */}
      <div style={{ padding: "10px", textAlign: "center" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
          {product.name}
        </h3>

        <p style={{ color: "gray" }}>Rs. {product.price}</p>

        {/* RATING */}
        <div style={{ color: "gold", marginTop: "5px" }}>
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          style={{
            marginTop: "10px",
            padding: "8px",
            width: "100%",
            border: "none",
            borderRadius: "8px",
            background: "#0f172a",
            color: "white",
            cursor: "pointer"
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
}