"use client";

import Link from "next/link";
import Image from "next/image";
import resortData from "@/data/resort-data.json";

export default function Footer() {
  const { resort } = resortData;

  return (
    <footer
      style={{
        background: "var(--bg-dark)",
        color: "var(--text-light)",
        padding: "var(--space-xl) 0 var(--space-lg)",
      }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <Image
              src="/logo.png"
              alt="DurgBhumi Resort"
              width={150}
              height={50}
              style={{ objectFit: "contain", height: "45px", width: "auto", marginBottom: "var(--space-md)" }}
            />
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-xl)",
                marginBottom: "var(--space-md)",
                color: "var(--accent-color)",
              }}
            >
              {resort.name}
            </h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "var(--space-md)" }}>
              {resort.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-lg)",
                marginBottom: "var(--space-md)",
                color: "var(--accent-color)",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {["Home", "About", "Rooms", "Amenities", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{ color: "var(--text-muted)", transition: "var(--transition)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-lg)",
                marginBottom: "var(--space-md)",
                color: "var(--accent-color)",
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <li style={{ color: "var(--text-muted)" }}>📍 {resort.address}</li>
              <li style={{ color: "var(--text-muted)" }}>📞 {resort.phone}</li>
              <li style={{ color: "var(--text-muted)" }}>✉️ {resort.email}</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="col-lg-3 col-md-6">
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-lg)",
                marginBottom: "var(--space-md)",
                color: "var(--accent-color)",
              }}
            >
              Hours
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <li style={{ color: "var(--text-muted)" }}>Check-in: 2:00 PM</li>
              <li style={{ color: "var(--text-muted)" }}>Check-out: 11:00 AM</li>
              <li style={{ color: "var(--text-muted)" }}>Reception: 24 Hours</li>
              <li style={{ color: "var(--text-muted)" }}>Restaurant: 7 AM – 11 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: "var(--space-lg)",
            paddingTop: "var(--space-md)",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "var(--fs-sm)",
          }}
        >
          © {new Date().getFullYear()} {resort.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

