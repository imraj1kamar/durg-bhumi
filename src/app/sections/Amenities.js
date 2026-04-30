"use client";

import { useEffect, useRef } from "react";
import amenitiesData from "@/data/amenities.json";
import styles from "./Animations.module.css";
import {
  FaUtensils,
  FaSwimmingPool,
  FaSpa,
  FaTree,
  FaBuilding,
  FaFire,
} from "react-icons/fa";

const iconMap = {
  restaurant: FaUtensils,
  pool: FaSwimmingPool,
  spa: FaSpa,
  forest: FaTree,
  meeting: FaBuilding,
  fire: FaFire,
};

export default function Amenities() {
  const { amenities } = amenitiesData;
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
      id="amenities"
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-dark)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>
          <p
            data-animate
            data-delay="1"
            className={styles.fadeInUp}
            style={{
              color: "var(--accent-color)",
              fontSize: "var(--fs-sm)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              marginBottom: "var(--space-sm)",
            }}
          >
            Facilities
          </p>
          <h2
            data-animate
            data-delay="2"
            className={styles.fadeInUp}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, var(--fs-xxl))",
              color: "var(--text-light)",
              marginBottom: "var(--space-sm)",
            }}
          >
            Facility & Amenities
          </h2>
          <p
            data-animate
            data-delay="3"
            className={styles.fadeInUp}
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "var(--fs-md)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Everything you need for a perfect stay, from fine dining to wellness and adventure.
          </p>
        </div>

        <div className="row g-4">
          {amenities.map((amenity, index) => (
            <div key={amenity.id} className="col-md-6 col-lg-4">
              <div
                data-animate
                data-delay={String(index + 4)}
                className={`${styles.fadeInUp} ${styles.hoverCard}`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-lg)",
                  textAlign: "center",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(85, 107, 47, 0.2)";
                  e.currentTarget.style.borderColor = "var(--primary-color)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "var(--space-md)" }}>
                  {(() => {
                    const IconComponent = iconMap[amenity.icon];
                    return IconComponent ? <IconComponent /> : "✨";
                  })()}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--fs-lg)",
                    color: "var(--text-light)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {amenity.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "var(--fs-sm)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
