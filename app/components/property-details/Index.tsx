import InnerHeroBanner from "./sections/InnerHeroBanner";
import { bannerData, eventDetails, PropertyDetailsData } from "./data";
import MeydanHorizon from "./sections/MeydanHorizon";
import IconGrid from "../common/IconGrid";
import Amenities from "../common/Amenities";
import LandpropertyCards from "./sections/LandpropertyCards";
import Map from "./sections/Map";
import Faqsection from "./sections/Faqsection";
import ConstructionProgress from "./sections/ConstructionProgress";
// import { EverythingWithinData, amenitiesData } from "./data";
import GallerySlider from "./sections/GallerySlider";
import UnitLayout from "./sections/UnitLayout";
import ProjectIntro from "./sections/ProjectIntro";
import RegBtn from "./sections/RegBtn";
import { PropertiesPageData } from "../property/data";

const Index = ({
  data,
  allPropertyData,
  slug
}: {
  data: PropertyDetailsData;
  allPropertyData: PropertiesPageData;
  slug: string;
}) => {
  const everythingWithinData = {
    title: data?.reach_title,
    description: data?.reach_caption,
    cards: data?.reach,
  };

  const amenetiesData = {
    title: data?.amenities_title,
    description: data?.amenities_brief,
    amenities: data?.amenities?.map((item) => ({
      icon: item.icon_url,
      label: item.title,
    })),
  };

  return (
    <>
      <InnerHeroBanner
        video={data?.page_banner_video_desktop}
        mobileVideo={data?.page_banner_video_mobile}
        image={data?.page_banner_desktop}
        mobileImage={data?.page_banner_mobile}
        title={data?.page_banner_title}
        description=""
        maxTitle="max-w-[73ch]"
        location={data?.location}
        payment_plan={data?.payment_plan}
        starting_price={data?.starting_price}
        delivery_date={data?.delivery_date}
      />
      {data.show_basic_section == "true" && <ProjectIntro
        title={data?.basic_title}
        description={data?.basic_brief}
        brochure={data?.brochure}
        fact_sheet={data?.fact_sheet}
        unit_layout={data?.unit_layout}
        hide_button_brochure={data?.hide_button_brochure}
        hide_button_factsheet={data?.hide_button_factsheet}
        hide_button_unitlayout={data?.hide_button_unitlayout}
      />}
      {data.show_construction_section == "true" && <ConstructionProgress
        title={data?.construction_title}
        description={data?.construction_brief}
        image={data?.construction_image}
        estimated_completion={data?.estimated_completion}
        percent_overall={data?.percent_overall}
        percent1={data?.percent1}
        percent1_label={data?.percent1_label}
        percent2={data?.percent2}
        percent2_label={data?.percent2_label}
        percent3={data?.percent3}
        percent3_label={data?.percent3_label}
        percent4={data?.percent4}
        percent4_label={data?.percent4_label}
        construction_button_text={data?.construction_button_text}
        construction_button_url={data?.construction_button_url}
        slug={slug}
      />}
      {data.show_reach_section == "true" && <IconGrid data={everythingWithinData} />}
      {data.show_gallery_section == "true" && <GallerySlider data={data?.gallery} />}
      {data.show_gallery_section == "false" && <hr />}
      {data.show_amenities_section == "true" && <Amenities data={amenetiesData} maxTitle="max-w-[90ch]" />}
      {!data?.unit_layouts && <hr />}
      {data?.show_unitlayout_section == "true" && data?.unit_layouts && <UnitLayout data={data?.unit_layouts} />}

      {data.show_community_overview_section == "true" && <MeydanHorizon
        title={data?.community_name}
        description={data?.community_basic_brief}
        subTitle={data?.community_basic_title}
        slug={data?.community_slug}
      />}
      <Map
        latitude={data?.property_latitude}
        longitude={data?.property_longitude}
      />
      {data.show_faq_section == "true" && <Faqsection
        title={data?.faq_title}
        description={data?.faq_caption}
        data={data?.faq}
      />}

      {data.show_similar_property_section == "true" && allPropertyData?.listing.filter(
        (item) =>
          item.property_community == data?.community_name &&
          item.title !== data?.page_banner_title,
      ).length > 0 && (
          <LandpropertyCards
            data={allPropertyData?.listing}
            community={data?.community_name}
            property={data?.page_banner_title}
          />
        )}
      {/* <RegBtn /> */}
    </>
  );
};

export default Index;
