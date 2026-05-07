"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import resortData from "@/data/resort-data.json";
import styles from "./Animations.module.css";

export default function Hero() {
  const { resort } = resortData;
  const heroRef = useRef(null);

  useEffect(() => {
    // Keep the initial React render stable to avoid hydration mismatch.
    // Trigger animation after mount by toggling a DOM class.
    const el = heroRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add(styles.animateIn);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/durg bhumi gallery/01.png"
          alt="DurgBhumi Resort"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(31,31,31,0.5), rgba(47,36,28,0.7))",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 1, textAlign: "center", marginTop: "var(--space-xl)" }}
      >
        <div ref={heroRef} className={styles.heroContent} >


          <p
            style={{
              color: "var(--accent-color)",
              fontSize: "var(--fs-sm)",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "var(--space-md)",
              fontWeight: 500,
            }}
          >
            Welcome to {resort.name}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 8vw, var(--fs-hero))",
              color: "var(--text-light)",
              lineHeight: 1.1,
              marginBottom: "var(--space-md)",
            }}
          >
            {resort.tagline}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "var(--fs-lg)",
              maxWidth: "700px",
              margin: "0 auto var(--space-lg)",
              lineHeight: 1.7,
            }}
          >
            {resort.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#rooms" className="btn-primary">
              Explore Rooms
            </a>
            <a
              href="#contact"
              className={styles.buttonHover}
              style={{
                background: "transparent",
                color: "var(--text-light)",
                padding: "14px 28px",
                border: "2px solid var(--text-light)",
                borderRadius: "var(--radius-round)",
                cursor: "pointer",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--text-light)";
                e.currentTarget.style.color = "var(--text-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-light)";
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

