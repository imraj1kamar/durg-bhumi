"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import testimonialsData from "@/data/testimonials.json";
import styles from "./Animations.module.css";

export default function Testimonials() {
  const { testimonials } = testimonialsData;
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffc107" : "rgba(255,255,255,0.3)", fontSize: "var(--fs-sm)" }}>
        ★
      </span>
    ));
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-dark)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>
          {/* <p
            data-animate
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
            Testimonials
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
        background: "var(--accent-color)",
        opacity: 0.5,
      }}
    ></span>

    <div
      style={{
        width: "10px",
        height: "10px",
        border: "1px solid var(--accent-color)",
        transform: "rotate(45deg)",
      }}
    ></div>

    <span
      style={{
        width: "50px",
        height: "2px",
        background: "var(--accent-color)",
        opacity: 0.5,
      }}
    ></span>
  </div>

  <p
    style={{
      color: "var(--accent-color)",
      fontSize: "var(--fs-sm)",
      textTransform: "uppercase",
      letterSpacing: "5px",
      fontWeight: 600,
      marginTop: "12px",
      marginBottom: 0,
    }}
  >
    Testimonials
  </p>
</div>
          <h2
            data-animate
            className={styles.fadeInUp}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, var(--fs-xxl))",
              color: "var(--text-light)",
              marginBottom: "var(--space-sm)",
            }}
          >
            What Our Guests Say
          </h2>
          <p
            data-animate
            className={styles.fadeInUp}
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "var(--fs-md)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Real stories from our valued guests who experienced the magic of DurgBhumi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row " >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="col-md-6 col-lg-4">
              <div
                data-animate
                className={`${styles.fadeInUp} ${styles.hoverCard}`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-lg)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
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
                {/* Stars */}
                <div style={{ marginBottom: "var(--space-md)" }}>
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "var(--fs-base)",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    marginBottom: "var(--space-lg)",
                    flex: 1,
                  }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "2px solid var(--accent-color)",
                    }}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--fs-base)",
                        color: "var(--text-light)",
                        margin: 0,
                        marginBottom: "2px",
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "var(--fs-xs)",
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
