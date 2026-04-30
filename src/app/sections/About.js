"use client";

import Image from "next/image";
import { useEffect } from 'react';
import styles from './About.module.css';

export default function About() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const imageEl = document.querySelector('#about .image-container');
    const portfolioEl = document.querySelector('#about .portfolio-text');

    if (imageEl) observer.observe(imageEl);
    if (portfolioEl) observer.observe(portfolioEl);

    return () => {
      if (imageEl) observer.unobserve(imageEl);
      if (portfolioEl) observer.unobserve(portfolioEl);
    };
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* LEFT IMAGE */}
          <div className={`${styles.imageContainer} image-container`}>
            <Image
              src="/durg bhumi gallery/wada.jpeg"
              alt="DurgBhumi Resort"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.contentSide}>
            <h2 className={styles.heading}>
              About us
            </h2>

            <p className={styles.subtext}>
              DurgBhumi is exclusively managed and operated by{" "}
              <strong>WanderNest Hospitality</strong>
            </p>

            <p className={styles.tagline}>
              Curating Destinations. Crafting Experiences.
            </p>

            <div className={styles.brownBox}>
              <p className={styles.description}>
                WanderNest is a premium hospitality and experience-driven company
                dedicated to creating distinctive destinations and memorable
                moments. With a focus on thoughtful design, immersive
                environments, and elevated service, WanderNest curates
                hospitality experiences that blend luxury, culture, and
                contemporary lifestyle.
              </p>

              <p className={`${styles.portfolioText} portfolio-text`}>
                Our growing portfolio includes DurgBhumi – a luxury retreat
                resort inspired by heritage and nature, Knliq – Pune's premier
                rooftop resto-bar, and Flying Saucer, Bhopal – a vibrant dining
                and social destination.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
