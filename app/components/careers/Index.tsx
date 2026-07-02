import { Suspense } from "react";
import InnerHeroBanner from "../common/InnerHeroBanner";
import ImpactAreas from "../sustainability/sections/ImpactAreas";
import { bannerData, careerImpactAreas, CareersPageResponse } from "./data";
import VacanciesSection from "./sections/CareerSection";
import WhatToExpect from "./sections/WhatToExpect";

const Index = ({data}:{data:CareersPageResponse['data']}) => {

  const careerImpactAreas = {
  title: data?.join_title,
  description: data?.join_brief,
  items: [
    {
      id: "highlight-1",
      title: data?.highlight_title_1,
      description: data?.highlight_caption_1,
      image: data?.highlight_image_desktop_1,
      mobileImage: data?.highlight_image_mobile_1,
      alt: data?.highlight_image_alt_1,
    },
    {
      id: "highlight-2",
      title: data?.highlight_title_2,
      description: data?.highlight_caption_2,
      image: data?.highlight_image_desktop_2,
      mobileImage: data?.highlight_image_mobile_2,
      alt: data?.highlight_image_alt_2,
    },
    {
      id: "highlight-3",
      title: data?.highlight_title_3,
      description: data?.highlight_caption_3,
      image: data?.highlight_image_desktop_3,
      mobileImage: data?.highlight_image_mobile_3,
      alt: data?.highlight_image_alt_3,
    },
  ],
};


const whatToExpectData = {
  heading: data?.expectation_title,

  description: data?.expectation_caption,

  carousalImages: (data?.gallery || []).map(
    (item: any) => ({
      src: item.moment_url,
      alt: item.moment_caption || data?.expectation_title,
    })
  ),
};

const careersData = (data?.vacancies || []).map(
  (item: any, index: number) => ({
    id: String(index + 1),

    title: item.job_title,

    description: item.caption,

    location: item.location,

    jobType: item.job_type,

    department: item.department,

    slug: item.slug,
  })
);

 const vacanciesConfig = {
  section: {
    title: data?.vacancy_title,

    description: data?.vacancy_brief,
  },

  filters: {
    department: [
      ...new Set(
        (data?.vacancies || []).map(
          (item: any) => item.department
        )
      ),
    ],

    jobType: [
      ...new Set(
        (data?.vacancies || []).map(
          (item: any) => item.job_type
        )
      ),
    ],
  },
};

  return (
    <div>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      mobileImage={data.page_banner_mobile}
      maxW="max-w-[392px]" />
      {data?.show_reasons_section == "true" && <ImpactAreas data={careerImpactAreas} />}
      {data?.show_appeal_section == "true" && <WhatToExpect data={whatToExpectData}/>}
      {data?.show_communities_section == "true" && <Suspense fallback={<div>Loading...</div>}>
        <VacanciesSection careersData={careersData} vacanciesConfig={vacanciesConfig}/>
      </Suspense>}
    </div>
  );
};

export default Index;
