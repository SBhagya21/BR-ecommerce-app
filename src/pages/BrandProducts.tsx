import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function BrandProducts({ addToCart }: any) {
  const { name } = useParams();

  const filtered = products.filter(
    (p) => p.brand?.toLowerCase() === name?.toLowerCase()
  );

  return (
    <div
  style={{
    padding: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
    
  }}
>
      
      <h2  style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "40px",
            textAlign: "center",
            marginBottom: "40px",
          }}
          >{name?.toUpperCase()} </h2>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ 
           gap: "20px",
            flexWrap: "wrap",
       
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px"
             
         }}>

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