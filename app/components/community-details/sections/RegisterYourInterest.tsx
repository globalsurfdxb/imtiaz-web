"use client";

import { useForm } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton-v4";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "@/app/components/animations/SectionHeading";
import { SectionDescription } from "@/app/components/animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

type PaymentValues = {
  firstName: string;
  lastName: string;
  email: string;
  eid: string;
  countryCode: string;
  phone: string;
  country: string;
  project: string;
  unit: string;
  amount: string;
  message: string;
};

const ErrorSlot = ({ msg, hint }: { msg?: string; hint?: string }) => (
  <p
    className={`pt-[5px] h-20 ${msg ? "text-[#c0392b] text-[12px] sm:text-[14px]" : "text-foreground-light/50 text-description"}`}
  >
    {msg ?? hint ?? "\u00A0"}
  </p>
);

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-foreground-light/50 overflow-hidden">
    <div
      className={`absolute inset-0 origin-left transition-transform duration-[420ms] ease-out ${
        hasError
          ? "bg-[#c0392b] scale-x-100"
          : "scale-x-0 group-focus-within:scale-x-100 bg-foreground-light"
      }`}
    />
  </div>
);

const inputClass =
  "w-full mt-[12px] sm:mt-20 2xl:mt-[13px] text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 h-auto";

const projects = [
  "Project Alpha",
  "Project Beta",
  "Project Gamma",
  "Project Delta",
];

export default function RegisterYourInterest() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PaymentValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

  const onSubmit = (data: PaymentValues) => {
    console.log("Payment:", data);
  };

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

  return (
    <section
      className="w-full py-120 3xl:py-130 bg-gray dark-section-2"
      data-header="dark"
    >
      <div className="container flex flex-col lg:flex-row gap-[50px] sm:gap-10 lg:gap-50 2xl:gap-0">
        {/* Left col — 49% */}
        <div className="w-full lg:w-[47.865%] flex-shrink-0 flex flex-col items-center lg:items-start content-spacing-mobile-padding">
          <SectionHeading
            title="Register your interest"
            className="text-foreground mb-6 md:mb-20 max-w-[17ch] text-center lg:text-left"
          />
          <SectionDescription
            text="Imtiaz Developments crafts more than buildings we create experiences. Register your interest and be part of our legacy."
            className="text-foreground-light/80 max-w-[473px] lg:mb-50 text-center lg:text-left"
          />
        </div>

        {/* Right col — 51% */}
        <div className="w-full lg:w-[52.135%] flex flex-col justify-center content-spacing-mobile-padding">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Row 1 — First + Last name */}
            <motion.div
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-y-[10px] sm:gap-70 3xl:gap-90"
            >
              <div className="group">
                <label
                  htmlFor="firstName"
                  className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Your First Name*
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
                <label
                  htmlFor="lastName"
                  className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Your Last Name*
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

            {/* Row 2 — Email + EID */}
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 md:gap-70 3xl:gap-90"
            >
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-description mt-[10px] md:mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
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
                      message: "Enter a valid email",
                    },
                  })}
                />
                <FieldLine hasError={!!errors.email} />
                <ErrorSlot msg={errors.email?.message} />
              </div>
              <div className="group">
                <label
                  htmlFor="phone"
                  className="block text-description mt-[10px] md:mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Phone no*
                </label>
                <div
                  ref={phoneRowRef}
                  className="flex items-end pt-[12px] gap-2"
                >
                  <CountryCodeSelect
                    value={watch("countryCode")}
                    onChange={(val) => setValue("countryCode", val)}
                    dropdownWidth={phoneRowWidth}
                  />
                  <div className="overflow-x-hidden w-full">
                    <input
                      id="phone"
                      type="number"
                      className="w-full flex-1 pl-[100px] border-none border-b pb-[5px] border-foreground-light outline-none bg-transparent text-description text-foreground-light"
                      {...register("phone", {
                        required: "Phone number is required",
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
            </motion.div>

            {/* Row 6 — Message */}
            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group"
            >
              <label
                htmlFor="message"
                className="block !leading-[1.75] text-description mt-[10px] md:mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
              >
                Type your message here...
              </label>
              <input
                id="message"
                type="text"
                className="w-full mt-30 2xl:mt-[39px] pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0"
                {...register("message")}
              />
              <FieldLine hasError={false} />
              {/* <ErrorSlot msg={undefined} /> */}
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={moveUp(0.24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-[40px]"
            >
              <CustomOutlineButton
                text="Submit Enquire"
                minWidth={false}
                onClick={() => {}}
                className="h-[44px] md:h-[50px]  xl:h-[66px]"
                variant="dark"
                textColor="text-foreground-light"
                borderColor="border-primary-2"
                px="px-[30px] md:px-60 2xl:px-[54.22px] 2xl:py-[23px]"
              />
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
}
