"use client";
import Main from "../sections/Main";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { TourListingItem } from "../data";
const ExploreSpaces = ({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: TourListingItem[];
}) => {
  return (
    <section className="py-120 3xl:py-160" data-header="dark">
      <div className="container">
        <div className="flex flex-col justify-center items-center mb-[50px]">
          <SectionHeading
            title={title}
            className="text-heading  text-foreground mb-6 md:mb-20 text-center  "
          />
          <SectionDescription
            text={description}
            className="text-description max-w-[78ch] text-center uppercase font-[optima] text-foreground-light leading-[1.5] md:leading-[1.57] font-normal"
          />
        </div>
      </div>
      <Main data={data} />
    </section>
  );
};
export default ExploreSpaces;
