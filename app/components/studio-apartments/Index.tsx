import StudioBanner from "./sections/StudioBanner";
import StudioFaq from "./sections/StudioFaq";
import StudioDesc from "./sections/StudioDesc";
import Main from "./sections/Main";
import { Suspense } from "react";

const Index = ({ data }: any) => {
  console.log("Studio Apartments Data:", data); // Log the data to the console for debugging
  return (
    <>
      <StudioBanner
        image={data?.page_banner_desktop}
        mobileImage={data?.page_banner_mobile || data?.page_banner_desktop}
        title={data?.banner_title}
        description={data?.banner_caption}
        buttonText={data?.button_text}
        buttonLink={data?.button_url}
        maxW="max-w-[352px]"
      />

      <Suspense fallback={<div className="h-screen bg-white" />}>
        <Main data={data} />
      </Suspense>

      <StudioDesc data={data} />
      <StudioFaq data={data} />
    </>
  );
};

export default Index;
