import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, BlogListingData } from "./data";
import BlogsSection from "./sections/BlogsSection";
import { Suspense } from "react";

const Index = ({data}:{data:BlogListingData}) => {
  return (
    <div>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      mobileImage={data.page_banner_mobile}
       maxW="max-w-[580px]" />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogsSection data={data}/>
      </Suspense>
    </div>
  );
};

export default Index;
