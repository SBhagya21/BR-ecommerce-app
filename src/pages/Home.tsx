import { products } from "../data/products";
import ProductCard from "./ProductCard";
import store from "../assets/Pic3.webp";

import { useState, useRef, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand?: string;
  rating?: number;
  category?: string;
};

type Props = {
  addToCart: (product: Product) => void;
};

export default function Home({ addToCart }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const productRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL
  useEffect(() => {
    if (search || category !== "all") {
      productRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [search, category]);

  // FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all"
        ? true
        : p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* HERO */}
      <div
        style={{
          backgroundImage: `
            radial-gradient(
              circle at center,
              rgba(1, 7, 27, 0.85) 0%,
              rgba(8, 27, 63, 0.6) 60%,
              rgba(8, 27, 63, 0.3) 70%,
              rgba(0, 0, 0, 0.1) 100%
            ),
            url(${store})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "590px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}
        >
          {/* TITLE */}
          <div>
            <h1
              style={{
                fontSize: "120px",
                fontFamily: "serif",
                fontWeight: "bold",
                color: "white",
                textShadow: "3px 2px 5px lightblue",
                margin: 0
              }}
            >
              BR Clothing Store
            </h1>

            <h5
              style={{
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                color: "white",
                textShadow: "3px 2px 5px lightblue",
                textAlign: "center"
              }}
            >
              •Your Choice •Your Style •Your Brand
            </h5>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div ref={productRef} style={{ padding: "20px" }}>

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            backgroundColor: "rgba(135, 169, 232, 0.6)",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            width: "100%"
          }}
        >
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "3px solid darkblue",
              width: "500px",
              fontSize: "18px"
            }}
          />

          {/* FILTER */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "3px solid darkblue",
              fontSize: "18px"
            }}
          >
            <option value="all">All</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* ================= WOMEN SECTION ================= */}
        {(category === "all" || category === "women") && (
          <>
            <h2
              style={{
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "40px"
              }}
            >
              Women
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 250px)",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px"
              }}
            >
              {filteredProducts
                .filter((p) => p.category === "women")
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </>
        )}

        {/* ================= MEN SECTION ================= */}
        {(category === "all" || category === "men") && (
          <>
            <h2
              style={{
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "50px"
              }}
            >
              Men
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 250px)",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px"
              }}
            >
              {filteredProducts
                .filter((p) => p.category === "men")
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </>
        )}

        {/* ================= KIDS SECTION ================= */}
        {(category === "all" || category === "kids") && (
          <>
            <h2
              style={{
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "50px"
              }}
            >
              Kids
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 250px)",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px"
              }}
            >
              {filteredProducts
                .filter((p) => p.category === "kids")
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </>
        )}

        {/* ================= OTHERS SECTION ================= */}
        {(category === "all" || category === "others") && (
          <>
            <h2
              style={{
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "50px"
              }}
            >
              Others
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 250px)",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px",
                paddingBottom: "50px"
              }}
            >
              {filteredProducts
                .filter((p) => p.category === "others")
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}