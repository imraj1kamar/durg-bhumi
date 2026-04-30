"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock and animation timing
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // small delay to trigger CSS transition
      const timer = setTimeout(() => setMenuVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setMenuVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#rooms", label: "Rooms" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: scrolled ? "10px 0" : "0px 0",
          background: scrolled ? "rgba(47, 36, 28, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "var(--transition)",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-xl)",
              color: "var(--text-light)",
              fontWeight: 600,
              letterSpacing: "1px",
             
            }}
          >
         <Image
           src={"/logo.png"}
           alt="DurgBhumi Resort Logo"
           width={100}
           height={100}
           style={{ objectFit: "contain", width: "clamp(60px, 15vw, 100px)", height: "auto" }}
         />
          </Link>

          {/* Desktop Nav */}
          <ul
            style={{
              display: "flex",
              gap: "var(--space-lg)",
              listStyle: "none",
              alignItems: "center",
            }}
            className="d-none d-lg-flex"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    color: "var(--text-light)",
                    fontSize: "var(--fs-sm)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    transition: "var(--transition)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-color)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-light)";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#rooms"
                className="btn-primary"
                style={{ display: "inline-block", fontSize: "var(--fs-sm)", padding: "10px 24px" }}
              >
                Book Now
              </a>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            className="d-lg-none"
            onClick={openMenu}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-light)",
              fontSize: "24px",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Backdrop */}
      {menuOpen && (
        <div
          className="d-lg-none"
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
            opacity: menuVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div
          className="d-lg-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "75%",
            maxWidth: "300px",
            height: "100vh",
            background: "rgba(47, 36, 28, 0.98)",
            zIndex: 1002,
            display: "flex",
            flexDirection: "column",
            padding: "var(--space-sm)",
            transform: menuVisible ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
          }}
        >
          {/* Sidebar Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-lg)" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-lg)",
                color: "var(--text-light)",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Menu
            </span>
            <button
              onClick={closeMenu}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-light)",
                fontSize: "24px",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Sidebar Links */}
          <ul className="mb-0" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    color: "var(--text-light)",
                    fontSize: "var(--fs-md)",
                    display: "block",
                    padding: "8px 0",
                    transition: "var(--transition)",
                  }}
                  onClick={closeMenu}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-color)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-light)";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* <li style={{ marginTop: "var(--space-md)" }}>
              <a
                href="#rooms"
                className="btn-primary"
                style={{ display: "inline-block", fontSize: "var(--fs-sm)", padding: "10px 24px" }}
                onClick={closeMenu}
              >
                Book Now
              </a>
            </li> */}
          </ul>
        </div>
      )}
    </>
  );
}

