"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { AnimatedHeading } from "../../animations/AnimateHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Image from "next/image";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
};

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p
    className={`pt-[3px] h-20 ${msg ? "text-[#c0392b] text-[12px] sm:text-[14px]" : ""}`}
  >
    {msg ?? "\u00A0"}
  </p>
);

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-black/20 overflow-hidden">
    <div
      className={`absolute inset-0 origin-left transition-transform duration-[420ms] ease-out ${
        hasError
          ? "bg-[#c0392b] scale-x-100"
          : "scale-x-0 group-focus-within:scale-x-100 bg-black"
      }`}
    />
  </div>
);

const inputClass =
  "w-full mt-[4.8px] md:mt-[10px] pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const labelClass =
  "block text-description 2xl:leading-[1.75] text-foreground-light/50 transition-colors group-focus-within:text-foreground-light";

export default function RegisterInterestForm({
  onClose,
}: {
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

  const phoneRowRef = useRef<HTMLDivElement>(null);
  const [phoneRowWidth, setPhoneRowWidth] = useState(0);

  useEffect(() => {
    if (!phoneRowRef.current) return;
    const ro = new ResizeObserver(() => {
      setPhoneRowWidth(phoneRowRef.current?.offsetWidth ?? 0);
    });
    ro.observe(phoneRowRef.current);
    return () => ro.disconnect();
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log("RegisterInterest:", data);
  };

  return (
    // Plain card — no fixed/backdrop wrapper. The portal scroll container handles centering + scroll.
    <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1009px] mx-[15px] sm:mx-20 bg-white p-40">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute hover:scale-110 transition-all duration-300 cursor-pointer top-4 right-4 sm:top-40 sm:right-40 sm:w-12.5 sm:h-12.5 w-8 h-8 rounded-full flex items-center justify-center bg-[#17171766] backdrop-blur-[30px] text-white"
        aria-label="Close"
      >
        <Image
          src="/icons/close.svg"
          alt="Close"
          width={16}
          height={16}
          className="w-auto h-[10px] sm:w-[16px] sm:h-[16px] invert brightness-0"
        />
      </button>

      {/* Heading */}
      <div className="text-center mb-70">
        <AnimatedHeading
          mode="blade"
          className="text-heading text-foreground max-w-[16ch] mx-auto mb-20"
          title="Register Your Interest"
        />
        <SectionDescription
          className="text-description text-foreground-light/80"
          text="Imtiaz Developments crafts more than buildings we create experiences. Register your interest and be part of our legacy."
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        {/* Row 1 — First + Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-100 gap-y-20 3xl:gap-x-[103px] mb-40">
          <div className="group">
            <label htmlFor="firstName" className={labelClass}>
              Enter First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder=""
              className={inputClass}
              {...register("firstName", { required: "Required" })}
            />
            <FieldLine hasError={!!errors.firstName} />
            <ErrorSlot msg={errors.firstName?.message} />
          </div>

          <div className="group">
            <label htmlFor="lastName" className={labelClass}>
              Enter Your Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className={inputClass}
              {...register("lastName", { required: "Required" })}
            />
            <FieldLine hasError={!!errors.lastName} />
            <ErrorSlot msg={errors.lastName?.message} />
          </div>
        </div>

        {/* Row 2 — Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-100 gap-y-20 3xl:gap-x-[103px] mb-40">
          <div className="group">
            <label htmlFor="email" className={labelClass}>
              Enter Your Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <FieldLine hasError={!!errors.email} />
            <ErrorSlot msg={errors.email?.message} />
          </div>

          <div className="group">
            <label htmlFor="phone" className={labelClass}>
              Enter Phone no
            </label>
            <div ref={phoneRowRef} className="flex items-end pt-[10px] gap-2">
              <CountryCodeSelect
                value={watch("countryCode")}
                onChange={(val) => setValue("countryCode", val)}
                dropdownWidth={phoneRowWidth}
              />
              <div className="overflow-x-hidden w-full">
                <input
                  id="phone"
                  type="number"
                  className="w-full flex-1 pl-[100px] border-none pb-[5px] outline-none bg-transparent text-description text-foreground-light"
                  {...register("phone", {
                    required: "Required",
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: "Invalid number",
                    },
                  })}
                />
              </div>
            </div>
            <FieldLine hasError={!!errors.phone} />
            <ErrorSlot msg={errors.phone?.message} />
          </div>
        </div>

        {/* Row 3 — Message */}
        <div className="group">
          <label htmlFor="message" className="group cursor-text block">
            <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
              Type your message here...
            </span>
            <div className="relative mt-[5px] md:mt-[8px]">
              <textarea
                className="w-full text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 pr-7 h-auto resize-none"
                rows={2}
                {...register("message", {
                  required: "Message is required",
                })}
              />
            </div>
          </label>
          <FieldLine hasError={false} />
        </div>

        {/* Submit */}
        <div className="mt-50 flex justify-center">
          <CustomOutlineButton
            text="Submit Enquire"
            minWidth={false}
            onClick={() => {}}
            className="h-[44px] md:h-[50px]  xl:h-[66px] 3xl:w-[247px]"
            variant="dark"
            textColor="text-black"
            borderColor="border-primary"
            px="px-[25px] md:px-[36px] lg:px-[42px]"
          />
        </div>
      </form>
    </div>
  );
}