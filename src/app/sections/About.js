"use client";

import Image from "next/image";
import { useEffect } from "react";
import aboutStyles from "./About.module.css";
import aboutData from "@/data/about.json";
import Styles from "./Animations.module.css";

export default function About() {
  const { about } = aboutData;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Trigger the CSS transition defined in Animations.module.css
          entry.target.classList.add(Styles.animateIn);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    const targets = document.querySelectorAll("#about [data-animate]");
    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className={aboutStyles.aboutSection}>
   
        <div className={aboutStyles.aboutGrid}>
            <div className={aboutStyles.contentBlock}>
              <h2 className={aboutStyles.heading}>
              {about.heading}
            </h2>

            <p className={aboutStyles.subtext}>
              {about.subtext}{" "}
              <strong>{about.operator}</strong>
            </p>

            <p className={aboutStyles.tagline}>
              {about.tagline}
            </p>

        </div>
          {/* LEFT IMAGE */}
          <div
            data-animate
            className={`${Styles.fadeInLeft} ${aboutStyles.imageContainer} image-container`}
          >
            {/* Next/Image needs a stable positioned parent to render correctly.
                Ensure the parent is visible (opacity 1) and let the animation control only transform. */}
            <Image
              src={about.image}
              alt="DurgBhumi Resort"
              fill
              priority
              sizes="(max-width: 991px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div  data-animate
            className={`${Styles.fadeInRight} ${aboutStyles.contentSide}`}>
        <div className={aboutStyles.content}>
              <h2 className={aboutStyles.heading}>
              {about.heading}
            </h2>

            <p className={aboutStyles.subtext}>
              {about.subtext}{" "}
              <strong>{about.operator}</strong>
            </p>

            <p className={aboutStyles.tagline}>
              {about.tagline}
            </p>

        </div>
            <div className={aboutStyles.brownBox}>
              <p className={aboutStyles.description}>
                {about.description}
              </p>

              <p className={`${aboutStyles.portfolioText} portfolio-text`}>
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
        
    
    </section>
  );
}
