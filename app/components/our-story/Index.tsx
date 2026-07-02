import InnerHeroBanner from "../common/InnerHeroBanner";
import { AboutPageResponse } from "./data";
import MessageSection from "./sections/MessageSection";
import VisionSection from "./sections/VisionSection";
import Philosophy from "./sections/Philosophy";
import HistorySection from "./sections/HistorySlider";
import AwardSection from "./sections/Award";
import Expertise from "./sections/Expertise";
import OtherPageSlider from "./sections/OtherPageSlider";

const Index = ({ data }: { data: AboutPageResponse['data'] }) => {

  const visionSectionData = {
    title: data?.vision_title1,
    description: data?.vision_brief,
    bgImage: data?.vision_image_desktop,
    bgImageMobile: data?.vision_image_mobile,
    alt: data?.vision_image_alt,

    stats: [
      {
        value: data?.vision_title2,
        label: data?.vision_caption2,
      },
      {
        value: data?.vision_title3,
        label: data?.vision_caption3,
      },
    ],
  };

  const chairmanMessageData = {
    id: "chairman",
    title: data?.chairman_title,
    quote: data?.chairman_caption,
    name: data?.chairman_name,
    designation: data?.chairman_profile,
    description: data?.chairman_brief,

    personImage: data?.chairman_image_desktop,
    personImageMobile: data?.chairman_image_mobile,
    personImageAlt: data?.chairman_image_alt,

    bgImage: data?.chairman_image_background,
    bgImageMobile: data?.chairman_image_background_mobile,
  };

  const ceoMessageData = {
    id: "ceo",
    title: data?.ceo_title,
    quote: data?.ceo_caption,
    name: data?.ceo_name,
    designation: data?.ceo_profile,
    description: data?.ceo_brief,

    personImage: data?.ceo_image_desktop,
    personImageMobile: data?.ceo_image_mobile,
    personImageAlt: data?.ceo_image_alt,

    bgImage: data?.ceo_image_background,
    bgImageMobile: data?.ceo_image_background_mobile,
  };

  const otherPageSliderData = {
    learnMoreText: "Learn More",

    slides: (data?.listing || []).map((item: any) => ({
      title: item.extra_title,
      description: item.extra_caption,
      link: item.extra_button_url,
      bgImage: item.extra_image_desktop,
      bgImageMobile: item.extra_image_mobile,
      alt: item.extra_image_alt,
      buttonText: item.extra_button_text,
    })),
  };

  const formattedHistory = Object.entries(data.history).map(
    ([year, items]) => ({
      year: Number(year),
      cards: items.map((item: any, index: number) => ({
        id: `${year}-${index + 1}`,
        year: Number(item.year),
        title: item.title,
        description: item.brief,
        image: item.featured_image,
        imageAlt: item.featured_image_alt,
      })),
    })
  );


  return (
    <>
      <InnerHeroBanner
        title={data.page_banner_title}
        description={data.page_banner_caption}
        image={data.page_banner_desktop}
        mobileImage={data.page_banner_mobile}
        maxW="max-w-[904px]" />
      {data?.show_vision_section == "true" && <VisionSection data={visionSectionData} />}
      {data?.show_chairman_section == "true" && <MessageSection data={chairmanMessageData} />}
      {data?.show_ceo_section == "true" && <MessageSection data={ceoMessageData} />}
      {data?.show_philosophy_section == "true" && <Philosophy title={data.philosophy_title} description={data.philosophy_caption} />}
      {data?.show_history_section == "true" && <HistorySection
        title={data.history_title}
        description={data.history_caption}
        history={formattedHistory}
      />}
      {data?.show_medal_section == "true" && <AwardSection
        title={data.medal_title}
        descriptions={data.medal_brief}
        bgImage={data.medal_image_desktop}
        bgImagemob={data.medal_image_mobile}
      />}
      {data?.show_expertise_section == "true" && <Expertise
        title={data.expertise_title}
        description={data.expertise_caption}
        buttonText={data?.expertise_button_text || ""}
        buttonLink={data?.expertise_button_url || ""}
      />}
      {data?.show_extras_section == "true" && <OtherPageSlider data={otherPageSliderData} />}
    </>
  );
};

export default Index;
