import { bannerData, impactAreas, InnovationPageResponse } from "./data";
import InnerHeroBanner from "../common/InnerHeroBanner";
import ImpactAreas from "./sections/ImpactAreas";
import SustainablityMoments from "./sections/SustainablityMoments";
import PressSpotlight from "./sections/SustainabilitySpotlight";


export default function Index({data}:{data:InnovationPageResponse['data']}) {

 const impactAreas = {
  title: data?.impact_title,

  items: [
    {
      id: "highlight-1",
      title: data?.highlight_title_1,
      description: data?.highlight_caption_1,
      image: data?.highlight_image_desktop_1,
      mobileImage: data?.highlight_image_mobile_1,
      alt: data?.highlight_image_alt_1,
    },

    {
      id: "highlight-2",
      title: data?.highlight_title_2,
      description: data?.highlight_caption_2,
      image: data?.highlight_image_desktop_2,
      mobileImage: data?.highlight_image_mobile_2,
      alt: data?.highlight_image_alt_2,
    },

    {
      id: "highlight-3",
      title: data?.highlight_title_3,
      description: data?.highlight_caption_3,
      image: data?.highlight_image_desktop_3,
      mobileImage: data?.highlight_image_mobile_3,
      alt: data?.highlight_image_alt_3,
    },
  ],
};

const spotlightData = (data?.spotlight || []).map((item, index) => ({
  id: item?.slug || `spotlight-${index + 1}`,
  date: item?.post_date || "",
  title: item?.title || "",
  href: `/media-center/news/${item?.slug || ""}`,
  image: item?.featured_image_desktop || "",
  mobileImage:item?.featured_image_mobile,
  alt: item?.featured_image_alt || "",
}));

  return (
    <>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      mobileImage={data.page_banner_mobile}
      maxW="max-w-[816px]" />
      {data?.show_reasons_section == "true" && <ImpactAreas data={impactAreas} />}
      {data?.show_appeal_section == "true" && <SustainablityMoments title={data.moments_title} description={data.moments_caption} data={data.moments}/>}
      {data?.show_communities_section == "true" && <PressSpotlight title={data.spotlight_title} data={spotlightData}/>}
    </>
  );
}