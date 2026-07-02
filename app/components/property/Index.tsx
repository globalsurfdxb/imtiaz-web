import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData, projectsData, PropertiesPageData } from "./data";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = ({data}:{data:PropertiesPageData}) => {
  return (
    <>
      <InnerHeroBanner image={data.page_banner_desktop} mobileImage={data.page_banner_mobile} title={data.page_banner_title} description={data.page_banner_caption} maxW="max-w-[805px]" />
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main data={data}/>
      </Suspense>
    </>
  );
};

export default Index;
