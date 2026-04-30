"use client";

import { useState } from "react";
import resortData from "@/data/resort-data.json";

export default function Contact() {
  const { resort } = resortData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    setLoading(false);
    if (data.success) {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-section)",
      }}
    >
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <p
              style={{
                color: "var(--primary-color)",
                fontSize: "var(--fs-sm)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 600,
                marginBottom: "var(--space-sm)",
              }}
            >
              Get in Touch
            </p>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, var(--fs-xxl))",
                color: "var(--text-dark)",
                marginBottom: "var(--space-md)",
                lineHeight: 1.2,
              }}
            >
              Plan Your Perfect Stay
            </h2>
            <p
              style={{
                color: "var(--text-gray)",
                fontSize: "var(--fs-md)",
                lineHeight: 1.8,
                marginBottom: "var(--space-lg)",
              }}
            >
              Have questions or ready to book? Reach out to us and our team will help you plan an unforgettable experience at DurgBhumi.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              {/* Address */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-light)",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
<div>
                  <p style={{ fontWeight: 600, color: "var(--text-dark)", margin: 0, marginBottom: "2px" }}>Address</p>
                  <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)", overflowWrap: "break-word", wordBreak: "break-word" }}>{resort.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-light)",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-dark)", margin: 0, marginBottom: "2px" }}>Phone</p>
                  <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)" }}>{resort.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-light)",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  ✉️
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-dark)", margin: 0, marginBottom: "2px" }}>Email</p>
                  <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)" }}>{resort.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div
              style={{
                background: "var(--bg-light)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-lg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--fs-xl)",
                  color: "var(--text-dark)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
<input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="form-control"
                      required
                      suppressHydrationWarning={true}
                      style={{
                        padding: "14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #ddd",
                        fontSize: "var(--fs-sm)",
                        background: "var(--bg-light)",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
<input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="form-control"
                      required
                      suppressHydrationWarning={true}
                      style={{
                        padding: "14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #ddd",
                        fontSize: "var(--fs-sm)",
                        background: "var(--bg-light)",
                      }}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
<input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="form-control"
                      required
                      suppressHydrationWarning={true}
                      style={{
                        padding: "14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #ddd",
                        fontSize: "var(--fs-sm)",
                        background: "var(--bg-light)",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
<input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="form-control"
                      required
                      suppressHydrationWarning={true}
                      style={{
                        padding: "14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #ddd",
                        fontSize: "var(--fs-sm)",
                        background: "var(--bg-light)",
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
<textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="form-control"
                    required
                    suppressHydrationWarning={true}
                    style={{
                      padding: "14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid #ddd",
                      fontSize: "var(--fs-sm)",
                      background: "var(--bg-light)",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
                {status === "success" && (
                  <div style={{
                    padding: "12px",
                    background: "var(--primary-color)",
                    color: "white",
                    borderRadius: "var(--radius-sm)",
                    textAlign: "center",
                    marginBottom: "var(--space-md)"
                  }}>
                    ✅ Message sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div style={{
                    padding: "12px",
                    background: "#f8d7da",
                    color: "#721c24",
                    borderRadius: "var(--radius-sm)",
                    textAlign: "center",
                    marginBottom: "var(--space-md)"
                  }}>
                    ❌ Failed to send message. Please try again.
                  </div>
                )}
<button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  suppressHydrationWarning={true}
                  style={{ 
                    width: "100%", 
                    padding: "14px",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

