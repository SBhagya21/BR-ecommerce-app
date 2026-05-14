import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


import store from "../assets/Pic3.webp";



import nikeImg from "../assets/nike.webp";
import adidasImg from "../assets/Adidas.jpg";
import levisImg from "../assets/levis.jpg";
import sheinImg from "../assets/shein.jpeg";
import gucciImg from "../assets/gucci.jpg";
import reebokImg from "../assets/reebok.jpg";

const brands = [
  { name: "nike", img: nikeImg },
  { name: "adidas", img: adidasImg },
  { name: "levis", img: levisImg },
  { name: "shein", img: sheinImg },
  { name: "gucci", img: gucciImg },
  { name: "reebok", img: reebokImg },
];

export default function Brands() {
  const [search, setSearch] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);


  const [inputValue, setInputValue] = useState("");

  // ✅ SCROLL WHEN SEARCH
  useEffect(() => {
    if (search) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [search]);

  // ✅ FILTER BRANDS
  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(rgba(141, 172, 230, 0.7), rgba(1, 7, 27, 0.7)),
            url(${store})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div ref={productRef}></div>

        {/* SEARCH */}
       <input
  type="text"
  placeholder="Search brands..."
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      setSearch(inputValue);

      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }}
  style={{
    width: "600px",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid darkblue",
    fontSize: "18px",
    outline: "none",
  }}
/>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "32px",
            fontFamily: "serif",
            fontWeight: "bold",
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          •Your Choice •Your Style •Your Brand
        </h1>
      </div>
  
      {/* BRAND LIST */}
      <div ref={resultRef} style={{ padding: "40px" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "40px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Brands
        </h2>

        {filteredBrands.length === 0 ? (
          <p style={{ textAlign: "center" }}>No brands found</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "35px",
              justifyContent: "center",

              

            }}
          >
            {filteredBrands.map((b) => (
              <Link
                key={b.name}
                to={`/brand/${b.name}`}
                style={{
                  width: "320px",
                  height: "220px",
                  border: "1px solid #ccc",
                  borderRadius: "15px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  transition: "0.3s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

                  
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
              
                {/* BRAND IMAGE */}
                <img
                  src={b.img}
                  alt={b.name}
                  style={{
                    width: "260px",
                    height: "160px",
                    objectFit: "contain",
                  }}
                />
              </Link>
              
            ))}
            
          </div>
        )}
      </div>
      </div>
      
  
  );
}