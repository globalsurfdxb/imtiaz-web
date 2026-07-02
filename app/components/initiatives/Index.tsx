import React, { Suspense } from "react";
import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import InitiativeSection from "./sections/InitiativeSection";

const Index = ({data}:any) => {

  const initiatives =
  data?.listing?.map((item: any) => ({
    title: item.title,
    link: `${item.slug}`,
    image: item.featured_image_desktop,
    mobileImage:item.featured_image_mobile
  })) || [];

  return (
    <>
      <InnerHeroBanner 
      title={data?.page_banner_title} 
      image={data?.page_banner_desktop}
      mobileImage={data?.page_banner_mobile}
      description={data?.page_banner_caption} 
      maxW="max-w-[81ch]" />
      <Suspense fallback={<div>Loading...</div>}>
        <InitiativeSection data={initiatives}/>
      </Suspense>
    </>
  );
};

export default Index;
