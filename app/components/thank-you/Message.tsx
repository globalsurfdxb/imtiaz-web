"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import CustomOutlineButton from "../common/CustomOutlineButton";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface ThankYouSectionProps {
    onClose?: () => void;
}

export default function ThankYouSection({ onClose }: ThankYouSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const type = searchParams.get("type") === "viewing" ? "viewing" : "enquiry";

    // Entrance animation
    useEffect(() => {
        if (!sectionRef.current || !cardRef.current) return;
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 18, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen light-section py-120 3xl:py-160 flex items-center justify-center opacity-0"
        >
            <Image src={'/images/thank-you/bg.jpeg'} className="absolute inset-0" fill alt="bg-image"/>
<div className="absolute inset-0 bg-black/50" />
            <div className="container flex items-center justify-center">
                <div
                    ref={cardRef}
                    className="relative w-full max-w-[480px]  px-12 pb-11 pt-14 text-center md:px-12 opacity-0"
                >
                    {/* Optional close, only rendered if a handler is passed */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-[18px] top-[18px] flex h-[34px] w-[34px] items-center justify-center bg-[#F1EEEA] text-white text-[16px] transition-colors duration-200 hover:bg-[#E6E0D8]"
                        >
                            ✕
                        </button>
                    )}

                    {/* Check mark */}
                    {/* <div className="mx-auto mb-[22px] flex h-14 w-14 rounded-full items-center justify-center border-[1.5px] border-primary">
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
                    </div> */}

                    {/* Heading */}
                    <h1 className="mb-[18px] text-heading text-[38px] font-semibold tracking-[0.03em] text-white">
                        Thank You
                    </h1>

                    {/* Message */}
                    <p className="mb-[30px] px-1.5 text-[15.5px] font-light leading-[1.7] text-white">
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
                        <a
                            href="tel:+971800468429"
                            className="border-b border-[rgba(59,14,12,0.35)] text-white no-underline"> For assistance, contact{" "}
                            +971 800 IMTIAZ
                        </a>{" "}

                        or{" "}

                        <a href="mailto:info@imtiaz.ae"
                            className="border-b border-[rgba(59,14,12,0.35)] text-white no-underline"
                        >

                            info@imtiaz.ae
                        </a>
                    </p>

                    <motion.div
                        variants={moveUp(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <Link href="/">
                            <CustomOutlineButton
                                text="Back To Home"
                                variant="dark"
                                borderColor="white"
                                textColor="text-black"
                                px="px-10 xl:px-[37px] h-[44px] md:h-[50px] xl:h-[66px]"
                                className="bg-white"
                                readMore
                            />
                        </Link>
                    </motion.div>
                </div >
            </div >
        </section >
    );
}