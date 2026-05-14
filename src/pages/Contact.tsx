import store from "../assets/Pic6.jpg";
import "../index.css";
import { useState } from "react";

export default function Contact() {

  const [success, setSuccess] = useState(false);

  // FORM STATE (IMPORTANT FIX)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT FORM
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // SHOW SUCCESS MESSAGE
    setSuccess(true);

    // RESET FORM (THIS FIXES YOUR ISSUE)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    // HIDE MESSAGE AFTER 3 SEC
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="contact-page">

      {/* SUCCESS MESSAGE */}
      {success && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "lightblue",
            color: "dakblue",
            padding: "15px 25px",
            borderRadius: "10px",
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 5px 15px rgba(16, 28, 158, 0.3)"
          }}
        >
          ✔ Message Sent Successfully!
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            backgroundColor: "white",
            borderRadius: "25px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            boxShadow: "0 30px 40px rgba(182, 179, 242, 0.3)",
          }}
        >

          {/* LEFT SIDE */}
          <div
            style={{
              background: `
                linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)),
                url(${store})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              padding: "60px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "25px",
            }}
          >
            <h1 style={{ fontSize: "48px", margin: 0 }}>Contact Us</h1>

            <p style={{ fontSize: "18px", color: "#e2e8f0" }}>
            We would love to hear from you. 
            Whether you have a question about products, pricing, orders, or anything else, our team is ready to answer all your questions.
            </p>

            <div>
              <h3>📍 Address</h3>
              <p>Colombo, Sri Lanka</p>
<br/>
              <h3>📞 Phone</h3>
              <p>+94 71 234 5016</p>
<br/>

              <h3>✉ Email</h3>
              <p>rbclothing@gmail.com</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ padding: "60px 50px" }}>

            <h2 style={{ fontSize: "38px", marginBottom: "30px" }}>
              Send Message
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={inputStyle}
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={inputStyle}
              />

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={inputStyle}
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                style={{ ...inputStyle, resize: "none" }}
              />

              <button
                type="submit"
                style={{
                  padding: "16px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#0f172a",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  outline: "none",
};