import StudioBanner from "./sections/StudioBanner";
import StudioFaq from "./sections/StudioFaq";
import WhyInvest from "./sections/StudioDesc";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = ({ data }: any) => {
  return (
    <>
      <StudioBanner
        // image={data?.page_banner_desktop}
        image={"/images/studio-apartments/banner.jpg"}
        // mobileImage={data?.page_banner_mobile}
        mobileImage={"/images/studio-apartments/banner.jpg"}
        // title={data?.banner_title}
        title={"Studio Apartments in Dubai"}
        // description={data?.banner_caption}
        description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
        buttonText={data?.button_text}
        buttonLink={data?.button_url}
        maxW="max-w-[352px]"
      />

      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main data={data} />
      </Suspense>

      <WhyInvest />
      <StudioFaq />
    </>
  );
};

export default Index;
