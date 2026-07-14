import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, CommunityPageData, eventDetails } from "./data";
import DubaiResidence from "./sections/DubaiResidence";
import IconGrid from "../common/IconGrid";
import CommunitySlider from "./sections/CommunitySlider";
import Amenities from "../common/Amenities";
import LandpropertyCards from "./sections/LandpropertyCards";
import Map from "./sections/Map";
import OtherCommunitySlider from "./sections/OtherCommunitySlider";
import Faqsection from "./sections/Faqsection";
import RegisterYourInterest from "./sections/RegisterYourInterest";

// import { EverythingWithinData, amenitiesData } from "./data";
const Index = ({data,communitiesData}:{data:CommunityPageData,communitiesData:any}) => {
  
  const everythingWithinData = {
    title:data?.reach_title,
    description:data?.reach_caption,
    cards:data?.reach ?? []
  }

const amenetiesData = {
  title: data?.doorstep_title,
  description: data?.doorstep_caption,
  amenities: data?.near_by.map((item) => ({
    icon: item.icon_url,
    label: item.title,
  })),
};


  return (
    <>
      <InnerHeroBanner image={data?.page_banner_desktop} mobileImage={data?.page_banner_mobile} title={data?.page_banner_title} description="" maxTitle="max-w-[73ch]" />
      <DubaiResidence title={data?.basic_title} description={data?.basic_brief} subTitle={data?.basic_caption}/>
      <IconGrid data={everythingWithinData} bgClass="bg-gray" />
      <CommunitySlider images={data?.gallery} />
      <Amenities data={amenetiesData} maxTitle="max-w-[74ch]" />
      {data?.related_property && data?.related_property.length > 0 && <LandpropertyCards title={data?.properties_title} items={data?.related_property}/>}
      <Map pt={data?.related_property && data?.related_property.length > 0 ? true : false} 
        geofenceCoordinates={data?.geofence_coordinates}
        relatedProperties={data?.related_property}
        />
      <OtherCommunitySlider data={communitiesData} title={data?.other_communities_title} currentItem={data?.page_banner_title}/>
      <Faqsection title={data?.faq_title} description={data?.faq_caption} data={data?.faq}/>
      <RegisterYourInterest />
    </>
  );
};

export default Index;
