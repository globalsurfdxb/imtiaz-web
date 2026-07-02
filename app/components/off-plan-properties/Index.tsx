import OffPlanBanner from "./sections/OffPlanBanner";
import { offPlanBannerData } from "./data";
import OffplanFaq from "./sections/OffplanFaq";
import WhyInvest from "./sections/WhyInvest";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = ({data}:any) => {
  return (
    <>
      <OffPlanBanner 
      image={data?.page_banner_desktop}
      mobileImage={data?.page_banner_mobile}
      title={data?.banner_title}
      description={data?.banner_caption}
      buttonText={data?.button_text}
      buttonLink={data?.button_url}
      maxW="max-w-[352px]" />

      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main data={data} />
      </Suspense>


      <WhyInvest />
      <OffplanFaq />
    </>
  );
};

export default Index;
