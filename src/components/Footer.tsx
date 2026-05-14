import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState("");

  return (
    <footer
      style={{
        marginTop: "0.1px",
        padding: "20px",
        background: "#0e0238",
        color: "lightblue",
        textAlign: "center",
      }}
    >
      {/* FOOTER LINKS */}
      <div style={{ marginTop: "20px" }}>

        <Link
          to="/"
          style={{
            ...linkStyle,
            color: hovered === "home" ? "lightblue" : "white",
          }}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered("")}
        >
          Home
        </Link>

        {" | "}

        <Link
          to="/brands"
          style={{
            ...linkStyle,
            color: hovered === "brands" ? "lightblue" : "white",
          }}
          onMouseEnter={() => setHovered("brands")}
          onMouseLeave={() => setHovered("")}
        >
          Brands
        </Link>

        {" | "}

        <Link
          to="/contact"
          style={{
            ...linkStyle,
            color: hovered === "contact" ? "lightblue" : "white",
          }}
          onMouseEnter={() => setHovered("contact")}
          onMouseLeave={() => setHovered("")}
        >
          Contact
        </Link>

      </div>

      <br />
      <br />

      <h3>BR Clothing Store</h3>

      <p style={{ marginTop: "10px" }}>
        © 2026 All Rights Reserved
      </p>
    </footer>
  );
}

const linkStyle = {
  textDecoration: "none",
  margin: "0 5px",
  transition: "0.3s",
  fontWeight: "bold",
};