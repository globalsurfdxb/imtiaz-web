// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLenis } from "../../contexts/LenisContext";
// import ProSliderComingSoonV3 from "../../components/Home/sections/ProSliderComingSoonV3";
// import FpfSection from "../../components/Home/sections/FpfSection";
// import ProSliderV3 from "../../components/Home/sections/ProsliderV3";
// import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
// import ConstructionProgress2 from "../../components/Home/sections/ConstructionProgress2";
// import AppSectionV2 from "../../components/Home/sections/AppSection";
// import CommunityNamesSlider from "../../components/Home/sections/CommunityNamesSlider";
// import AboutJourneyV3 from "../../components/Home/sections/AboutJourneyV3";
// import SpotlightSlider from "../../components/Home/sections/SpotlightSlider";
// import HeroSection from "./sections/HeroSection";
// import { HomePageResponse } from "./data";

// gsap.registerPlugin(ScrollTrigger);

// type HeroSlide = {
//   title: string;
//   video: string;
//   pillFeatures: {
//     title: string;
//     features: { icon: string; label: string }[];
//   };
// };

// type ComingSoonSlide = {
//   title: string;
//   desktopVideo: string;
//   mobileVideo: string;
// };

// type CommunityNamesData = {
//   heading: string;
//   communities: {
//     id: string;
//     name: string;
//     bgImage: string;
//     link: string;
//   }[];
// };

// type ImtiazPropertiesData = {
//   sectionTitle: string;
//   properties: {
//     id: number;
//     title: string;
//     image: string;
//     link: string;
//     logo: string;
//   }[];
// };

// type ConstructionProgressData = {
//   title: string;
//   videoSrc: string;
//   posterSrc: string;
//   description: string;
//   button: { label: string; link: string };
// };

// type AppSectionData = {
//   heading: string;
//   subtitle: string;
//   mobileImage: string;
//   leftCircles: { title: string; icon: string }[];
//   rightCircles: { title: string; icon: string }[];
//   download: {
//     text: string;
//     googlePlay: string;
//     appStore: string;
//   };
// };

// type Props = {
//   heroSlides: HeroSlide[];
//   heroSlidesComingSoon: ComingSoonSlide[];
//   promotion: HeroSlide[];
//   communityNamesData: CommunityNamesData;
//   imtiazPropertiesData: ImtiazPropertiesData;
//   ConstructionProgressData: ConstructionProgressData;
//   appSectionData: AppSectionData;
//   data: HomePageResponse['data']
//   communitiesData: any,
//   propertiesData:any
// };

// export default function Index({
//   heroSlidesComingSoon,
//   ConstructionProgressData,
//   appSectionData,
//   data,
//   communitiesData,
//   propertiesData
// }: Props) {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const scrollRef = useRef<HTMLImageElement>(null);
//   const searchRef = useRef<HTMLImageElement>(null);
//   const mobsearchRef = useRef<HTMLImageElement>(null);

//   const { unlock } = useLenis();

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   useEffect(() => {
//     let ctx: gsap.Context | null = null;

//     const startAnimations = () => {
//       if (ctx) return;
//       document.body.style.overflow = "";
//       unlock();

//       ctx = gsap.context(() => {
//         const t2 = gsap.timeline();
//         t2.fromTo(
//           titleRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1.2 },
//         ).fromTo(
//           searchRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3",
//         ).fromTo(
//           scrollRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3",
//         ).fromTo(
//           mobsearchRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3",
//         );
//       });

//       window.dispatchEvent(new Event("homeAnimationsReady"));
//       setTimeout(() => ScrollTrigger.refresh(), 300);
//     };

//     window.addEventListener("headerAnimationComplete", startAnimations);

//     return () => {
//       window.removeEventListener("headerAnimationComplete", startAnimations);
//       ctx?.revert();
//       ctx = null;
//     };
//   }, []);

//   const communityNamesData = {
//     heading: "IMTIAZ COMMUNITIES",
//     communities: data.communities.map((community, index) => ({
//       id: (index + 1).toString(),
//       name: community.title,
//       bgImage: community.featured_image_desktop,
//       link: `/community/${community.slug}`,
//     })),
//   };

//   const imtiazPropertiesData = {
//     sectionTitle: "OFF-PLAN PROPERTIES",

//     properties: data.properties.map((property, index) => ({
//       id: (index + 1).toString(),
//       title: property.title,
//       image: property.featured_image_desktop,
//       link: `/property/${property.slug}`,
//       location: property.property_community,
//       hoverImage: property.brand_logo,
//       startingFrom: property.icon1_text,
//       units: property.icon2_text
//     })),
//   };

//   const spotlight = {
//     title: "Press Spotlight",
//     viewAllHref: "/news",
//     slides: data.news.map((item, index) => ({
//       id: `spotlight-${index + 1}`,
//       date: item.post_date,
//       title: item.title,
//       href: `/news/${item.slug}`,
//       image: item.featured_image_desktop,
//       alt: item.featured_image_alt,
//     })),
//   };

//   const heroSlides = data.new_launches.map((item) => ({
//     title: item.title,
//     video: item.banner_video_dektop,
//     pillFeatures: {
//       title: "/icons/pro_slider/sunset_bay.svg",
//       features: item.amenities.slice(0,4).map((feature) => ({
//         icon: feature.icon_url,
//         label: feature.title,
//       })),
//     },
//   }));

//   return (
//     <>
//       <HeroSection
//         titleRef={titleRef}
//         desktopVideo={data?.page_banner_video}
//         mobileVideo={data?.page_banner_video_mobile}
//         title={data?.page_banner_title}
//         posterDesktop={data?.page_hero_poster_dektop}
//         posterMobile={data?.page_hero_poster_mobile}
//       />
//       {data?.page_show_section1 === "true" &&
//       <AboutJourneyV3
//         searchRef={searchRef}
//         mobsearchRef={mobsearchRef}
//         communitiesData={communitiesData}
//         video={data?.page_section1_video}
//         title={data?.page_section1_title}
//         poster={data?.page_section1_poster}
//         propertiesData={propertiesData}
//       />}
//       {data?.page_show_section2 === "true" &&
//       <ProSliderV3 slides={heroSlides} RightLabel="Featured Properties" title={data?.page_section2_title} />}
//       {data?.page_show_section3 === "true" && <ProSliderComingSoonV3
//         slides={heroSlidesComingSoon}
//         // RightLabel="World of IMTIAZ"
//         video={data?.page_section3_video}
//         title={data?.page_section3_title}
//         buttonText={data?.page_section3_buttontext}
//         url={data?.page_section3_buttonurl}
//       />}
//       {/* <FpfSection video={data?.page_section4_video} title={data?.page_section4_title} description={data?.page_section4_caption} buttonText={data?.page_section4_buttontext} url={data?.page_section4_buttonurl}/> */}
//       {data?.page_show_section5 === "true" && <CommunityNamesSlider slides={communityNamesData} title={data?.page_section5_title} />}
//       {data?.page_show_section6 === "true" && <ImtiazProperties data={imtiazPropertiesData} title={data?.page_section6_title} />}
//       {data?.page_show_section7 === "true" && <ConstructionProgress2
//         data={ConstructionProgressData}
//         video={data?.page_section7_video}
//         title={data?.page_section7_title}
//         description={data?.page_section7_caption}
//         buttonText={data?.page_section7_buttontext}
//         url={data?.page_section7_buttonurl}
//         poster={data?.page_section7_poster}
//       />}
//       {data?.page_show_section8 === "true" && <SpotlightSlider data={spotlight} title={data?.page_section8_title} />}
//       {data?.page_show_section9 === "true" && <AppSectionV2 data={appSectionData} appStore={data?.apple_store_link} playStore={data?.android_store_link} title={data?.page_section9_title} description={data?.page_section9_caption} />}
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../../contexts/LenisContext";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import ProSliderComingSoonV3 from "../../components/Home/sections/ProSliderComingSoonV3";
import FpfSection from "../../components/Home/sections/FpfSection";
import ProSliderV3 from "../../components/Home/sections/ProsliderV3";
// import ImtiazProperties from "../../components/Home/sections/ImtiazPropsSlider";
import ConstructionProgress2 from "../../components/Home/sections/ConstructionProgress2";
import AppSectionV2 from "../../components/Home/sections/AppSection";
import CommunityNamesSlider from "../../components/Home/sections/CommunityNamesSlider";
import AboutJourneyV3 from "../../components/Home/sections/AboutJourneyV3";
import SpotlightSlider from "../../components/Home/sections/SpotlightSlider";
import HeroSection from "./sections/HeroSection";
import { HomePageResponse } from "./data";
import ImtiazPropertiesSnap from "./sections/ImtiazPropertiesSnap";
import SpotlightSliderSnap from "./sections/SpotlightSliderSnap";

gsap.registerPlugin(ScrollTrigger);

type HeroSlide = {
  title: string;
  video: string;
  pillFeatures: {
    title: string;
    features: { icon: string; label: string }[];
  };
};

type ComingSoonSlide = {
  title: string;
  desktopVideo: string;
  mobileVideo: string;
};

type CommunityNamesData = {
  heading: string;
  communities: {
    id: string;
    name: string;
    bgImage: string;
    link: string;
  }[];
};

type ImtiazPropertiesData = {
  sectionTitle: string;
  properties: {
    id: number;
    title: string;
    image: string;
    link: string;
    logo: string;
  }[];
};

type ConstructionProgressData = {
  title: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
  button: { label: string; link: string };
};

type AppSectionData = {
  heading: string;
  subtitle: string;
  mobileImage: string;
  leftCircles: { title: string; icon: string }[];
  rightCircles: { title: string; icon: string }[];
  download: {
    text: string;
    googlePlay: string;
    appStore: string;
  };
};

type Props = {
  heroSlides: HeroSlide[];
  heroSlidesComingSoon: ComingSoonSlide[];
  promotion: HeroSlide[];
  communityNamesData: CommunityNamesData;
  imtiazPropertiesData: ImtiazPropertiesData;
  ConstructionProgressData: ConstructionProgressData;
  appSectionData: AppSectionData;
  data: HomePageResponse["data"];
  communitiesData: any;
  propertiesData: any;
};

export default function Index({
  heroSlidesComingSoon,
  ConstructionProgressData,
  appSectionData,
  data,
  communitiesData,
  propertiesData,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLImageElement>(null);
  const searchRef = useRef<HTMLImageElement>(null);
  const mobsearchRef = useRef<HTMLImageElement>(null);

  // ── snap section refs ──────────────────────────────────────────────────────
  // These wrap each full-screen video section above CommunityNamesSlider.
  // We attach them to plain div wrappers so we don't touch section internals.
  const snapRef1 = useRef<HTMLElement>(null); // HeroSection  (#sec1 — sticky)
  const snapRef2 = useRef<HTMLElement>(null); // AboutJourneyV3
  const snapRef3 = useRef<HTMLElement>(null); // ProSliderV3
  const snapRef4 = useRef<HTMLElement>(null); // ProSliderComingSoonV3
  const snapRef5 = useRef<HTMLElement>(null); // CommunityNamesSlider
  const snapRef6 = useRef<HTMLElement>(null); // ImtiazProperties
  const snapRef7 = useRef<HTMLElement>(null); // ConstructionProgress2
  const snapRef8 = useRef<HTMLElement>(null); // SpotlightSlider
  const snapRef9 = useRef<HTMLElement>(null); // AppSectionV2

  const footerRef = useRef<HTMLElement>(null);
  const [footerReady, setFooterReady] = useState(false);

  useEffect(() => {
    const footerEl = document.querySelector<HTMLElement>(
      'footer[data-header="dark"]',
    );
    if (footerEl) {
      footerRef.current = footerEl;
      setFooterReady(true);
    }
  }, []);

  // snap enabled only after header animation fires
  const [snapEnabled, setSnapEnabled] = useState(false);

  const { unlock } = useLenis();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const startAnimations = () => {
      if (ctx) return;
      document.body.style.overflow = "";
      unlock();

      ctx = gsap.context(() => {
        const t2 = gsap.timeline();
        t2.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
        )
          .fromTo(
            searchRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.3",
          )
          .fromTo(
            scrollRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.3",
          )
          .fromTo(
            mobsearchRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.3",
          );
      });

      window.dispatchEvent(new Event("homeAnimationsReady"));
      setTimeout(() => ScrollTrigger.refresh(), 300);

      // Enable snap after animations settle
      setTimeout(() => setSnapEnabled(true), 400);
    };

    window.addEventListener("headerAnimationComplete", startAnimations);

    return () => {
      window.removeEventListener("headerAnimationComplete", startAnimations);
      ctx?.revert();
      ctx = null;
    };
  }, []);

  // ── wire snap ─────────────────────────────────────────────────────────────
  // Build the ordered list conditionally based on which sections are shown.
  // HeroSection is always shown. Others depend on page_show_sectionN flags.
  const snapRefs: React.RefObject<HTMLElement | null>[] = [snapRef1];
  if (data?.page_show_section1 === "true") snapRefs.push(snapRef2);
  if (data?.page_show_section2 === "true") snapRefs.push(snapRef3);
  if (data?.page_show_section3 === "true") snapRefs.push(snapRef4);
  if (data?.page_show_section5 === "true") snapRefs.push(snapRef5);
  if (data?.page_show_section6 === "true") snapRefs.push(snapRef6);
  if (data?.page_show_section7 === "true") snapRefs.push(snapRef7);
  if (data?.page_show_section8 === "true") snapRefs.push(snapRef8);
  if (data?.page_show_section9 === "true") snapRefs.push(snapRef9);
  if (footerReady) snapRefs.push(footerRef);

  useSectionSnap(snapRefs, snapEnabled && footerReady);
  // ──────────────────────────────────────────────────────────────────────────

  const communityNamesData = {
    heading: "IMTIAZ COMMUNITIES",
    communities: data.communities.map((community, index) => ({
      id: (index + 1).toString(),
      name: community.title,
      bgImage: community.featured_image_desktop,
      bgImageMobile:community.featured_image_mobile,
      link: `/community/${community.slug}`,
    })),
  };

  const imtiazPropertiesData = {
    sectionTitle: "OFF-PLAN PROPERTIES",

    properties: data.properties.map((property, index) => ({
      id: (index + 1).toString(),
      title: property.title,
      image: property.featured_image_desktop,
      mobileImage: property.featured_image_mobile,
      link: `/property/${property.slug}`,
      location: property.property_community,
      hoverImage: property.brand_logo,
      startingFrom: property.icon1_text,
      units: property.icon2_text,
    })),
  };

  const spotlight = {
    title: "Press Spotlight",
    viewAllHref: "/news",
    slides: data.news
      .filter((item) => item.category_name?.toLowerCase() === "sustainability")
      .map((item, index) => ({
        id: `spotlight-${index + 1}`,
        date: item.post_date,
        title: item.title,
        href: `/news/${item.slug}`,
        image: item.featured_image_desktop,
        mobileImage: item.featured_image_mobile,
        alt: item.featured_image_alt,
      })),
  };

  const heroSlides = data.new_launches.map((item) => ({
    title: item.title,
    slug: item.slug,
    video: item.banner_video_dektop,
    mobileVideo: item.banner_video_mobile,
    pillFeatures: {
      title: "/icons/pro_slider/sunset_bay.svg",
      features: item.amenities.slice(0, 4).map((feature) => ({
        icon: feature.icon_url,
        label: feature.title,
      })),
    },
  }));

  return (
    <>
      {/* ── snap section 1: Hero ──────────────────────────────────────────── */}
      {/* HeroSection already renders its own <section id="sec1" sticky top-0 z-0>
          We need its offsetTop for snapping. Since it's sticky and always at 0
          we attach the ref to a zero-height sentinel div above it. */}
      <div ref={snapRef1 as React.RefObject<HTMLDivElement>} />
      <HeroSection
        titleRef={titleRef}
        desktopVideo={data?.page_banner_video}
        mobileVideo={data?.page_banner_video_mobile}
        title={data?.page_banner_title}
        posterDesktop={data?.page_hero_poster_dektop}
        posterMobile={data?.page_hero_poster_mobile}
      />

      {/* ── snap section 2: AboutJourneyV3 ───────────────────────────────── */}
      {data?.page_show_section1 === "true" && (
        <div ref={snapRef2 as React.RefObject<HTMLDivElement>}>
          <AboutJourneyV3
            searchRef={searchRef}
            mobsearchRef={mobsearchRef}
            communitiesData={communitiesData}
            video={data?.page_section1_video}
            mobileVideo={data?.page_section1_video_mobile}
            title={data?.page_section1_title}
            poster={data?.page_section1_poster}
            posterMobile={data?.page_section1_poster_mobile}
            propertiesData={propertiesData}
          />
        </div>
      )}

      {/* ── snap section 3: ProSliderV3 ──────────────────────────────────── */}
      {data?.page_show_section2 === "true" && (
        <div ref={snapRef3 as React.RefObject<HTMLDivElement>}>
          <ProSliderV3
            slides={heroSlides}
            RightLabel="Featured Properties"
            title={data?.page_section2_title}
          />
        </div>
      )}

      {/* ── snap section 4: ProSliderComingSoonV3 ────────────────────────── */}
      {data?.page_show_section3 === "true" && (
        <div ref={snapRef4 as React.RefObject<HTMLDivElement>}>
          <ProSliderComingSoonV3
            slides={heroSlidesComingSoon}
            video={data?.page_section3_video}
            mobileVideo={data?.page_section3_video_mobile}
            title={data?.page_section3_title}
            subtitle={data?.page_section3_subtitle}
            caption={data?.page_section3_caption}
            buttonText={data?.page_section3_buttontext}
            url={data?.page_section3_buttonurl}
          />
        </div>
      )}

      {/* ── from here: normal Lenis scroll ───────────────────────────────── */}
      {/* <FpfSection video={data?.page_section4_video} title={data?.page_section4_title} description={data?.page_section4_caption} buttonText={data?.page_section4_buttontext} url={data?.page_section4_buttonurl}/> */}
      {/* {data?.page_show_section5 === "true" && <CommunityNamesSlider slides={communityNamesData} title={data?.page_section5_title} />}
      {data?.page_show_section6 === "true" && <ImtiazProperties data={imtiazPropertiesData} title={data?.page_section6_title} />}
      {data?.page_show_section7 === "true" && <ConstructionProgress2
        data={ConstructionProgressData}
        video={data?.page_section7_video}
        title={data?.page_section7_title}
        description={data?.page_section7_caption}
        buttonText={data?.page_section7_buttontext}
        url={data?.page_section7_buttonurl}
        poster={data?.page_section7_poster}
      />}
      {data?.page_show_section8 === "true" && <SpotlightSlider data={spotlight} title={data?.page_section8_title} />}
      {data?.page_show_section9 === "true" && <AppSectionV2 data={appSectionData} appStore={data?.apple_store_link} playStore={data?.android_store_link} title={data?.page_section9_title} description={data?.page_section9_caption} />} */}
      {data?.page_show_section5 === "true" && (
        <div ref={snapRef5 as React.RefObject<HTMLDivElement>}>
          <CommunityNamesSlider
            slides={communityNamesData}
            title={data?.page_section5_title}
          />
        </div>
      )}
      {data?.page_show_section6 === "true" && (
        <div ref={snapRef6 as React.RefObject<HTMLDivElement>}>
          <ImtiazPropertiesSnap
            data={imtiazPropertiesData}
            title={data?.page_section6_title}
          />
        </div>
      )}
      {data?.page_show_section7 === "true" && (
        <div ref={snapRef7 as React.RefObject<HTMLDivElement>}>
          <ConstructionProgress2
            data={ConstructionProgressData}
            video={data?.page_section7_video}
            title={data?.page_section7_title}
            description={data?.page_section7_caption}
            buttonText={data?.page_section7_buttontext}
            url={data?.page_section7_buttonurl}
            poster={data?.page_section7_poster}
          />
        </div>
      )}
      {data?.page_show_section8 === "true" && (
        <div ref={snapRef8 as React.RefObject<HTMLDivElement>}>
          <SpotlightSliderSnap
            data={spotlight}
            title={data?.page_section8_title}
          />
        </div>
      )}

      {data?.page_show_section9 === "true" && (
        <div ref={snapRef9 as React.RefObject<HTMLDivElement>}>
          <AppSectionV2
            data={appSectionData}
            appStore={data?.apple_store_link}
            playStore={data?.android_store_link}
            title={data?.page_section9_title}
            description={data?.page_section9_caption}
          />
        </div>
      )}
    </>
  );
}
