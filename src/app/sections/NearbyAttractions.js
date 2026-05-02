"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import attractionsData from "@/data/attractions.json";
import styles from "./Animations.module.css";

export default function NearbyAttractions() {
  const { attractions } = attractionsData;
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const animatedElements = entry.target.querySelectorAll("[data-animate]");
            
            // Stagger the animations - animate each element one by one with delay
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add(styles.animateIn);
              }, index * 150); // 150ms delay between each element
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

  const getCategoryColor = (category) => {
    const colors = {
      Wildlife: "var(--primary-color)",
      Nature: "#2E8B57",
      Heritage: "#8B4513",
      Culture: "#6B4423",
      Spiritual: "#9370DB",
    };
    return colors[category] || "var(--primary-color)";
  };

  return (
    <section
      id="attractions"
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-section)",
      }}
    >
      {/* <div className="container"> */}
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>
          {/* <p
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
            Explore
          </p> */}
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
    Explore
  </p>
</div>
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
            Nearby Attractions
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
            Discover the wonders waiting to be explored around DurgBhumi Resort - from ancient caves to wildlife sanctuaries.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="row ">
          {attractions.map((attraction, index) => (
            <div key={attraction.id} className="col-md-6 col-lg-3">
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
                {/* Image */}
                <div className={styles.imageZoom} style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* Category Badge */}
                 
                </div>

                {/* Content */}
                <div style={{ padding: "var(--space-md)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--fs-lg)",
                        color: "var(--text-dark)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {attraction.name}
                    </h3>
                    <span
                      style={{
                        background: "var(--bg-section)",
                        color: "var(--primary-color)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "var(--fs-xs)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        marginLeft: "8px",
                      }}
                    >
                      {attraction.distance}
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
                    {attraction.description}
                  </p>
                  {/* <button
                    className="btn-primary"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: "var(--fs-sm)",
                      padding: "10px",
                      background: "transparent",
                      border: "2px solid var(--primary-color)",
                      color: "var(--primary-color)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--primary-color)";
                      e.currentTarget.style.color = "var(--text-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--primary-color)";
                    }}
                  >
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      {/* </div> */}
    </section>
  );
}
