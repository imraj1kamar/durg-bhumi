"use client";

import Image from "next/image";
import { useEffect } from 'react';
import styles from './About.module.css';
import aboutData from '@/data/about.json';

export default function About() {
  const { about } = aboutData;

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
              src={about.image}
              alt="DurgBhumi Resort"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.contentSide}>
            <h2 className={styles.heading}>
              {about.heading}
            </h2>

            <p className={styles.subtext}>
              {about.subtext}{" "}
              <strong>{about.operator}</strong>
            </p>

            <p className={styles.tagline}>
              {about.tagline}
            </p>

            <div className={styles.brownBox}>
              <p className={styles.description}>
                {about.description}
              </p>

              <p className={`${styles.portfolioText} portfolio-text`}>
                Our growing portfolio includes{" "}
                {about.portfolio.map((item, index) => (
                  <span key={index}>
                    {item.name} – {item.description}
                    {index < about.portfolio.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
