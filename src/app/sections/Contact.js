"use client";


import { useState } from "react";
// import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa";
import resortData from "@/data/resort-data.json";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import styles from "./Animations.module.css";

export default function Contact() {
  const { resort } = resortData;
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const animatedElements = entry.target.querySelectorAll("[data-animate]");
            animatedElements.forEach((el) => {
              el.classList.add(styles.animateIn);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
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
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-section)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}
        >
                                       <div
  data-animate
  className={styles.fadeInUp}
  style={{
    textAlign: "center",
    marginBottom: "var(--space-md)",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}
  >
    <span
      style={{
        width: "50px",
        height: "2px",
        background: "var(--primary-color)",
        opacity: 0.5,
      }}
    ></span>

    <div
      style={{
        width: "10px",
        height: "10px",
        border: "1px solid var(--primary-color)",
        transform: "rotate(45deg)",
      }}
    ></div>

    <span
      style={{
        width: "50px",
        height: "2px",
        background: "var(--primary-color)",
        opacity: 0.5,
      }}
    ></span>
  </div>

  <p
    style={{
      color: "var(--primary-color)",
      fontSize: "var(--fs-sm)",
      textTransform: "uppercase",
      letterSpacing: "5px",
      fontWeight: 600,
      marginTop: "12px",
      marginBottom: 0,
    }}
  >
                Get in Touch

  </p>
</div>
      
            <h2
            data-animate
            className={styles.fadeInUp}
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
            data-animate
            className={styles.fadeInUp}
              style={{
                color: "var(--text-gray)",
                fontSize: "var(--fs-md)",
                lineHeight: 1.8,
                marginBottom: "var(--space-lg)",
              }}
            >
              Have questions or ready to book? Reach out to us and our team will help you plan an unforgettable experience at DurgBhumi.
            </p>
        </div>
        
        <div className="row">
          <div className="col-lg-5">
       

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
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <a 
                      href="tel:+919146025252" 
                      style={{ 
                        color: "var(--text-gray)", 
                        fontSize: "var(--fs-sm)", 
                        fontWeight: 500,
                        textDecoration: "none",
                        // padding: "8px 12px",
                        // borderRadius: "8px",
                        transition: "all 0.3s ease",
                        // border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--danger)";
                        // e.target.style.borderColor = "var(--primary-color)";
                        e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--text-gray)";
                        e.target.style.borderColor = "transparent";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      +91 91460 25252   
                    </a>
                    <a 
                      href="tel:+919154975333" 
                      style={{ 
                        color: "var(--text-gray)", 
                        fontSize: "var(--fs-sm)", 
                        fontWeight: 500,
                        textDecoration: "none",
                        // padding: "8px 12px",
                        // borderRadius: "8px",
                        transition: "all 0.3s ease",
                        // border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--danger)";
                        // e.target.style.borderColor = "var(--primary-color)";
                        e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--text-gray)";
                        e.target.style.borderColor = "transparent";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      +91 91549 75333
                    </a>
                  </div>
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

                  <a 
                    href={`mailto:${resort.email}`} 
                    style={{ 
                      color: "var(--text-gray)", 
                      fontSize: "var(--fs-sm)", 
                      fontWeight: 500,
                      textDecoration: "none",
                      padding: "8px 0px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      border: "1px solid transparent",
                      display: "inline-block"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "var(--danger)";
                      // e.target.style.borderColor = "var(--primary-color)";
                      e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "var(--text-gray)";
                      e.target.style.borderColor = "transparent";
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    {resort.email}
                  </a>

                </div>

              </div>

              {/* Directions */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)" }}>
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
                  🗺️
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-dark)", margin: 0, marginBottom: "2px" }}>How to Reach</p>
                  <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)" }}>
                    Mumbai → Velhe: {resort.directions.mumbaiToVelhe} </p>
                    
                   <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)" }}> Mumbai → Torna Fort: {resort.directions.mumbaiToTornaFort} </p>
                    <p style={{ color: "var(--text-gray)", margin: 0, fontSize: "var(--fs-sm)" }}>Pune → Velhe: {resort.directions.puneToVelhe}
                  </p>
                </div>
              </div>


              {/* Social Media */}
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
                  🔗
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text-dark)", margin: 0, marginBottom: "2px" }}>Follow Us</p>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a 
                      href={resort.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px",
                        color: "var(--text-gray)", 
                        fontSize: "var(--fs-sm)", 
                        fontWeight: 500,
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--primary-color)";
                        e.target.style.borderColor = "var(--primary-color)";
                        e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--text-gray)";
                        e.target.style.borderColor = "transparent";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaFacebookF size={16} />
                      <span>Facebook</span>
                    </a>
                    <a 
                      href={resort.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px",
                        color: "var(--text-gray)", 
                        fontSize: "var(--fs-sm)", 
                        fontWeight: 500,
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--primary-color)";
                        e.target.style.borderColor = "var(--primary-color)";
                        e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--text-gray)";
                        e.target.style.borderColor = "transparent";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaInstagram size={16} />
                      <span>Instagram</span>
                    </a>
                    <a 
                      href={resort.socialMedia.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px",
                        color: "var(--text-gray)", 
                        fontSize: "var(--fs-sm)", 
                        fontWeight: 500,
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "var(--primary-color)";
                        e.target.style.borderColor = "var(--primary-color)";
                        e.target.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "var(--text-gray)";
                        e.target.style.borderColor = "transparent";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaXTwitter size={16} />
                      <span>Twitter</span>
                    </a>
                  </div>
                   

                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-7">
         
              <section style={{ position: "relative" }}>
  <iframe
    src="https://maps.google.com/maps?q=18.29611587524414,73.6214370727539&z=17&output=embed"
    width="100%"
    height="450"
    style={{ border: 0, borderRadius: "20px" }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />

  {/* Open in Google Maps Button */}
  <a
    href="https://www.google.com/maps?q=18.29611587524414,73.6214370727539"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: "#000",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "600",
      zIndex: 10,
    }}
  >
    Open in Google Maps
  </a>
</section>
          </div>

     
        </div>
      </div>
    </section>
  );
}

