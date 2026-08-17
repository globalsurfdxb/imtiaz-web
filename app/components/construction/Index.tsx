import ConstructionBanner from "./sections/ConstructionBanner";
import { bannerData } from "./data";
import TimelineSlider from "./sections/TimeLineSlider";
import ExpertiseSlider from "./sections/ExpertiseSlider";
import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
import IconSlider from "./sections/IconSlider";

const Index = ({ data }: any) => {

const bannerData = {
  video: data?.page_banner_video_desktop,
  poster:data?.page_banner_desktop,
  mobilePoster:data?.page_banner_desktop,
  mobileVideo:data?.banner_video_mobile,
  title: data?.page_banner_title,
  description: data?.page_banner_caption,
  features: [
    {
      key: data?.highlight_title_1,
      value: data?.highlight_caption_1,
    },
    {
      key: data?.highlight_title_2,
      value: data?.highlight_caption_2,
    },
    {
      key: data?.highlight_title_3,
      value: data?.highlight_caption_3,
    },
  ],
};

const timelineSectionData = {
  title: data?.history_title,
  description: data?.history_brief,
  slides:
    data?.history?.map((item: any) => ({
      year: Number(item.year),
      title: item.title,
      image: item.image_desktop,
      mobileImage:item.image_mobile
    })) || [],
};

  const imtiazPropertiesData = {
  sectionTitle: "PROPERTIES",

  properties: data.properties.map((property:any, index:number) => ({
    id: (index + 1).toString(),
    title: property.title,
    image: property.featured_image_desktop,
    mobileImage:property.featured_image_mobile,
    link: `/property/${property.slug}`,
    location: property.property_community,
    hoverImage: property.brand_logo,
    startingFrom:property.icon1_text,
    units:property.icon2_text
  })),
};

const coreExpertiseData = {
  title: data?.expertise_title,
  slides:
    data?.expertises?.map((item:any) => ({
      image: item.image_desktop,
      mobileImage:item.image_mobile,
      title: item.title,
      description: item.caption,
    })) || [],
};

const commitmentSectionData = {
  title: data?.commitment_title,
  description: data?.commitment_brief,
  items: data?.commitments?.map((item: any) => ({
    icon: item.icon_url,
    title: item.title,
  })) || [],
};

  return (
    <>
      <ConstructionBanner 
      {...bannerData}
      />
      {data?.show_history_section == "true" && <TimelineSlider data={timelineSectionData}/>}
      {data?.show_expertise_section == "true" && <ExpertiseSlider data={coreExpertiseData}/>}
      {data?.show_properties_section == "true" && <ImtiazProperties data={imtiazPropertiesData} title={imtiazPropertiesData.sectionTitle} className="py-120 2xl:py-130"/> }    
      {data?.show_commitment_section == "true" && <IconSlider data={commitmentSectionData}/>}
    </>
  );
};

export default Index;
