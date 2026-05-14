import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function Category({ addToCart }: any) {
  const { type } = useParams();

  console.log("URL param:", type);

  const filtered = products.filter(
    (p) =>
      p.category &&
      type &&
      p.category.toLowerCase() === type.toLowerCase()
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>{type?.toUpperCase()} PRODUCTS</h2>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}