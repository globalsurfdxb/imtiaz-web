"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface EnquiryThankYouPopupProps {
  onClose?: () => void;
  type?: "enquiry" | "viewing";
}

export default function EnquiryThankYouPopup({ onClose, type="enquiry" }: EnquiryThankYouPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) return onClose?.();
    gsap.to(modalRef.current, { opacity: 0, y: 18, scale: 0.98, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(30,10,8,0.35)] p-6 opacity-0"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[480px] border border-[#3B0E0C] bg-white px-12 pb-11 pt-14 text-center shadow-[0_30px_60px_rgba(42,9,8,0.18)] md:px-12 opacity-0"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] flex h-[34px] w-[34px] items-center justify-center bg-[#F1EEEA] text-[#3B0E0C] text-[16px] transition-colors duration-200 hover:bg-[#E6E0D8]"
        >
          ✕
        </button>

        {/* Check mark */}
        <div className="mx-auto mb-[22px] flex h-14 w-14 items-center justify-center border-[1.5px] border-[#3B0E0C]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3B0E0C"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <polyline points="4 12.5 9.5 18 20 6" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mb-[18px] font-serif text-[38px] font-semibold tracking-[0.03em] text-[#3B0E0C]">
          Thank You
        </h1>

        {/* Message */}
        <p className="mb-[30px] px-1.5 text-[15.5px] font-light leading-[1.7] text-[#5A5651]">
          {type === "viewing" ? (
            <>
              Your viewing request has been submitted successfully.
              <br />
              Our team will contact you shortly to confirm your preferred date and time.
            </>
          ) : (
            <>
              Your enquiry has been submitted successfully.
              <br />
              Our team will contact you shortly.
            </>
          )}
        </p>

        {/* Divider */}
        <div className="mx-auto mb-[26px] h-px w-14 bg-[#DCD3C8]" />

        {/* Contact */}
        <p className="mb-[34px] text-[13.5px] tracking-[0.02em] text-[#8C857C]">
          For assistance, contact{" "}
          <a
            href="tel:+971800468429"
            className="border-b border-[rgba(59,14,12,0.35)] text-[#3B0E0C] no-underline"
          >
            +971 800 IMTIAZ
          </a>{" "}
          or{" "}
          <a
            href="mailto:info@imtiaz.ae"
            className="border-b border-[rgba(59,14,12,0.35)] text-[#3B0E0C] no-underline"
          >
            info@imtiaz.ae
          </a>
        </p>

        {/* CTA */}
        <button
          onClick={handleClose}
          className="inline-block bg-[#3B0E0C] px-[46px] py-[15px] text-[13px] uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[#2A0908]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
