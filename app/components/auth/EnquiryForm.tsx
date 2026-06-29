"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import CustomOutlineButton from "../common/CustomOutlineButton";
import { SectionDescription } from "../animations/SectionDescription";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { AnimatedHeading } from "../animations/AnimateHeading";
import { moveUp } from "../motionVariants";
import Image from "next/image";
import { useUtm } from "@/hooks/useUtm";
import { submitOnboardingLead } from "@/lib/submitOnboarding";

type EnquiryValues = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
  applyPosition: string;
};

type ViewingValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  appointmentDateTime: string;
  countryCode: string;
  phone: string;
};

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-foreground-light/30">
    <div
      className={`absolute inset-y-0 left-0 transition-all duration-[420ms] ease-out ${hasError
        ? "bg-[#c0392b] w-full"
        : "w-0 group-focus-within:w-full bg-foreground-light"
        }`}
    />
  </div>
);

const inputClass =
  "w-full mt-[4.8px] md:mt-[10px] md:pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const labelClass =
  "block text-description 2xl:leading-[1.75] text-foreground-light/50 transition-colors group-focus-within:text-foreground-light";

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p className="text-[14px] text-[#c0392b] md:pt-2 h-media md:h-20">
    {msg ?? "\u00A0"}
  </p>
);

// Tab Button Component
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative md:min-h-[55px] cursor-pointer lg:min-h-[70px] z-10 w-1/2 px-2 py-3 lg:py-[17.5px] uppercase text-16 md:text-25 font-[optima] leading-[1.5] md:leading-[1.4] transition-colors duration-300 ${isActive ? "text-white" : "text-foreground-light"
        }`}
    >
      {label}
    </button>
  );
};



interface CareerFormProps {
  onClose: () => void;
  onSwitch: () => void;
  onSuccess?:()=>void;
}

export default function EnquiryForm({ onClose, onSwitch,onSuccess }: CareerFormProps) {
  const [activeTab, setActiveTab] = useState<"enquiry" | "viewing">("enquiry");
  const backgroundRef = useRef<HTMLDivElement>(null);
  const whiteBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState(0);
  const { buildUtmPayload } = useUtm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (backgroundRef.current) {
      const height = backgroundRef.current.offsetHeight;
      setDivHeight(height);
    }
  }, []);

  // Listen for window resize to recalculate height
  useEffect(() => {
    const handleResize = () => {
      if (backgroundRef.current) {
        setDivHeight(backgroundRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside white box to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if click is outside the white box
      if (
        whiteBoxRef.current &&
        containerRef.current &&
        !whiteBoxRef.current.contains(target)
      ) {
        // Close the popup
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);


  const enquiryForm = useForm<EnquiryValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

  const viewingForm = useForm<ViewingValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });


  useEffect(() => {
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    }
  }, [activeTab]);

  const onEnquirySubmit = async (data: EnquiryValues) => {
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const result = await submitOnboardingLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: `${data.countryCode}${data.phone}`,
        message: `${data.message}`,
        utm: buildUtmPayload(),
        landingPageName:"enquiry"
      });
      if (result.success) {
        setSubmitSuccess(true);
        onSuccess ? onSuccess() : null
        enquiryForm.reset();
      }
      else setSubmitError("Submission failed. Please try again.");
    } catch {
      setSubmitError("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const onViewingSubmit = async (data: ViewingValues) => {
    return;
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const result = await submitOnboardingLead({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: "",
        message: `[Book a Viewing] Requested: ${data.appointmentDateTime} - ${data.message}`,
        utm: buildUtmPayload(),
        landingPageName:"book-a-veiwing"
      });
      if (result.success) setSubmitSuccess(true);
      else setSubmitError("Submission failed. Please try again.");
    } catch {
      setSubmitError("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const [rows, setRows] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setRows(window.innerWidth < 768 ? 2 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* Close btn */}
      <div className="px-3 py-7  md:px-60 3xl:px-0 h-full w-full">
        <div className="flex h-full overflow-y-auto items-center justify-center">
          <div
            ref={whiteBoxRef}
            className="w-full h-fit pt-16 justify-center bg-white w-[95%] lg:w-[800px] mx-auto  overflow-scroll relative flex flex-col self-center   p-7 px-5 md:p-10 items-center"
          >

            <div ref={containerRef}  >
              <button
                onClick={onClose}
                className="absolute hover:scale-110 transition-all duration-300 cursor-pointer top-4 right-4   sm:w-12.5 sm:h-12.5 w-8 h-8 rounded-full flex items-center justify-center bg-[#17171766] backdrop-blur-[30px] text-white"
                aria-label="Close"
              >
                <Image
                  src="/icons/close.svg"
                  alt="Close"
                  width={16}
                  height={16}
                  className="w-auto h-[10px] sm:w-[16px] sm:h-[16px]"
                />
              </button>

            </div>
            {/* Tabs */}
            <motion.div className="relative flex justify-center mb-5 md:mb-30 bg-primary/5 rounded-full w-full lg:w-[567px] h-[40px] md:min-h-[55px] lg:min-h-[70px] overflow-hidden">
              {/* 🔥 Sliding Background */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute top-0 bottom-0 w-1/2  h-[40px] md:min-h-[55px] lg:min-h-[70px] bg-primary rounded-full ${activeTab === "enquiry" ? "left-0" : "left-1/2"
                  }`}
              />

              {/* Tabs */}
              <TabButton
                label="ENQUIRY"
                isActive={activeTab === "enquiry"}
                onClick={() => setActiveTab("enquiry")}
              />

              <TabButton
                label="BOOK A VIEWING"
                isActive={activeTab === "viewing"}
                onClick={() => setActiveTab("viewing")}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              ref={backgroundRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full dddd"
            >
              <AnimatePresence mode="wait">
                {activeTab === "enquiry" ? (
                  <div key="enquiry" className="w-full">

                    <form
                      onSubmit={enquiryForm.handleSubmit(onEnquirySubmit)}
                      noValidate
                      className="w-full"
                    >
                      {/* First + Last name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-70 3xl:gap-100">
                        <label
                          htmlFor="firstName"
                          className="group cursor-text block md:mt-30"
                        >
                          <span className={labelClass}>First name*</span>
                          <input
                            id="firstName"
                            type="text"
                            className={inputClass}
                            {...enquiryForm.register("firstName", {
                              required: "Required",
                            })}
                          />
                          <FieldLine hasError={!!enquiryForm.formState.errors.firstName} />
                          <ErrorSlot msg={enquiryForm.formState.errors.firstName?.message} />
                        </label>

                        <label
                          htmlFor="lastName"
                          className="group cursor-text block md:mt-30"
                        >
                          <span className={labelClass}>Last name*</span>
                          <input
                            id="lastName"
                            type="text"
                            className={inputClass}
                            {...enquiryForm.register("lastName", {
                              required: "Required",
                            })}
                          />
                          <FieldLine hasError={!!enquiryForm.formState.errors.lastName} />
                          <ErrorSlot msg={enquiryForm.formState.errors.lastName?.message} />
                        </label>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 lg:gap-x-70 3xl:gap-x-100">
                        <label
                          htmlFor="email"
                          className="group cursor-text block"
                        >
                          <span className="block text-description 2xl:leading-[1.75] md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                            Email*
                          </span>
                          <input
                            id="email"
                            type="email"
                            className={inputClass}
                            {...enquiryForm.register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                              },
                            })}
                          />
                          <FieldLine hasError={!!enquiryForm.formState.errors.email} />
                          <ErrorSlot msg={enquiryForm.formState.errors.email?.message} />
                        </label>

                        <label
                          htmlFor="phone"
                          className="group cursor-text block"
                        >
                          <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                            Enter Phone no*
                          </span>
                          <div className="flex items-end mt-[10px] gap-2">
                            <CountryCodeSelect
                              value={enquiryForm.watch("countryCode")}
                              onChange={(val) => enquiryForm.setValue("countryCode", val)}
                            />
                            <input
                              id="phone"
                              type="number"
                              className="flex-1 pb-[5px] pl-[100px] border-none outline-none bg-transparent text-description text-foreground-light p-0 min-w-0"
                              {...enquiryForm.register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{7,15}$/,
                                  message: "Invalid number",
                                },
                              })}
                            />
                          </div>
                          <FieldLine hasError={!!enquiryForm.formState.errors.phone} />
                          <ErrorSlot msg={enquiryForm.formState.errors.phone?.message} />
                        </label>
                      </div>

                      {/* Country */}
                      <div>
                        <label
                          htmlFor="applyPosition"
                          className="group cursor-text md:mt-30 block"
                        >
                          <span className={labelClass}>Country*</span>
                          <select
                            id="applyPosition"
                            className={inputClass}
                            {...enquiryForm.register("applyPosition", {
                              required: "Required",
                            })}
                          >
                            <option value="option0"> </option>
                            <option value="option1">UAE</option>
                            <option value="option2">KSA</option>
                            <option value="option3">India</option>
                          </select>
                          <FieldLine hasError={!!enquiryForm.formState.errors.applyPosition} />
                          <ErrorSlot msg={enquiryForm.formState.errors.applyPosition?.message} />
                        </label>
                      </div>

                      {/* Message */}
                      <label
                        htmlFor="signupPassword"
                        className="group cursor-text block"
                      >
                        <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                          Add a message*
                        </span>
                        <div className="relative mt-[5px] md:mt-[8px]">
                          <textarea
                            className="w-full text-description pb-[5px] h-[20px] text-foreground-light bg-transparent outline-none p-0 pr-7 md:h-auto resize-none"
                            rows={rows}
                            {...enquiryForm.register("message", {
                              required: "Message is required",
                              minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                              },
                            })}
                          />
                        </div>
                        <FieldLine hasError={!!enquiryForm.formState.errors.message} />
                        <p className="text-[12px] text-[#c0392b] pt-2 h-20">
                          {enquiryForm.formState.errors.message?.message ?? "\u00A0"}
                        </p>
                      </label>

                      {/* Submit */}
                      <div className="csmtst mt-40 w-fit mx-auto flex flex-col items-center gap-2">
                        {submitError && (
                          <p className="text-[12px] text-[#c0392b]">{submitError}</p>
                        )}
                        {submitSuccess ? (
                          <p className="text-[14px] text-primary">Thank you! We'll be in touch.</p>
                        ) : (
                          <CustomOutlineButton
                            px="py-[16px] px-[33px] lg:px-[23px] 3xl:px-[48px] 3xl:py-[23px]"
                            text={submitLoading ? "Submitting..." : "Submit"}
                            borderColor="border-primary-2"
                            textColor="text-foreground-light"
                            variant="dark"
                          />
                        )}
                      </div>
                    </form>

                  </div>
                ) : (
                  <div key="viewing" className="w-full">

                    <form
                      onSubmit={viewingForm.handleSubmit(onViewingSubmit)}
                      noValidate
                      className="w-full"
                    >
                      {/* First + Last name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-70 3xl:gap-100">
                        <label htmlFor="firstName" className="group cursor-text block md:mt-30">
                          <span className={labelClass}>First name*</span>
                          <input
                            id="firstName"
                            type="text"
                            className={inputClass}
                            {...viewingForm.register("firstName", { required: "Required" })}
                          />
                          <FieldLine hasError={!!viewingForm.formState.errors.firstName} />
                          <ErrorSlot msg={viewingForm.formState.errors.firstName?.message} />
                        </label>

                        <label htmlFor="lastName" className="group cursor-text block md:mt-30">
                          <span className={labelClass}>Last name*</span>
                          <input
                            id="lastName"
                            type="text"
                            className={inputClass}
                            {...viewingForm.register("lastName", { required: "Required" })}
                          />
                          <FieldLine hasError={!!viewingForm.formState.errors.lastName} />
                          <ErrorSlot msg={viewingForm.formState.errors.lastName?.message} />
                        </label>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 lg:gap-x-70 3xl:gap-x-100">
                        <label htmlFor="email" className="group cursor-text block">
                          <span className="block text-description 2xl:leading-[1.75] md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                            Email*
                          </span>
                          <input
                            id="email"
                            type="email"
                            className={inputClass}
                            {...viewingForm.register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                              },
                            })}
                          />
                          <FieldLine hasError={!!viewingForm.formState.errors.email} />
                          <ErrorSlot msg={viewingForm.formState.errors.email?.message} />
                        </label>

                        <label htmlFor="phone" className="group cursor-text block">
                          <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                            Enter Phone no*
                          </span>
                          <div className="flex items-end mt-[10px] gap-2">
                            <CountryCodeSelect
                              value={viewingForm.watch("countryCode")}
                              onChange={(val) => viewingForm.setValue("countryCode", val)}
                            />
                            <input
                              id="phone"
                              type="number"
                              className="flex-1 pb-[5px] pl-[100px] border-none outline-none bg-transparent text-description text-foreground-light p-0 min-w-0"
                              {...viewingForm.register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{7,15}$/,
                                  message: "Invalid number",
                                },
                              })}
                            />
                          </div>
                          <FieldLine hasError={!!viewingForm.formState.errors.phone} />
                          <ErrorSlot msg={viewingForm.formState.errors.phone?.message} />
                        </label>
                      </div>

                      {/* Date & Time — single input */}
                      <div>
                        <label htmlFor="appointmentDateTime" className="group cursor-text block md:mt-30">
                          <span className={labelClass}>Date & Time*</span>
                          <div className="relative">
                            <input
                              id="appointmentDateTime"
                              type="datetime-local"
                              onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                              className={`${inputClass} pr-10 [color-scheme:dark] cursor-pointer`}
                              min={new Date().toISOString().slice(0, 16)}
                              {...viewingForm.register("appointmentDateTime", {
                                required: "Date & time is required",
                              })}
                            />
                            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-foreground-light/60">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M12.7197 3.27H15.9197C16.1319 3.27 16.3354 3.35955 16.4854 3.51896C16.6354 3.67837 16.7197 3.89457 16.7197 4.12V16.87C16.7197 17.0954 16.6354 17.3116 16.4854 17.471C16.3354 17.6304 16.1319 17.72 15.9197 17.72H1.51973C1.30755 17.72 1.10407 17.6304 0.954041 17.471C0.804012 17.3116 0.719727 17.0954 0.719727 16.87V4.12C0.719727 3.89457 0.804012 3.67837 0.954041 3.51896C1.10407 3.35955 1.30755 3.27 1.51973 3.27L4.71973 3.27M12.7197 3.27V0.720001M12.7197 3.27L4.71973 3.27M4.71973 3.27V0.720001M16.7197 7.52H0.719727" stroke="#404040" stroke-width="1.44" stroke-linecap="round" />
                              </svg>
                            </div>
                          </div>
                          <FieldLine hasError={!!viewingForm.formState.errors.appointmentDateTime} />
                          <ErrorSlot msg={viewingForm.formState.errors.appointmentDateTime?.message} />
                        </label>
                      </div>

                      {/* Message */}
                      <label htmlFor="signupPassword" className="group cursor-text block">
                        <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                          Add a message*
                        </span>
                        <div className="relative mt-[5px] md:mt-[8px]">
                          <textarea
                            className="w-full text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 pr-7 h-[20px] md:h-auto resize-none"
                            rows={rows}
                            {...viewingForm.register("message", {
                              required: "Message is required",
                              minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                              },
                            })}
                          />
                        </div>
                        <FieldLine hasError={!!viewingForm.formState.errors.message} />
                        <p className="text-[12px] text-[#c0392b] pt-2 h-20">
                          {viewingForm.formState.errors.message?.message ?? "\u00A0"}
                        </p>
                      </label>

                      {/* Submit */}
                      <div className="csmtst mt-40 w-fit mx-auto">
                        <CustomOutlineButton
                          px="py-[16px] px-[33px] lg:px-[23px] 3xl:px-[48px] 3xl:py-[23px]"
                          text="Submit"
                          borderColor="border-primary-2"
                          textColor="text-foreground-light"
                          variant="dark"
                        />
                      </div>
                    </form>

                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
