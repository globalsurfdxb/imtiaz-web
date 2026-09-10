import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
// import { expertiseData } from "../data";
import Link from "next/link";
const Expertise = ({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <section data-header="dark" className="w-full py-[50px] sm:py-120 3xl:pt-140 3xl:pb-160">
      <div className="container mx-auto">
        <div className="flex flex-col items-center content-spacing-mobile-padding">
          <SectionHeading title={title} className="text-foreground mb-5" />
          <SectionDescription
            text={description}
            className="text-foreground-light max-w-[720px] text-center whitespace-pre-line mb-[50px]"
          />
          <Link href={buttonLink}>
            <CustomOutlineButton
              text={buttonText}
              borderColor="border-primary"
              variant="dark"
              textColor="text-primary"
              className="h-[44px] md:h-[50px]  xl:h-[66px]"
              px="px-[30px] min-w-[142px] lg:w-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
