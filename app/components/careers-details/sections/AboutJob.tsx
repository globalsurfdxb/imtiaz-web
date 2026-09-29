"use client";

import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import { SectionHeading } from "../../animations/SectionHeading";
import { CareerDetailsResponse } from "../data";

type jobDetail = {
  title: string;
  description: string;
  title2: string;
  keyResponsibilities: {
    id: number;
    title: string;
    tasks: string[];
  }[];
  title3: string;
  qualifications: string[];
};

interface Props {
  data: jobDetail;
}

const AboutJob = ({
  data,
  overviewTitle,
}: {
  data: CareerDetailsResponse["data"];
  overviewTitle: string;
}) => {
  return (
    <section
      className="w-full bg-white py-120 3xl:py-[160px]"
      data-header="dark"
    >
      <div className="container  ">
        <div className="2xl:!max-w-[1322px] mx-auto content-spacing-mobile-padding">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="career-details-about"
          >
            <SectionHeading
              title={overviewTitle}
              className=" text-heading   text-foreground   uppercase mb-6 md:mb-20"
            />
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: data.job_overview || "" }}
            />
          </motion.div>
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-5 sm:mt-50 pb-5 sm:pb-50 border-t border-black/10"
          ></motion.div>

          <motion.div
            className="career-details-responsibility"
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: data.job_responsibility || "" }}
          >
            {/* <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SectionHeading
                title={data.title2}
                className=" text-heading   text-foreground   uppercase  mb-20"
              />
              <motion.div
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {data.keyResponsibilities.map((section, index) => (
                  <div key={index} className="pl-2">
                    <h3 className="mb-20 uppercase text-25 font-[optima] leading-[1.4]">
                      {index + 1}. {section.title}
                    </h3>
                    <ul className="mb-30 list-disc pl-5 sm:pl-10">
                      {section.tasks.map((task, index) => (
                        <li key={index} className="text-description">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </motion.div> */}
          </motion.div>

          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-[40px] sm:mt-50 pb-[40px] sm:pb-50 border-t border-black/10"
          ></motion.div>

          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="career-details-qualification"
            dangerouslySetInnerHTML={{ __html: data.job_qualification || "" }}
          >
            {/* <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SectionHeading
                title={data.title3}
                className=" text-heading   text-foreground   uppercase  mb-20"
              />
              <motion.div
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="pl-2">
                  <ul className="list-disc pl-5 sm:pl-0">
                    {data.qualifications.map((task, index) => (
                      <li key={index} className="text-description">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutJob;
