import { useNavigate } from "react-router-dom";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  cart: CartItem[];
};

export default function Checkout({ cart }: Props) {
  const navigate = useNavigate();

  // CUSTOMER
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // PAYMENT
  const [payment, setPayment] = useState("Cash on Delivery");

  // BANK
  const [bank, setBank] = useState("");

  // CARD
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // ERRORS
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bankError, setBankError] = useState("");
  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ================= VALIDATION =================
  const handleOrder = () => {
    setNameError("");
    setAddressError("");
    setPhoneError("");
    setBankError("");
    setCardError("");
    setExpiryError("");
    setCvvError("");

    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      valid = false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Phone must be 10 digits");
      valid = false;
    }

    if (payment === "Card Payment") {
      if (!bank) {
        setBankError("Select a bank");
        valid = false;
      }

      if (!/^[0-9]{16}$/.test(cardNumber)) {
        setCardError("Card must be 16 digits");
        valid = false;
      }

      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
        setExpiryError("MM/YY format required");
        valid = false;
      }

      if (!/^[0-9]{3}$/.test(cvv)) {
        setCvvError("CVV must be 3 digits");
        valid = false;
      }
    }

    if (!valid) return;

    alert("✅ Order Placed Successfully!");
    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload();
  };

  // ================= ROW STYLE =================
  const row = {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    marginBottom: "10px",

  };

  const label = {
    width: "90px",
    fontWeight: "bold",
  };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const errStyle = {
    color: "red",
    fontSize: "13px",
    marginBottom: "8px",
  };

  const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#0e0238",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0e0238" }}>
        Checkout
      </h1>

      {/* NAME */}
      <div style={row}>
        <label style={label}>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </div>
      {nameError && <p style={errStyle}>{nameError}</p>}

      {/* ADDRESS */}
      <div style={row}>
        <label style={label}>Address:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
      </div>
      {addressError && <p style={errStyle}>{addressError}</p>}

      {/* PHONE */}
      <div style={row}>
        <label style={label}>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
      </div>
      {phoneError && <p style={errStyle}>{phoneError}</p>}

      {/* PAYMENT */}
      <div style={row}>
        <label style={label}>Payment:</label>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} style={inputStyle}>
          <option>Cash on Delivery</option>
          <option>Card Payment</option>
        </select>
      </div>

      {/* CARD BOX */}
      {payment === "Card Payment" && (
        <div
          style={{
            background: "#8ac1f4",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          {/* BANK */}
          <div style={row}>
            <label style={label}>Bank:</label>
            <select value={bank} onChange={(e) => setBank(e.target.value)} style={inputStyle}>
              <option value="">Select Bank</option>
              <option>Bank of Ceylon</option> 
              <option>People's Bank</option> 
              <option>Commercial Bank</option> 
              <option>Sampath Bank</option>
               <option>HNB</option>
                <option>Seylan Bank</option>
            </select>
          </div>
          {bankError && <p style={errStyle}>{bankError}</p>}

          {/* CARD */}
          <div style={row}>
            <label style={label}>Card No:</label>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={inputStyle} />
          </div>
          {cardError && <p style={errStyle}>{cardError}</p>}

          {/* EXPIRY */}
          <div style={row}>
            <label style={label}>Expiry:</label>
            <input value={expiry} onChange={(e) => setExpiry(e.target.value)} style={inputStyle} />
          </div>
          {expiryError && <p style={errStyle}>{expiryError}</p>}

          {/* CVV */}
          <div style={row}>
            <label style={label}>CVV:</label>
            <input value={cvv} onChange={(e) => setCvv(e.target.value)} style={inputStyle} />
          </div>
          {cvvError && <p style={errStyle}>{cvvError}</p>}
        </div>
      )}

      {/* TOTAL */}
      <h2 style={{ marginTop: "15px" }}>Total: Rs. {total}</h2>

      {/* BUTTON */}
     <button
  onClick={handleOrder}
  style={buttonStyle}
  onMouseOver={(e) => {
    (e.currentTarget.style.background = "#10258c");
    (e.currentTarget.style.transform = "scale(1.03)");
  }}
  onMouseOut={(e) => {
    (e.currentTarget.style.background = "#0e0238");
    (e.currentTarget.style.transform = "scale(1)");
  }}
>
  Place Order
</button>
    </div>
  );
}