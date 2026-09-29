"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import Link from "next/link";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { enquiryData } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import { SearchableDropdown } from "../../pay-now/CountryNameList";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveLeft, moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import { useParallax } from "@/app/hooks/useParallax";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  <p className={`pt-[5px] h-20 ${msg ? "text-[#c0392b] text-[12px] md:text-[14px]" : ""}`}>
    {msg ?? "\u00A0"}
  </p>
);

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-white/30">
    <div
      className={`absolute inset-y-0 left-0 transition-all duration-[420ms] ease-out ${
        hasError
          ? "bg-[#c0392b] w-full"
          : "w-0 group-focus-within:w-full bg-white"
      }`}
    />
  </div>
);

// ─── Icon Components ──────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M29.2927 24.4398C29.2927 24.9198 29.186 25.4132 28.9593 25.8932C28.7327 26.3732 28.4394 26.8265 28.0527 27.2532C27.3994 27.9732 26.6793 28.4932 25.866 28.8265C25.066 29.1598 24.1994 29.3332 23.266 29.3332C21.906 29.3332 20.4527 29.0132 18.9193 28.3598C17.386 27.7065 15.8527 26.8265 14.3327 25.7198C12.7835 24.5866 11.3216 23.3387 9.95935 21.9865C8.61104 20.6292 7.36748 19.1717 6.23935 17.6265C5.14602 16.1065 4.26602 14.5865 3.62602 13.0798C2.98602 11.5598 2.66602 10.1065 2.66602 8.71984C2.66602 7.81317 2.82602 6.9465 3.14602 6.1465C3.46602 5.33317 3.97268 4.5865 4.67935 3.91984C5.53268 3.07984 6.46602 2.6665 7.45268 2.6665C7.82602 2.6665 8.19935 2.7465 8.53268 2.9065C8.87935 3.0665 9.18602 3.3065 9.42602 3.65317L12.5193 8.01317C12.7593 8.3465 12.9327 8.65317 13.0527 8.9465C13.1727 9.2265 13.2393 9.5065 13.2393 9.75984C13.2393 10.0798 13.146 10.3998 12.9593 10.7065C12.786 11.0132 12.5327 11.3332 12.2127 11.6532L11.1993 12.7065C11.0527 12.8532 10.986 13.0265 10.986 13.2398C10.986 13.3465 10.9993 13.4398 11.026 13.5465C11.066 13.6532 11.106 13.7332 11.1327 13.8132C11.3727 14.2532 11.786 14.8265 12.3727 15.5198C12.9727 16.2132 13.6127 16.9198 14.306 17.6265C15.026 18.3332 15.7193 18.9865 16.426 19.5865C17.1193 20.1732 17.6927 20.5732 18.146 20.8132C18.2127 20.8398 18.2927 20.8798 18.386 20.9198C18.4927 20.9598 18.5993 20.9732 18.7193 20.9732C18.946 20.9732 19.1193 20.8932 19.266 20.7465L20.2793 19.7465C20.6127 19.4132 20.9327 19.1598 21.2393 18.9998C21.546 18.8132 21.8527 18.7198 22.186 18.7198C22.4393 18.7198 22.706 18.7732 22.9993 18.8932C23.2927 19.0132 23.5994 19.1865 23.9327 19.4132L28.346 22.5465C28.6927 22.7865 28.9327 23.0665 29.0793 23.3998C29.2127 23.7332 29.2927 24.0665 29.2927 24.4398Z"
        stroke="white"
        strokeWidth="1.41"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M22.668 27.3337H9.33464C5.33464 27.3337 2.66797 25.3337 2.66797 20.667V11.3337C2.66797 6.66699 5.33464 4.66699 9.33464 4.66699H22.668C26.668 4.66699 29.3346 6.66699 29.3346 11.3337V20.667C29.3346 25.3337 26.668 27.3337 22.668 27.3337Z"
        stroke="white"
        strokeWidth="1.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6654 12L18.492 15.3333C17.1187 16.4267 14.8654 16.4267 13.492 15.3333L9.33203 12"
        stroke="white"
        strokeWidth="1.44"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnquirySection() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      phoneCode: "+971",
      contactMode: "Phone",
      news: true,
      privacy: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Enquiry:", data);
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
    "w-full mt-[2px] md:mt-20 text-description pb-[5px] text-white bg-transparent outline-none p-0 h-auto placeholder-transparent";
  const labelClass =
    "block text-description text-white/50 transition-colors group-focus-within:text-white";

  useEffect(() => {
    const check = () => setBelowLg(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="w-full dark-section" data-header="light">
      <ContainerAnchor ref={containerRef} />
      <div className="relative">
        <Image
          src="/images/expertise/m.svg"
          alt="M"
          width={1066}
          height={704}
          className="!w-[1066px] h-[650px] 3xl:h-[734px] absolute bottom-0 left-0 z-[1] select-none pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row">
          {/* ── Left Panel ── */}
          <div
            style={{
              paddingLeft: containerWidth,
              paddingRight: belowLg ? containerWidth : "",
            }}
            className="relative w-full lg:w-[43.65%] bg-primary-2 flex flex-col spacing-y-130 overflow-hidden py-120 3xl:py-130"
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <motion.div
              variants={moveLeft(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:hidden absolute bottom-0 right-0 z-10"
            >
              <Image
                src="/images/expertise/m.svg"
                alt="M"
                width={200}
                height={200}
                className="w-auto h-[200px] sm:h-[225px] md:h-[300px] lg:h-[500px] z-[1] select-none pointer-events-none"
              />
            </motion.div>
            <div className="content-spacing-mobile-padding">
              <div className="relative z-20 px-[5px] md:px-0">
                <SectionHeading
                  title={enquiryData.heading}
                  className="text-white mb-6 md:mb-20"
                />
                <SectionDescription
                  text={enquiryData.subheading}
                  className="text-white/80 max-w-[47ch] mb-[50px] xl:mb-[40px]"
                />
                <div className="flex flex-col gap-5 md:gap-40">
                  {enquiryData.contacts.map((c) => (
                    <Reveal variants={moveUpV2} key={c.id}>
                      <Link
                        key={c.id}
                        href={c.href}
                        className="flex items-center gap-20 group"
                      >
                        <div className="w-[50px] h-[50px] lg:w-[79px] lg:h-[79px] rounded-full border border-white/40 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-colors duration-300 flex-shrink-0">
                          {c.icon === "phone" ? <Image
                  src="/images/icons/call01.svg"
                  alt="overimg"
                  width={32}
                  height={32}
                  className=" w-[20px] h-[20px] lg:w-[32px] lg:h-[32px]  "
              
                /> :
                <Image
                  src="/images/icons/sms.svg"
                  alt="overimg"
                  width={32}
                  height={32}
                  className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]  "
              
                />}
                        </div>
                        <span className="text-white text-25 uppercase font-[avenirBook] leading-[1.2]">
                          {c.label}
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div
            className="flex-1 relative flex items-center justify-center lg:pl-80 overflow-hidden py-120 3xl:py-130"
            style={{
              paddingRight: containerWidth,
              paddingLeft: belowLg ? containerWidth : "",
              background:
                "linear-gradient(135deg, #0d0d0d 0%, #1a1008 50%, #0d0a06 100%)",
            }}
          >
            <div className="absolute inset-0 bg-black/90 z-[2]" />
            <div ref={ref} className="overflow-hidden">
              <Image
                src="/images/expertise/overimg.jpg"
                alt="overimg"
                width={1066}
                height={703}
                className="!w-full h-full absolute inset-0 z-[1] select-none pointer-events-none"
                style={{
                  transform: `scale(${1.2}) translateY(${parallaxY}vh)`,
                }}
              />
            </div>

            {/* Form */}
            <div
              className="relative z-10 w-full px-[5px] md:px-0"
              style={{ "--field-line-color": "white" } as React.CSSProperties}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="content-spacing-mobile-padding" noValidate>
                {/* Row 1 — First + Last name */}
                <motion.div
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-100 gap-y-[10px] mb-[10px] md:mb-40"
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-100 gap-y-[10px] mb-[10px] md:mb-40"
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

                  <div className="group">
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
                        variant="light"
                      />
                      <input
                        id="phone"
                        type="number"
                        className="flex-1 pl-[100px] pb-[5px] outline-none bg-transparent text-description text-white"
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
                <motion.div
                  variants={moveUp(0.14)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group mb-[10px] md:mb-40"
                >
                  <div className="group relative flex flex-col self-end">
                    <Image
                      src="/images/icons/down-tip-arrow.svg"
                      alt="arrow-down"
                      width={20}
                      height={10}
                      className="h-[7px] w-auto absolute top-30 right-0 invert brightness-0"
                    />
                    <Controller
                      name="reason"
                      control={control}
                      rules={{ required: "Reason is required" }}
                      render={({ field }) => (
                        <SearchableDropdown
                          variant="light"
                          label="Select Reason*"
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
                </motion.div>

                {/* Row 4 — Message */}
                <motion.div
                  variants={moveUp(0.18)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group md:mb-40"
                >
                  <label htmlFor="message" className={labelClass}>
                    Type your message here...*
                  </label>
                  <input
                    id="message"
                    className="w-full text-description mt-10 md:mt-[52px] md:mt-40 pb-[5px] text-white bg-transparent outline-none p-0 resize-none"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  <FieldLine hasError={!!errors.message} />
                  <ErrorSlot msg={errors.message?.message} />
                </motion.div>

                {/* Preferred Mode of Contact */}
                <div className="flex md:gap-90 flex-col md:flex-row lg:flex-col lg:gap-0 items-start pt-[10px] md:pt-0">
                  <div className="mb-5 md:mb-30">
                    <motion.p
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-[18px] md:text-25 font-[optima] leading-[1.4] uppercase text-white mb-20"
                    >
                      Preferred Mode of Contact
                    </motion.p>
                    <Controller
                      name="contactMode"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-[30px] md:gap-40">
                          {enquiryData.contactModes.map((mode) => (
                            <Reveal variants={moveUpV2} key={mode}>
                              <label
                                className="flex items-center gap-[10px] cursor-pointer group"
                                onClick={() => field.onChange(mode)}
                              >
                                <span
                                  className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-colors duration-200 mb-1 ${
                                    field.value === mode
                                      ? "border-white"
                                      : "border-white"
                                  }`}
                                >
                                  {field.value === mode && (
                                    <span className="w-[14px] h-[14px] rounded-full bg-white block" />
                                  )}
                                </span>
                                <span className="text-description text-white/80">
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
                  <div className="flex flex-col 2xl:flex-row 2xl:items-center items-start justify-between 3xl:justify-start gap-1 sm:gap-20 3xl:gap-90 mb-5 md:mb-80 2xl:mb-40 ">
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
                              className={`w-5 mb-1 h-5 border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                                field.value
                                  ? "bg-white border-white"
                                  : "border-white"
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
                            <span className="text-description text-white/80">
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
                              className={`w-5 h-5 mb-1 border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                                field.value
                                  ? "bg-white border-white"
                                  : errors.privacy
                                    ? "border-[#c0392b]"
                                    : "border-white"
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
                            <span className="text-description text-white/80">
                              {enquiryData.checkboxes[1].label}
                            </span>
                          </label>
                        )}
                      />
                      <div className="absolute top-7 left-0 w-full text-[#c0392b] text-[12px] md:text-[14px]">
                        {errors.privacy?.message}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Submit */}
                <CustomOutlineButton
                  text="Submit Enquire"
                  textColor="text-white"
                  borderColor="border-white"
                  px="px-[32.2px] md:px-50 h-[44px] md:h-[50px]  xl:h-[66px]" 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
