import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, ConstructionProgressData } from "./data";
import Main from "./sections/Main";

const Index = ({data}:{data:ConstructionProgressData}) => {
  return (
    <>
      <InnerHeroBanner
        title={data?.page_banner_title}
        description={data?.page_banner_caption}
        image={data?.page_banner_desktop}
        mobileImage={data?.page_banner_mobile}
        maxTitle="max-w-[73ch]"
        maxW="max-w-[66ch]"
      />
      <div className="py-120 3xl:pt-[100px] 3xl:pb-160">
        <Main data={data.listing}/>
      </div>
    </>
  );
};

export default Index;
