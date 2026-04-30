"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import styles from "./Animations.module.css";

export default function Gallery() {
  const { gallery } = galleryData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, goToPrevious, goToNext]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        padding: "var(--space-md) 0",
        background: "var(--bg-section)",
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
            Gallery
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
            Explore Our Resort
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
            Glimpses of the beauty and experiences that await you at DurgBhumi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="row g-3">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              data-animate
              className={`${index === 0 || index === 3 ? "col-md-8" : "col-md-4"} col-6`}
            >
              <div
                className={styles.imageZoom}
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  height: index === 0 || index === 3 ? "var(--gallery-tall, 400px)" : "var(--gallery-short, 250px)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(31,31,31,0.7), transparent)",
                    opacity: 0,
                    transition: "var(--transition)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "var(--space-md)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.previousElementSibling.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                    e.currentTarget.previousElementSibling.style.transform = "scale(1)";
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--fs-lg)",
                      margin: 0,
                    }}
                  >
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(12px, 3vw, var(--space-lg))",
          }}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              color: "var(--text-light)",
              fontSize: "36px",
              cursor: "pointer",
              lineHeight: 1,
              padding: "4px 12px",
              zIndex: 10,
            }}
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Image Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1100px",
              height: "70dvh",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[currentIndex].src}
              alt={gallery[currentIndex].alt}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>

          {/* Image Title */}
          <p
            style={{
              color: "var(--text-light)",
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-lg)",
              marginTop: "var(--space-md)",
              marginBottom: "var(--space-sm)",
              textAlign: "center",
            }}
          >
            {gallery[currentIndex].alt}
          </p>

          {/* Navigation Controls — Centered */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-md)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={goToPrevious}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "var(--text-light)",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "var(--fs-sm)",
                fontWeight: 500,
                transition: "var(--transition)",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              aria-label="Previous image"
            >
              ← Prev
            </button>

            {/* Counter */}
            <span
              style={{
                color: "var(--text-light)",
                fontSize: "var(--fs-sm)",
                fontWeight: 500,
                minWidth: "60px",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {currentIndex + 1} / {gallery.length}
            </span>

            <button
              onClick={goToNext}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "var(--text-light)",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "var(--fs-sm)",
                fontWeight: 500,
                transition: "var(--transition)",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              aria-label="Next image"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
