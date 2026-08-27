import InnerHeroBanner from "../common/InnerHeroBanner";
// import { bannerData } from './data'
import CommunitiesSectionV2 from "../community/sections/CommunitySection-v2";

const Index = ({ data }: any) => {
  return (
    <>
      <InnerHeroBanner
        image={data.page_banner_desktop}
        title={data.page_banner_title}
        description={data.page_banner_caption}
        maxW="max-w-[805px]"
      />
      <CommunitiesSectionV2
        title={data.page_title}
        description={data.page_caption}
        items={data.listing}
      />
    </>
  );
};

export default Index;
