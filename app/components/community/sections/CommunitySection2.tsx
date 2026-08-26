import CommunityCard2 from "./CommunityCard2";
// import { communitySectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";

// const COMMUNITY_ORDER = [
//   "jvc",
//   "al-furjan",
//   "jumeirah-garden-city",
//   "dubailand-residence-complex",
//   "dubai-islands",
//   "meydan-horizon",
//   "dubai-south",
//   // add remaining slugs in desired order
// ];

const CommunitiesSection = ({title,description,items}:{title:string,description:string,items:[]}) => {
  // const orderedItems = [...items].sort((a: any, b: any) => {
  //   const ai = COMMUNITY_ORDER.indexOf(a.slug);
  //   const bi = COMMUNITY_ORDER.indexOf(b.slug);
  //   const aIdx = ai === -1 ? 999 : ai;
  //   const bIdx = bi === -1 ? 999 : bi;
  //   return aIdx - bIdx;
  // });
  
  // const { title, description, cards } = communitySectionData;

  return (
    <section className="w-full py-[70px] lg:py-120 3xl:py-160" data-header="dark">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-50">
          <SectionHeading
            title={title}
            as="h2"
            className="text-foreground mb-[20px] max-w-[685px] mx-auto"
          />

          <SectionDescription
            text={description}
            className="text-foreground-light max-w-[736px] mx-auto"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-30 md:gap-x-40 md:gap-y-40">
          {items.map((card,index) => (
            <Reveal key={index} variants={moveUpV2}>
              <CommunityCard2 card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
