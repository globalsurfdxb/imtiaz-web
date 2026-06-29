"use client";
import { communitySectionData } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";
import Link from "next/link";

type Props = {
  title:string;
  description:string;
  subTitle:string;
  slug:string;
}

const MeydanHorizon = ({title,description,subTitle,slug}:Props) => {
  // const { title, description, subtitle } = communitySectionData;
  const desktopBtnRef = useScrollFadeUp({
    y: 40,
    duration: 0.7,
    start: "top 90%",
  });

  return (
    <section className="w-full py-[70px] lg:py-120 3xl:py-160"
      data-header="dark">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center ">
          {title && <SectionHeading
            title={title}
            className="text-heading  text-foreground mb-[40px] max-w-[666px] mx-auto"
          />}

          {/* {subTitle && <SectionDescription
            text={subTitle}
            className="text-25 uppercase font-[optima] mb-[40px] text-foreground-light leading-[1.5] md:leading-[1.4] font-normal"
          />} */}
          {description && <SectionDescription
            text={description}
            className="text-description text-foreground-light max-w-[754px] mx-auto"
          />}

          <div ref={desktopBtnRef} style={{ opacity: 0 }}>
            <Link href={`/communities/${slug}`}>
            <CustomOutlineButton
              text="View Community"
              px="px-[30px] 3xl:px-[39.54px] mx-auto mt-[50px] h-[44px] md:h-[50px]  xl:h-[66px]"
              borderColor="border-primary"
              className="h-[44px] md:h-[50px]  xl:h-[66px]"
              textColor="text-primary"
              variant="dark"
            /></Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MeydanHorizon;
