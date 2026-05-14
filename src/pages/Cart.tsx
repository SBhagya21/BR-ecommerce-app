import { Link } from "react-router-dom";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

type Props = {
  cart: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

export default function Cart({ cart, increaseQty, decreaseQty }: Props) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkoutBtn = {
  marginTop: "15px",
  padding: "10px 15px",
  background: "#0e0238",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  transition: "all 0.3s ease",
};

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{             
                fontSize: "40px",
                fontFamily: "serif",
                fontWeight: "bold",
                textAlign: "center"}}>Cart</h2>

      {cart.length === 0 ? (
        <p style={{             
                fontSize: "20px",
                fontFamily: "serif",
                textAlign: "center"}}>Empty cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "12px",
                padding: "18px",
                border: "1px solid #071444",
                borderRadius: "8px",
                display: "flex",
                gap: "15px",
                alignItems: "center"
              }}
            >
              {/* 🖼️ PRODUCT IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              {/* DETAILS */}
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Rs. {item.price}</p>

                {/* ⭐ SIZE BADGE */}
                {item.size && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      background: "#0e0238",
                      color: "white",
                      borderRadius: "20px",
                      fontSize: "12px",
                      marginTop: "5px"
                    }}
                  >
                    Size: {item.size}
                  </span>
                )}

                {/* QUANTITY */}
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <hr />

          {/* TOTAL */}
          <h3>Total: Rs. {total}</h3>

          {/* CHECKOUT */}
          <Link to="/checkout">
  <button
    style={checkoutBtn}
    onMouseOver={(e) => {
      e.currentTarget.style.background = "#10258c";
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = "#0e0238";
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    Proceed to Checkout
  </button>
</Link>
         
        </>
      )}
    </div>
  );
}