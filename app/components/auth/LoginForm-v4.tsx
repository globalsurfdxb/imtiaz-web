"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import CustomOutlineButton from "../common/CustomOutlineButton-v4";
import { AnimatedHeading } from "../animations/AnimateHeading";
import { SectionDescription } from "../animations/SectionDescription";

type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
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


const errorMessageClass = "text-[14px] text-[#c0392b] pt-[5px] h-20";

const inputClass =
  "w-full mt-20 pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

interface LoginFormProps {
  onClose: () => void;
  onSwitch: () => void;
}

export default function LoginForm({ onClose, onSwitch }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ mode: "onTouched" });

  const onSubmit = (data: LoginValues) => {
    console.log("Login:", data);
  };

  return (
    <>
      {/* Close btn */}
      <button
        aria-label="Close"
        className="absolute top-50 3xl:top-90 right-50 w-50 h-50 rounded-full bg-[#49090533] backdrop-blur-[30px] flex items-center justify-center text-primary-2 group text-[24px] cursor-pointer transition-colors"
        onClick={onClose}
      >
        <span className="group-hover:scale-110 transition-transform duration-300 ease-out text-16 xl:text-19 3xl:text-25 !leading-none">
          ✕
        </span>
      </button>

      <div className="w-full max-w-[562px] flex flex-col self-center 3xl:self-end 3xl:pb-80 items-center">
        <div className="flex flex-col items-center px-50 sm:px-0">
          {/* <h1 className="text-heading text-primary-2 mb-20">MEMBERS LOGIN</h1> */}
          <AnimatedHeading title="MEMBERS LOGIN" className="text-primary-2 mb-20" mode="blade" />
          <SectionDescription text="Please fill out the form below so we can understand your requirements and assist you better." className="text-center mb-50 max-w-[431px] text-foreground-light sm:px-50 lg:px-0" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-[80%] xl:w-full"
        >
          {/* Email */}
          <label htmlFor="email" className="group cursor-text block">
            <span className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
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
                  message: "Enter a valid email address",
                },
              })}
            />
            <FieldLine hasError={!!errors.email} />
            <p className={errorMessageClass}>
              {errors.email?.message ?? "\u00A0"}
            </p>
          </label>

          {/* Password */}
          <label htmlFor="password" className="group cursor-text block">
            <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
              Password*
            </span>
            <div className="relative mt-20">
              <input
                id="password"
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
                  <circle cx="12" cy="12" r="3" />
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
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    style={{
                      opacity: showPassword ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </svg>
              </button>
            </div>
            <FieldLine hasError={!!errors.password} />
            <p className={errorMessageClass}>
              {errors.password?.message ?? "\u00A0"}
            </p>
          </label>

          {/* Remember me + Forgot password */}
          <div className="flex flex-col sm:flex-row gap-[8px] sm:gap-0 sm:items-center justify-between mb-50 mt-[12px]">
            <label className="flex items-center gap-[10px] text-description text-foreground-light cursor-pointer order-2 sm:order-1">
              <div className="relative w-[18px] h-[18px] flex-shrink-0 mb-[2px]">
                <input
                  type="checkbox"
                  className="peer w-full h-full appearance-none border border-primary-2 cursor-pointer transition-colors checked:bg-primary-2"
                  {...register("remember")}
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
              Keep me logged in
            </label>
            <Link
              href="/forgot-password"
              className="text-description text-primary-2 no-underline hover:underline order-1 sm:order-2"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit */}
          <CustomOutlineButton
            className="w-full"
            text="LOG IN"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
        </form>

        <p className="mt-120 text-center text-description">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-primary-2 hover:opacity-70 underline underline-offset-2 cursor-pointer transition-all duration-300 ease-out"
          >
            Sign up here
          </button>
        </p>
      </div>
    </>
  );
}
