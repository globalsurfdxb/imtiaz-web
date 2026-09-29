"use client";

import { useForm, Controller } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import Image from "next/image";
import { SearchableDropdown, allCountries } from "./CountryNameList";
import CustomOutlineButton from "../common/CustomOutlineButton-v4";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";

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
    className={`pt-[5px] h-20 ${msg ? "text-[#c0392b] text-[14px]" : "text-foreground-light/50 text-description"}`}
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
  "w-full mt-[5px] md:mt-20 text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 h-auto";

const projects = [
  "Project Alpha",
  "Project Beta",
  "Project Gamma",
  "Project Delta",
];

export default function PaymentForm({title,description}:{title:string;description:string}) {
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
      className="w-full min-h-screen py-120 3xl:py-130 bg-[#EBEBEC] dark-section-2"
      data-header="dark"
    >
      <div className="container flex flex-col lg:flex-row gap-150 gap-[50px] md:gap-80 lg:gap-50 2xl:gap-0">
        {/* Left col — 49% */}
        <div className="w-full lg:w-[48.5%] flex-shrink-0 flex flex-col content-spacing-mobile-padding">
          <SectionHeading
            title={title}
            className="text-foreground mb-6 md:mb-20 lg:max-w-[11ch]"
          />
          <SectionDescription
            text={description}
            className="text-foreground-light/80 max-w-[473px] mb-6 md:mb-[30px] md:mb-50"
          />
          <SectionHeading
            title="Pay by Card"
            className="text-25 font-[optima] font-[400] text-foreground uppercase tracking-[2%] mb-[10px] md:mb-20 leading-[1.4]"
            as="h3"
          />
          <div className="flex items-center gap-4">
            <motion.div
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-[43px] h-[30px] md:w-[70px] md:h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]"
            >
              <Image
                src="/images/pay-now/cards/mastercard.svg"
                alt="Mastercard"
                width={45}
                height={30}
                className="w-[28px] h-[17px] md:w-[45px] md:h-[27.61px] object-contain pointer-events-none"
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-[43px] h-[30px] md:w-[70px] md:h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]"
            >
              <Image
                src="/images/pay-now/cards/maestro.svg"
                alt="Maestro"
                width={50}
                height={20}
                className="w-[28px] h-[17px] md:w-[45px] md:h-[27.61px] object-contain pointer-events-none"
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.13)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-[43px] h-[30px] md:w-[70px] md:h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]"
            >
              <Image
                src="/images/pay-now/cards/visa.svg"
                alt="Visa"
                width={32}
                height={20}
                className="w-[30px] h-[10px] md:w-[49px] md:h-[15.64px] object-contain pointer-events-none"
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.18)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-[43px] h-[30px] md:w-[70px] md:h-[48px] relative bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]"
            >
              <div className="absolute bottom-0 right-0 flex items-center justify-center">
                <Image
                  src="/images/pay-now/cards/discover.svg"
                  alt="Discover"
                  width={70}
                  height={30}
                  className="w-[38px] h-[17px] md:w-[62.37px] md:h-[28px] object-contain pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right col — 51% */}
        <div className="w-full lg:w-[51.5%] flex flex-col justify-center content-spacing-mobile-padding">
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
                <label
                  htmlFor="firstName"
                  className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter First Name*
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
                  Enter Last Name*
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
                  className="block text-description mt-[20px] md:mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Email*
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
                  htmlFor="eid"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter EID / Passport Number*
                </label>
                <input
                  id="eid"
                  type="text"
                  className={inputClass}
                  {...register("eid", {
                    required: "EID / Passport is required",
                  })}
                />
                <FieldLine hasError={!!errors.eid} />
                <ErrorSlot msg={errors.eid?.message} />
              </div>
            </motion.div>

            {/* Row 3 — Phone + Country */}
            <motion.div
              variants={moveUp(0.13)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 md:gap-70 3xl:gap-90"
            >
              <div className="group">
                <label
                  htmlFor="phone"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Phone no*
                </label>
                <div ref={phoneRowRef} className="flex items-end pt-[3px] md:pt-20 gap-2">
                  <CountryCodeSelect
                    value={watch("countryCode")}
                    onChange={(val) => setValue("countryCode", val)}
                    dropdownWidth={phoneRowWidth}
                  />
                  <div className="overflow-x-hidden">
                    <input
                      id="phone"
                      type="number"
                      className="flex-1 pl-[100px] border-none border-b pb-[5px] border-foreground-light outline-none bg-transparent text-description text-foreground-light"
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

              {/* Country dropdown */}
              <div className="group relative flex flex-col self-end mt-5 md:mt-0">
                <Image
                  src="/images/icons/down-tip-arrow.svg"
                  alt="arrow-down"
                  width={20}
                  height={10}
                  className="h-[7px] w-auto absolute top-30 right-0"
                />
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <SearchableDropdown
                      label="Select country*"
                      items={allCountries}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="country"
                      hasError={!!errors.country}
                    />
                  )}
                />
                <ErrorSlot msg={errors.country?.message} />
              </div>
            </motion.div>

            {/* Row 4 — Project + Unit */}
            <motion.div
              variants={moveUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-70 3xl:gap-90"
            >
              <div className="group relative flex flex-col self-end mt-5">
                <Image
                  src="/images/icons/down-tip-arrow.svg"
                  alt="arrow-down"
                  width={20}
                  height={10}
                  className="h-[7px] w-auto absolute top-30 right-0"
                />
                <Controller
                  name="project"
                  control={control}
                  rules={{ required: "Project is required" }}
                  render={({ field }) => (
                    <SearchableDropdown
                      label="Select Project*"
                      items={projects.map((p) => ({ name: p }))}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="project"
                      hasError={!!errors.project}
                    />
                  )}
                />
                <ErrorSlot msg={errors.project?.message} />
              </div>

              <div className="group">
                <label
                  htmlFor="unit"
                  className="block text-description mt-5 md:mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter unit number*
                </label>
                <input
                  id="unit"
                  type="text"
                  className={inputClass}
                  {...register("unit", { required: "Unit number is required" })}
                />
                <FieldLine hasError={!!errors.unit} />
                <ErrorSlot msg={errors.unit?.message} />
              </div>
            </motion.div>

            {/* Row 5 — Amount */}
            <motion.div
              variants={moveUp(0.19)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group"
            >
              <label
                htmlFor="amount"
                className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
              >
                Amount AED*
              </label>
              <input
                id="amount"
                type="number"
                className={inputClass}
                {...register("amount", {
                  required: "Amount is required",
                  max: {
                    value: 100000,
                    message:
                      "Please Enter Amount less than or equal to 100,000 (AED)",
                  },
                })}
              />
              <FieldLine hasError={!!errors.amount} />
              <ErrorSlot
                msg={errors.amount?.message}
                hint="Please Enter Amount less than or equal to 100,000 (AED)"
              />
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
                className="block text-description mt-120 sm:mt-60 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
              >
                Type message here...
              </label>
              <input
                id="message"
                type="text"
                className="w-full mt-10 md:mt-[52px] md:mt-40 pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0"
                {...register("message")}
              />
              <FieldLine hasError={false} />
              <ErrorSlot msg={undefined} />
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={moveUp(0.24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-[30px] md:mt-30 "
            >
              <CustomOutlineButton
                text="Next"
                minWidth={false}
                onClick={() => {}}
                variant="dark"
                textColor="text-primary-2"
                borderColor="border-primary-2"
                px="px-10 md:px-60 h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
}
