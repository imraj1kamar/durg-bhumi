"use client";
import { useState, useRef, useEffect, useId } from "react";
import styles from "./FloatingEnquiry.module.css";

export default function FloatingEnquiry() {

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"




  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async () => {
    // Prevent double submit
    if (loading) return;
    // Simple validation
    if (!nameRef.current?.value.trim()) {
      setStatus("Please enter your name");
      setStatusType("error");
      nameRef.current?.focus();
      return;
    }
    const email = emailRef.current?.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("Please enter a valid email");
      setStatusType("error");
      emailRef.current?.focus();
      return;
    }
    if (!messageRef.current?.value.trim()) {
      setStatus("Please enter a message");
      setStatusType("error");
      messageRef.current?.focus();
      return;
    }

    const formData = {
      name: nameRef.current.value.trim(),
      email,
      phone: phoneRef.current?.value.trim() || "",
      message: messageRef.current.value.trim(),
    };

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Thank you! Message sent successfully.");
        setStatusType("success");
        // Clear form
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (phoneRef.current) phoneRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
        // Auto close after 2s
        setTimeout(() => setOpen(false), 2000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      setStatus("❌ Failed to send. Please try again or email directly.");
      setStatusType("error");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open]);

  return (
    <>
      <div
        style={{ display: "none" }}
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        onClick={() => setOpen(false)}
      />
      <div className={styles.floatingWrapper}>
        {/* Tooltip */}
        {!open && hover && (
          <div className={styles.tooltip}>
            Quick Enquiry Form
          </div>
        )}

        {/* Main Box */}
        <div 
          className={`${styles.mainBox} ${open ? styles.open : ''}`}
          onClick={() => !open && setOpen(true)}
          onMouseEnter={() => !open && setHover(true)}
          onMouseLeave={() => !open && setHover(false)}
        >
          {/* Closed State (Icon) */}
          {!open && <span className={styles.chatIcon}>💬</span>}

          {/* Open State (Form) */}
          {open && (
            <div className={styles.formContainer}>
              <div className={styles.header}>
                <span>Quick Enquiry</span>
                <span
                  className={styles.closeBtn}
                  onClick={() => setOpen(false)}
                >
                  ✕
                </span>
              </div>

              <div className={styles.formContent}>
                <div className={styles.formHint}>Get quick help—send your enquiry.</div>


                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    ref={nameRef}
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    ref={emailRef}
                    type="email"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    ref={phoneRef}
                    type="tel"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    ref={messageRef}
                    className={styles.textareaField}
                    required
                  />
                </div>




                <button 
                  className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading && <span className={styles.loadingSpinner} />}
                  {loading ? "Sending..." : "Send Enquiry"}
                </button>
                {status && (
                  <div className={`${styles.statusMsg} ${statusType}`}>
                    {status}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}



/* Tooltip */

