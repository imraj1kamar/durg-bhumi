"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Animations.module.css";
import overviewStyles from "./ResortOverview.module.css";

export default function ResortOverview() {
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const animatedElements =
              entry.target.querySelectorAll("[data-animate]");

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

  const features = [
    "14 Ultra-Luxury Rooms, including 4 heritage-inspired Wada-style rooms",
    "Architecture inspired by Maratha culture, blended with contemporary luxury",
    "Scenic location at the foothills of Torna Fort",
    "Swimming Pool with serene natural surroundings",
    "Spa & Yoga Pavilion for holistic wellness",
    "Multiple Landscaped Gardens for private and social moments",
    "Elegant Banquet Hall for celebrations, retreats, and intimate events",
    "Multi-Cuisine Restaurant with regional and global flavors",
    "Kids' Play Area designed for safe outdoor fun",
    "Natural Waterfall within the property landscape",
    "Lake-View Vistas and panoramic Sahyadri backdrops",
    "Lush Green Surroundings offering peace, privacy, and fresh mountain air",
    "Ideal base to explore nearby heritage trails, forts, and nature walks",
  ];

return (
    <section
      id="overview"
      ref={sectionRef}
      className={overviewStyles.overviewSection}
    >
      {/* <div className={overviewStyles.container}> */}
        {/* Section Header */}
        <div className={overviewStyles.sectionHeader}>
          {/* <p
            data-animate
            className={`${styles.fadeInUp} ${overviewStyles.label}`}
          >
            Discover
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
    Discover
  </p>
</div>
          <h2
            data-animate
            className={`${styles.fadeInUp} ${overviewStyles.heading}`}
          >
            Resort Overview
          </h2>
          <p
            data-animate
            className={`${styles.fadeInUp} ${overviewStyles.description}`}
          >
            Experience the perfect blend of heritage and modern luxury at DurgBhumi Resort, where every detail is crafted for unforgettable moments.
          </p>
        </div>

        <div className={overviewStyles.grid}>
          <div
            data-animate
            className={`${styles.fadeInLeft} ${overviewStyles.imageColumn}`}
          >
            <div className={overviewStyles.imageWrapper}>
              <Image
                src="/durg bhumi gallery/morning-view.jpeg"
                alt="Luxury Room"
                fill
              />
            </div>

            <div className={overviewStyles.imageWrapper}>
              <Image
                src="/durg bhumi gallery/06.png"
                alt="Swimming Pool"
                fill
              />
            </div>

            <div className={overviewStyles.imageWrapper}>
              <Image
                src="/durg bhumi gallery/garden-area.jpeg"
                alt="Garden Area"
                fill
              />
            </div>
          </div>

          <div
            data-animate
            className={`${styles.fadeInRight} ${overviewStyles.featureColumn}`}
          >
            <ul className={overviewStyles.featureList}>
              {features.map((item, index) => (
                <li
                  key={index}
                  className={overviewStyles.featureItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}
