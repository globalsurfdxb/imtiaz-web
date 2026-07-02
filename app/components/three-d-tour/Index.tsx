import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, TourPageResponse } from "./data";
import ExploreSpaces from "./sections/ExploreSpaces";
 
const Index = ({data}:{data:TourPageResponse['data']}) => {
  return (
    <>
      <InnerHeroBanner 
      title={data?.page_banner_title}
      image={data?.page_banner_desktop}
      mobileImage={data?.page_banner_mobile}
      description={data?.page_banner_caption}
      maxTitle="max-w-[73ch]" maxW="max-w-[38ch]" /> 
      <ExploreSpaces 
      title={data?.page_title}
      description={data?.page_caption}
      data={data?.listing}
      />
    </>
  );
};

export default Index;



