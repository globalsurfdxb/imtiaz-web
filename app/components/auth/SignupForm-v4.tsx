"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList-v4";
import CustomOutlineButton from "../common/CustomOutlineButton-v4";
import { AnimatedHeading } from "../animations/AnimateHeading";
import { SectionDescription } from "../animations/SectionDescription";

type SignupValues = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  privacy: boolean;
};

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-foreground-light/50">
    <div
      className={`absolute inset-y-0 left-0 transition-all duration-[420ms] ease-out ${
        hasError ? "bg-[#c0392b] w-full" : "w-0 group-focus-within:w-full bg-foreground-light"
      }`}
    />
  </div>
);


const inputClass =
  "w-full mt-25 pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const labelClass =
  "block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light";

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p className="text-[14px] text-[#c0392b] pt-2 h-20">{msg ?? "\u00A0"}</p>
);

interface SignupFormProps {
  onClose: () => void;
  onSwitch: () => void;
}

export default function SignupForm({ onClose, onSwitch }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

  const onSubmit = (data: SignupValues) => {
    console.log("Signup:", data);
  };

  return (
    <>
      {/* Close btn */}
      <button
        aria-label="Close"
        className="absolute top-50 3xl:top-90 right-50 w-50 h-50 rounded-full bg-[#49090533] backdrop-blur-[30px] flex items-center justify-center text-primary-2 group text-[24px] cursor-pointer transition-colors"
        onClick={onClose}
      >
        <span className="group-hover:scale-110 transition-transform duration-300 ease-out text-16 3xl:text-25 !leading-none">
          ✕
        </span>
      </button>

      <div className="w-full px-60 3xl:px-0 max-w-[700px] flex flex-col self-center 3xl:self-end 3xl:pb-80 pt-120 items-center">
        <div className="flex flex-col items-center justify-center px-50 sm:px-0">
          <AnimatedHeading title="MEMBERS SIGN UP" className="text-primary-2 mb-20" mode="blade" />
          <SectionDescription text="Please fill out the form below so we can understand your requirements and assist you better." className="text-center mb-50 max-w-[431px] text-foreground-light sm:px-50 lg:px-0" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-40 sm:gap-70 3xl:gap-100">
            <label htmlFor="firstName" className="group cursor-text block">
              <span className={labelClass}>Enter First Name*</span>
              <input
                id="firstName"
                type="text"
                className={inputClass}
                {...register("firstName", { required: "Required" })}
              />
              <FieldLine hasError={!!errors.firstName} />
              <ErrorSlot msg={errors.firstName?.message} />
            </label>

            <label htmlFor="lastName" className="group cursor-text block">
              <span className={labelClass}>Enter Last Name*</span>
              <input
                id="lastName"
                type="text"
                className={inputClass}
                {...register("lastName", { required: "Required" })}
              />
              <FieldLine hasError={!!errors.lastName} />
              <ErrorSlot msg={errors.lastName?.message} />
            </label>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 lg:gap-x-70 3xl:gap-x-100">
            <label htmlFor="email" className="group cursor-text block">
              <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                Enter Email*
              </span>
              <input
                id="email"
                type="email"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <FieldLine hasError={!!errors.email} />
              <ErrorSlot msg={errors.email?.message} />
            </label>

            <label htmlFor="phone" className="group cursor-text block">
              <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                Phone Number*
              </span>
              <div className="flex items-end mt-25 gap-2">
                <CountryCodeSelect
                  value={watch("countryCode")}
                  onChange={(val) => setValue("countryCode", val)}
                />
                <input
                  id="phone"
                  type="number"
                  className="flex-1 pb-[5px] pl-[100px] border-none outline-none bg-transparent text-description text-foreground-light p-0 min-w-0"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: "Invalid number",
                    },
                  })}
                />
              </div>
              <FieldLine hasError={!!errors.phone} />
              <ErrorSlot msg={errors.phone?.message} />
            </label>
          </div>

          {/* Password */}
          <label htmlFor="signupPassword" className="group cursor-text block">
            <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
              Password*
            </span>
            <div className="relative mt-25">
              <input
                id="signupPassword"
                type={showPassword ? "text" : "password"}
                className="w-full text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 pr-7 h-auto"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((p) => !p);
                }}
                aria-label="Toggle password"
                className="absolute right-0 bottom-2 text-foreground-light/50 hover:text-foreground-light bg-transparent border-none p-0 cursor-pointer"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    style={{
                      opacity: showPassword ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    style={{
                      opacity: showPassword ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </svg>
              </button>
            </div>
            <FieldLine hasError={!!errors.password} />
            <p className="text-[12px] text-[#c0392b] pt-2 h-30">
              {errors.password?.message ?? "\u00A0"}
            </p>
          </label>

          {/* Privacy policy */}
          <div className="flex flex-col mb-50 mt-[12px]">
            <label className="flex items-center gap-[10px] text-description text-foreground-light cursor-pointer">
              <div className="relative w-[18px] h-[18px] flex-shrink-0 mb-[2px]">
                <input
                  type="checkbox"
                  className="peer w-full h-full appearance-none border border-primary-2 cursor-pointer transition-colors checked:bg-primary-2"
                  {...register("privacy", {
                    required: "You must agree to the Privacy Policy",
                  })}
                />
                <svg
                  className="absolute inset-0 m-auto w-[12px] h-[12px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="1.5,6 4.5,9.5 10.5,2.5" />
                </svg>
              </div>
              I&apos;ve read and agree to the Privacy Policy*
            </label>
            <div className="w-full -mt-2">
              <ErrorSlot msg={errors.privacy?.message} />
            </div>
          </div>

          {/* Submit */}
          <CustomOutlineButton
            className="w-full"
            text="SIGN UP"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
        </form>
        <p className="mt-60 text-center text-description">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-primary-2 hover:opacity-70 underline underline-offset-2 transition-all duration-300 ease-out cursor-pointer"
          >
            Sign in here
          </button>
        </p>
      </div>
    </>
  );
}
