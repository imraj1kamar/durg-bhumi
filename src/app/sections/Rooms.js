"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import roomsData from "@/data/rooms.json";
import styles from "./Animations.module.css";

export default function Rooms() {
  const { rooms } = roomsData;
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

  return (
    <section
      id="rooms"
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-light)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>
          <p
            data-animate
            className={styles.fadeInUp}
            style={{
              color: "var(--primary-color)",
              fontSize: "var(--fs-sm)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              marginBottom: "var(--space-sm)",
            }}
          >
            Accommodations
          </p>
          <h2
            data-animate
            className={styles.fadeInUp}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, var(--fs-xxl))",
              color: "var(--text-dark)",
              marginBottom: "var(--space-sm)",
            }}
          >
            Our Luxury Rooms
          </h2>
          <p
            data-animate
            className={styles.fadeInUp}
            style={{
              color: "var(--text-gray)",
              fontSize: "var(--fs-md)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Choose from our carefully curated selection of rooms and suites, each designed for ultimate comfort.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="row g-4">
          {rooms.map((room, index) => (
            <div key={room.id} className="col-md-6 col-lg-3">
              <div
                data-animate
                className={`${styles.fadeInUp} ${styles.hoverCard}`}
                style={{
                  background: "var(--bg-light)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div className={styles.imageZoom} style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "var(--space-md)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--fs-lg)",
                        color: "var(--text-dark)",
                        margin: 0,
                      }}
                    >
                      {room.name}
                    </h3>
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: 700,
                        fontSize: "var(--fs-md)",
                      }}
                    >
                      {room.price}
                      <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: 400 }}>/night</span>
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--text-gray)",
                      fontSize: "var(--fs-sm)",
                      lineHeight: 1.6,
                      marginBottom: "var(--space-sm)",
                      flex: 1,
                    }}
                  >
                    {room.description}
                  </p>
                  <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap", marginBottom: "var(--space-sm)" }}>
                    {room.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "var(--bg-section)",
                          color: "var(--primary-color)",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "var(--fs-xs)",
                          fontWeight: 500,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-sm)" }}>
                    <span>{room.size}</span>
                    <span>Up to {room.guests} guests</span>
                  </div>
                  <button
                    className="btn-primary"
                    suppressHydrationWarning={true}
                    style={{ width: "100%", textAlign: "center", fontSize: "var(--fs-sm)", padding: "12px" }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
