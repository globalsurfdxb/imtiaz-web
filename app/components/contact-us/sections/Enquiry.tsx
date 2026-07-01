"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import Link from "next/link";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useContainerInset } from "@/app/hooks/useContainerInset";
// import { enquiryData } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SearchableDropdown } from "../sections/CountryNameList";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveLeft, moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import { useParallax } from "@/app/hooks/useParallax";
import { useUtm } from "@/hooks/useUtm";
import { submitContactLead } from "@/lib/submitContact";
import EnquiryForm from "../../auth/EnquiryForm";
import gsap from "gsap";
import EnquiryThankYouPopup from "../../thank-you/EnquiryThankYouPopup";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EnquiryData {
  heading: string;
  subheading: string;

  contacts: {
    id: string;
    icon: string;
    label: string;
    href: string;
  }[];

  selectReasons: string[];

  contactModes: string[];

  checkboxes: {
    id: string;
    label: string;
  }[];

  contactInfo: {
    icon: string;
    text: string;
    href: string;
    alignment: boolean;
  }[];
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  reason: string;
  message: string;
  contactMode: string;
  news: boolean;
  privacy: boolean;
};

// ─── Shared Field Components ──────────────────────────────────────────────────

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p className={`pt-[5px] h-20 ${msg ? "text-[#c0392b] text-[14px]" : ""}`}>
    {msg ?? "\u00A0"}
  </p>
);

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-foreground-light/30">
    <div
      className={`absolute inset-y-0 left-0 transition-all duration-[420ms] ease-out ${hasError
        ? "bg-[#c0392b] w-full"
        : "w-0 group-focus-within:w-full bg-black"
        }`}
    />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnquirySection({ enquiryData }: { enquiryData: EnquiryData }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      phoneCode: "+971",
      contactMode: "Phone",
      news: false,
      privacy: false,
    },
  });

  const { buildUtmPayload } = useUtm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormValues) => {
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const result = await submitContactLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: `${data.phoneCode}${data.phone}`,
        message: data.message,
        contactMode: data.contactMode,
        utm: buildUtmPayload(),
        landingPageName: "contact-us",
      });

      console.log("Contact result:", result);

      if (result.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const phoneRowRef = useRef<HTMLDivElement>(null);
  const [phoneRowWidth, setPhoneRowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerInset(containerRef);
  const [belowLg, setBelowLg] = useState(false);
  const { ref, parallaxY } = useParallax(20);

  useEffect(() => {
    if (!phoneRowRef.current) return;
    const ro = new ResizeObserver(() => {
      setPhoneRowWidth(phoneRowRef.current?.offsetWidth ?? 0);
    });
    ro.observe(phoneRowRef.current);
    return () => ro.disconnect();
  }, []);

  const inputClass =
    "w-full mt-[5px] md:mt-20 text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 h-auto placeholder-transparent";
  const labelClass =
    "block text-description text-foreground-light/50 transition-colors group-focus-within:text-black";

  useEffect(() => {
    const check = () => setBelowLg(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  // Animate in after visible
  useEffect(() => {
    if (!enquiryVisible) return;
    setTimeout(() => {
      if (!backdropRef.current || !modalRef.current) return;
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 1.08, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
      );
    }, 50);
  }, [enquiryVisible]);

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 1.06, filter: "blur(16px)", duration: 0.5, ease: "power3.out",
      onComplete: () => setEnquiryVisible(false),
    });
  };

  return (
    <section
      className="w-full light-section py-120 3xl:pt-130 3xl:pb-160"
      data-header="dark"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[40px] sm:gap-12 lg:gap-0">
          {/* ── Left Panel ── */}
          <div className="w-full lg:w-[43.7%] flex-shrink-0 flex flex-col">
            <SectionHeading
              title={enquiryData.heading}
              className="text-foreground mb-20 lg:max-w-[17ch]"
            />
            <SectionDescription
              text={enquiryData.subheading}
              className="text-foreground-light/80 max-w-[473px] mb-50"
            />
            <div className="flex flex-col gap-[30px] xl:gap-[40px]">
              {enquiryData.contactInfo.map((item, index) => (
                <div key={index} className=" group w-fit" onClick={() => index == 0 ? setEnquiryVisible(true) : null}>
                  <Link href={index !== 0 ? item.href : "#"}>
                    <div
                      className={`flex gap-[15px]   cursor-pointer ${item.alignment ? "items-center" : ""}`}
                    >
                      <div>
                        <Image
                          src={item.icon}
                          alt="video call"
                          width={30}
                          height={30}
                          className="w-[30px] h-30"
                        />
                      </div>
                      <div className="max-w-[40ch] ">
                        <span className="text-description text-foreground uppercase text-19 font-bold group-hover:text-primary ">
                          {item.text}
                        </span>
                      </div>
                    </div>
                    <div className="h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-300 translate-y-[4px]"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:hidden h-[1px] bg-black/10 mb-[30px]" />

          {/* ── Right Panel ── */}
          <div className="flex-1 relative flex items-center lg:w-[57.26%] justify-center   overflow-hidden ">
            {/* Form */}
            <div
              className="relative z-10 w-full"
              style={{ "--field-line-color": "black" } as React.CSSProperties}
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 — First + Last name */}
                <motion.div
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-70 3xl:gap-90"
                >
                  <div className="group">
                    <label htmlFor="firstName" className={labelClass}>
                      First Name*
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={inputClass}
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    <FieldLine hasError={!!errors.firstName} />
                    <ErrorSlot msg={errors.firstName?.message} />
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name*
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={inputClass}
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    <FieldLine hasError={!!errors.lastName} />
                    <ErrorSlot msg={errors.lastName?.message} />
                  </div>
                </motion.div>

                {/* Row 2 — Email + Phone */}
                <motion.div
                  variants={moveUp(0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-100 mb-1  md:mb-40"
                >
                  <div className="group">
                    <label htmlFor="email" className={labelClass}>
                      Enter Your Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputClass}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <FieldLine hasError={!!errors.email} />
                    <ErrorSlot msg={errors.email?.message} />
                  </div>

                  <div className="group mt-[20px] md:mt-0">
                    <label htmlFor="phone" className={labelClass}>
                      Enter Phone no*
                    </label>
                    <div
                      ref={phoneRowRef}
                      className="flex items-end pt-[3px] md:pt-20 gap-2"
                    >
                      <CountryCodeSelect
                        value={watch("phoneCode")}
                        onChange={(val) => setValue("phoneCode", val)}
                        dropdownWidth={phoneRowWidth}
                        variant="dark"
                      />
                      <input
                        id="phone"
                        type="number"
                        className="flex-1 pl-[100px] pb-[5px] outline-none bg-transparent text-description text-foreground-light"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{7,15}$/,
                            message: "Invalid phone number",
                          },
                        })}
                      />
                    </div>
                    <FieldLine hasError={!!errors.phone} />
                    <ErrorSlot msg={errors.phone?.message} />
                  </div>
                </motion.div>

                {/* Row 3 — Reason */}
                {/* <motion.div
                  variants={moveUp(0.14)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group mb-5 md:mb-40"
                >
                  <div className="group relative flex flex-col self-end">
                    <Image
                      src="/images/icons/down-tip-arrow.svg"
                      alt="arrow-down"
                      width={20}
                      height={10}
                      className="h-[7px] w-auto absolute top-30 right-0 "
                    />
                    <Controller
                      name="reason"
                      control={control}
                      rules={{ required: "Reason is required" }}
                      render={({ field }) => (
                        <SearchableDropdown
                          variant="dark"
                          label="Reason for enquiry*"
                          items={enquiryData.selectReasons.map((p) => ({
                            name: p,
                          }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="project"
                          hasError={!!errors.reason}
                        />
                      )}
                    />
                    <ErrorSlot msg={errors.reason?.message} />
                  </div>
                </motion.div> */}

                {/* Row 4 — Message */}
                <motion.div
                  variants={moveUp(0.18)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group mb-5 md:mb-40"
                >
                  <label htmlFor="message" className={labelClass}>
                    Type your message here...*
                  </label>
                  <input
                    id="message"
                    className="w-full text-description mt-[55px] md:mt-40 pb-[5px] text-foreground-light bg-transparent outline-none p-0 resize-none"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  <FieldLine hasError={!!errors.message} />
                  <ErrorSlot msg={errors.message?.message} />
                </motion.div>

                {/* Preferred Mode of Contact */}
                <div className="flex gap-2 md:gap-90 flex-col md:flex-row lg:flex-col lg:gap-0 items-start">
                  <div className="mb-60">
                    <motion.p
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-14 md:text-25 font-[optima] leading-[1.4] uppercase text-foreground-light mb-[10px] md:mb-20"
                    >
                      Preferred Mode of Contact
                    </motion.p>
                    <Controller
                      name="contactMode"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-40">
                          {enquiryData.contactModes.map((mode) => (
                            <Reveal variants={moveUpV2} key={mode}>
                              <label
                                className="flex items-center gap-[10px] cursor-pointer group"
                                onClick={() => field.onChange(mode)}
                              >
                                <span
                                  className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-colors duration-200 mb-1 ${field.value === mode
                                    ? "border-foreground-light"
                                    : "border-foreground-light"
                                    }`}
                                >
                                  {field.value === mode && (
                                    <span className="w-[14px] h-[14px] rounded-full bg-foreground-light block" />
                                  )}
                                </span>
                                <span className="text-description text-foreground-light">
                                  {mode}
                                </span>
                              </label>
                            </Reveal>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                  {/* Checkboxes */}
                  <div className="flex flex-col 2xl:flex-row 2xl:items-center items-start justify-between 3xl:justify-start gap-20 3xl:gap-90 mb-80 2xl:mb-40 ">
                    <motion.div
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <Controller
                        name="news"
                        control={control}
                        render={({ field }) => (
                          <label
                            className="flex items-center gap-[10px] cursor-pointer group"
                            onClick={() => field.onChange(!field.value)}
                          >
                            <span
                              className={`w-5 mb-1 h-5 border border-foreground-light flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${field.value
                                ? "text-foreground-light border-foreground-light"
                                : "border-foreground-light"
                                }`}
                            >
                              {field.value && (
                                <svg
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="#000"
                                  strokeWidth="2"
                                  className="w-2.5 h-2.5"
                                >
                                  <polyline points="1,6 4.5,9.5 11,2" />
                                </svg>
                              )}
                            </span>
                            <span className="text-description text-foreground-light">
                              {enquiryData.checkboxes[0].label}
                            </span>
                          </label>
                        )}
                      />
                    </motion.div>
                    <motion.div
                      variants={moveUp(0.22)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Controller
                        name="privacy"
                        control={control}
                        rules={{
                          required: "You must agree to the Privacy Policy",
                        }}
                        render={({ field }) => (
                          <label
                            className="flex items-center gap-2.5 cursor-pointer group"
                            onClick={() => field.onChange(!field.value)}
                          >
                            <span
                              className={`w-5 h-5 mb-1 border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${field.value
                                ? "text-foreground-light border-foreground-light"
                                : errors.privacy
                                  ? "border-[#c0392b]"
                                  : "border-foreground-light"
                                }`}
                            >
                              {field.value && (
                                <svg
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="#000"
                                  strokeWidth="2"
                                  className="w-2.5 h-2.5"
                                >
                                  <polyline points="1,6 4.5,9.5 11,2" />
                                </svg>
                              )}
                            </span>
                            <span className="text-description text-foreground-light">
                              {enquiryData.checkboxes[1].label}
                            </span>
                          </label>
                        )}
                      />
                      <div className="absolute top-7 left-0 w-full text-[#c0392b] text-[14px]">
                        {errors.privacy?.message}
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  {submitError && (
                    <p className="text-[12px] text-[#c0392b]">{submitError}</p>
                  )}
                  <CustomOutlineButton
                    text={submitLoading ? "Submitting..." : "Enquire"}
                    textColor="text-foreground-light"
                    borderColor="border-foreground-light"
                    px="px-50 2xl:py-[23px] 2xl:px-[90.5px] h-[44px] md:h-[50px] xl:h-[66px]"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryVisible && (
        <>
          <div ref={backdropRef} className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0" onClick={closeModal} />
          <div ref={modalRef} className="fixed inset-0 z-[1001] flex items-center justify-center opacity-0 pointer-events-none">
            <div className="pointer-events-auto w-full">
              <EnquiryForm onClose={closeModal} initialTab="viewing" onSwitch={() => { }} />
            </div>
          </div>
        </>
      )}

      {/* Thank you popup after successful submit */}
      {submitSuccess && (
        <EnquiryThankYouPopup onClose={() => setSubmitSuccess(false)} />
      )}

    </section>
  );
}
