export type AboutPageResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string;

    page_banner_title: string;
    page_banner_caption: string;
    page_banner_desktop: string;
    page_banner_mobile: string;
    page_banner_alt: string;

    vision_title1: string;
    vision_brief: string;
    vision_title2: string;
    vision_caption2: string;
    vision_title3: string;
    vision_caption3: string;
    vision_image_desktop: string;
    vision_image_mobile: string;
    vision_image_alt: string;

    chairman_title: string;
    chairman_caption: string;
    chairman_brief: string;
    chairman_name: string;
    chairman_profile: string;
    chairman_image_desktop: string;
    chairman_image_background:string;
    chairman_image_mobile: string;
    chairman_image_alt: string;
    chairman_image_background_mobile:string;
    ceo_image_background_mobile:string;

    ceo_title: string;
    ceo_caption: string;
    ceo_brief: string;
    ceo_name: string;
    ceo_profile: string;
    ceo_image_desktop: string;
    ceo_image_background:string;
    ceo_image_mobile: string;
    ceo_image_alt: string;

    philosophy_title: string;
    philosophy_caption: string;

    history_title: string;
    history_caption: string;
    history: Record<string, {
      featured_image: string;
      featured_image_alt: string | null;
      year: string;
      title: string | null;
      brief: string;
    }[]>;

    medal_title: string;
    medal_brief: string;
    medal_image_desktop: string;
    medal_image_mobile: string;
    medal_image_alt: string;

    expertise_title: string;
    expertise_caption: string;
    expertise_button_text: string | null;
    expertise_button_url: string | null;

    show_vision_section: string;
    show_chairman_section: string;
    show_ceo_section: string;
    show_philosophy_section: string;
    show_history_section: string;
    show_medal_section: string;
    show_expertise_section: string;
    show_extras_section: string;

    listing: {
      extra_title: string;
      extra_caption: string;
      extra_button_text: string;
      extra_button_url: string;
      extra_image_desktop: string;
      extra_image_mobile: string;
      extra_image_alt: string;
    }[];
  };
};



export const bannerData = {
  title: "Our Story",
  description:
    "Imtiaz was born from a deep-rooted belief that real estate is far more than bricks and mortar - it is about shaping lifestyles, building legacies, and crafting environments that inspire generations. What began as a modest \n construction endeavour in 1993 has since evolved into one of the UAE's most respected \n and visionary real estate development companies.",
  image: "/images/our-story/banner.jpg",
};

export const visionSectionData = {
  title: "A Vision Built in 1993",
  description:
    "At Imtiaz, we do more than develop properties — we craft experiences. Every project echoes our deep passion for architecture, purposeful design, and sustainable living. From luxury residences to waterfront communities and \n concept-driven spaces, each development is created to enrich lives and leave a lasting impact.",
  bgImage: "/images/our-story/vision-bg.jpg",
  bgImageMobile: "/images/our-story/vision-bg-mobile.jpg",
  stats: [
    {
      value: "AED 10BN",
      label: "Landmark Projects",
    },
    {
      value: "40+",
      label: "Developments",
    },
  ],
};

export type messageData = {
  id: string;
  title: string;
  quote: string;
  name: string;
  designation: string;
  description: string;
  personImage: string;
  personImageMobile?:string;
  bgImage: string;
  bgImageMobile: string;
};

export const chairmanMessageData: messageData = {
  id: "chairman",
  title: "Message From Chairman",
  quote: "Asian and Middle Eastern economies grew rapidly despite challenges.",
  name: "Ustad Rahimullah Shahsawar",
  designation: "Chairman, Imtiaz Developments",
  description:
    "The fundamental pillars of our rich history of accomplishments remains in our experienced, professional, and highly motivated team who strive to harness their diverse synergies in their fields. We work hard to push the human boundaries with innovation and superior quality services. Our ambition is to be an unstoppable organization that creates enormous value for our clients, our team, and our environment.",
  personImage: "/images/our-story/chairman4.png",
  bgImage: "/images/our-story/Chairman-bg2.jpg",
  bgImageMobile: "/images/our-story/chairman-bg-mobile.png",
};

export const ceoMessageData: messageData = {
  id: "ceo",
  title: "Message From CEO",
  quote: "Imtiaz Developments creates vibrant, modern communities.",
  name: "Mr. Masih Ullah Imtiaz",
  designation: "CEO, Imtiaz Developments",
  description:
    "Driven by innovation, sustainability, and uncompromising quality, we transform possibilities into inspiring realities. Every project is more than a structure—it’s a thoughtfully crafted living space that enriches lives and reflects the values of our community. \n With a commitment to excellence and forward-thinking design, we continue to shape environments that elevate lifestyles and set new standards for the future.",
  personImage: "/images/our-story/ceo4.png",
  bgImage: "/images/our-story/ceo-bg2.jpg",
  bgImageMobile: "/images/our-story/ceo-bg-mobile.png",
};

export const philosophyData = {
  title: "Our Philosophy",
  description:
    "Guided by innovation and inspired by the extraordinary, our vision at Imtiaz Developments is to reimage the notion of real estate development. We envision a world where architecture becomes a canvas for creativity, and ideas take shape as breathtakingrealities. Our mission is to reshape the very essence of living by introducing \n unique architectural marvels that stand as timeless symbols of imagination and ingenuity. As pioneers in this journey, we are dedicated to shaping \n communities that not only raise lifestyles but also inspire new ways of experiencing premium living.",
};

export const awardData = {
  title: "Mohammed Bin Rashid Al \n Maktoum Medal for Philanthropy.",
  bgImage: "/images/our-story/award-bg.jpg",
  bgImagemob: "/images/our-story/awardmob.jpg",
  descriptions:
    "<p>Imtiaz Developments has been honoured with the prestigious Mohammed bin Rashid Al Maktoum Medal for Philanthropy, awarded by His Highness Shaikh Mohammad Bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai. The accolade was presented at the Mohammed bin Rashid Al Maktoum Global Initiatives (MBRGI) Year in Review event on 18 March 2025 at the Dubai World Trade Centre.</p><p>This esteemed recognition celebrates the company's unwavering commitment to philanthropy, sustainability, and community development. A defining element of the award is Imtiaz Developments' substantial donation of Dh50 million to MBRGI's Father's Endowment campaign.</p>",
};

export const expertiseData = {
  title: "Our Expertise",
  description:
    "Meydan Horizon is one of Dubai’s most significant lifestyle destinations. It's a visionary 21.5 \n million sq. ft. masterplan that seamlessly unites urban \n vibrancy with nature’s calm. ",
};

export const otherPageSliderData = {
  learnMoreText: "Learn More",
  slides: [
    {
      title: "Sustainability",
      description:
        "To reach perfection, it takes a collaboration of extraordinary minds, skillsets and craft.",
      link: "/sustainability",
      bgImage: "/images/our-story/other-pages/sustain.jpg",
    },
    {
      title: "Innovation",
      description:
        "Pioneering new ways to build a future that is both beautiful and enduring for generations to come.",
      link: "/innovation",
      bgImage: "/images/our-story/banner.jpg",
    },
  ],
};

export const sectionTitle = "HISTORY";

export const sectionDescription =
  "Our journey began with a clear vision to deliver meaningful solutions through design and innovation, growing through challenges, craftsmanship, and lasting client relationships.";

export const historyData = [
  {
    year: 1993,
    cards: [
      {
        id: "1993-1",
        year: 1993,
        title: "Foundation Year",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "1993-2",
        year: 1993,
        title: "First Milestone",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "1993-3",
        year: 1993,
        title: "Early Growth",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "1993-4",
        year: 1993,
        title: "Strategic Vision",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
    ],
  },
  {
    year: 2019,
    cards: [
      {
        id: "2019-1",
        year: 2019,
        title: "New Horizons",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2019-2",
        year: 2019,
        title: "Expansion Phase",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2019-3",
        year: 2019,
        title: "Digital Transformation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2019-4",
        year: 2019,
        title: "Award Recognition",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
    ],
  },
  {
    year: 2020,
    cards: [
      {
        id: "2020-1",
        year: 2020,
        title: "Resilience & Adaptation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2020-2",
        year: 2020,
        title: "Innovation Under Pressure",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2020-3",
        year: 2020,
        title: "Remote Collaboration",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
    ],
  },
  {
    year: 2021,
    cards: [
      {
        id: "2021-1",
        year: 2021,
        title: "Content Heading",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2021-2",
        year: 2021,
        title: "Content Heading",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2021-3",
        year: 2021,
        title: "Major Project Launch",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2021-4",
        year: 2021,
        title: "Strategic Partnership",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2021-5",
        year: 2021,
        title: "Team Excellence",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
    ],
  },
  {
    year: 2022,
    cards: [
      {
        id: "2022-1",
        year: 2022,
        title: "Market Leadership",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2022-2",
        year: 2022,
        title: "Global Expansion",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2022-3",
        year: 2022,
        title: "Sustainability Drive",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2022-4",
        year: 2022,
        title: "Tech Integration",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
    ],
  },
  {
    year: 2023,
    cards: [
      {
        id: "2023-1",
        year: 2023,
        title: "Future Forward",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2023-2",
        year: 2023,
        title: "AI & Innovation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2023-3",
        year: 2023,
        title: "Landmark Projects",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2023-4",
        year: 2023,
        title: "Community Impact",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
    ],
  },
  {
    year: 2024,
    cards: [
      {
        id: "2024-1",
        year: 2024,
        title: "Future Forward",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2024-2",
        year: 2024,
        title: "AI & Innovation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2024-3",
        year: 2024,
        title: "Landmark Projects",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2024-4",
        year: 2024,
        title: "Community Impact",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
    ],
  },
  {
    year: 2025,
    cards: [
      {
        id: "2025-1",
        year: 2025,
        title: "Future Forward",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2025-2",
        year: 2025,
        title: "AI & Innovation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2025-3",
        year: 2025,
        title: "Landmark Projects",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2025-4",
        year: 2025,
        title: "Community Impact",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
    ],
  },
  {
    year: 2026,
    cards: [
      {
        id: "2026-1",
        year: 2026,
        title: "Future Forward",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/1.jpg",
      },
      {
        id: "2026-2",
        year: 2026,
        title: "AI & Innovation",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
      {
        id: "2026-3",
        year: 2026,
        title: "Landmark Projects",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/3.jpg",
      },
      {
        id: "2026-4",
        year: 2026,
        title: "Community Impact",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image:
          "/images/our-story/history/2.jpg",
      },
    ],
  },
];
