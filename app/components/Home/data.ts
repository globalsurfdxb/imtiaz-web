export type NewLaunchItem = {
  slug: string;
  title: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  property_status: string;
  banner_video_dektop: string;
  banner_video_mobile:string;
  amenities: {
    icon_url: string;
    title: string;
  }[]
};

export type CommunityItem = {
  slug: string;
  title: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string | null;
  icon1_url: string;
  icon1_text: string;
  icon2_url: string;
  icon2_text: string;
  icon3_url: string;
  icon3_text: string;
};

export type PropertyItem = {
  slug: string;
  brand_logo: string;
  title: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  icon1_url: string;
  icon1_text: string;
  icon2_url: string;
  icon2_text: string;
  property_caption: string;
  property_type: string;
  property_community: string;
  property_status: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  description: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  post_date: string;
  category_name: string;
};

export type HomePageResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string;
    page_banner_video: string;
    page_banner_video_mobile: string;
    page_hero_poster_dektop: string;
    page_hero_poster_mobile: string;
    page_section1_video: string;
    page_section3_video: string;
    page_section3_video_mobile: string;
    page_section3_subtitle: string;
    page_section3_caption: string;
    page_section4_video: string;
    page_section7_video: string;
    page_banner_title: string;
    page_section1_title: string;
    page_section2_title: string;
    page_section3_title: string;
    page_section3_buttontext: string;
    page_section3_buttonurl: string;
    page_section4_title: string;
    page_section4_caption: string;
    page_section4_buttontext: string;
    page_section4_buttonurl: string;
    page_section5_title: string;
    page_section6_title: string;
    page_section7_title: string;
    page_section7_caption: string;
    page_section7_buttontext: string;
    page_section7_buttonurl: string;
    page_section8_title: string;
    page_section9_title: string;
    page_section9_caption: string;
    apple_store_link: string;
    android_store_link: string;
    page_section1_poster: string;
    page_section7_poster: string;
    page_show_section1: string,
    page_show_section2: string,
    page_show_section3: string,
    page_show_section4: string,
    page_show_section5: string,
    page_show_section6: string,
    page_show_section7: string,
    page_show_section8: string,
    page_show_section9: string,
    page_section1_video_mobile:string;
    page_section1_poster_mobile:string;

    new_launches: NewLaunchItem[];

    communities: CommunityItem[];

    properties: PropertyItem[];

    news: NewsItem[];
  };
};


export interface Property {
  id: number;
  image: string;
  name: string;
  location: string;
  logo: string;
  features: { icon: string; label: string }[];
}

export const featuredProperties: Property[] = [
  {
    id: 1,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
  {
    id: 2,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
  {
    id: 3,
    image: "/images/home/feat-property/item1.jpg",
    name: "BEACH WALK III",
    location: "Dubai Islands",
    logo: "/images/home/feat-property/logo1.svg",
    features: [
      {
        icon: "/images/home/feat-property/icons/1.svg",
        label: "Fully Furnished",
      },
      {
        icon: "/images/home/feat-property/icons/2.svg",
        label: "20 Min from Sheikh Zyd Rd",
      },
      {
        icon: "/images/home/feat-property/icons/3.svg",
        label: "Direct Access to Park",
      },
    ],
  },
];

// secong section
export const coastalSlides = [
  {
    title: "Most sough-out community",
    image: "/images/home/vertical-slider/1.jpg",
    thumb: "/images/home/vertical-slider/1.jpg",
  },
  {
    title: "Island Life",
    image: "/images/home/vertical-slider/2.jpg",
    thumb: "/images/home/vertical-slider/2.jpg",
  },
  {
    title: "Marina-side bliss",
    image: "/images/home/vertical-slider/3.jpg",
    thumb: "/images/home/vertical-slider/3.jpg",
  },
  {
    title: "Hub for High-end shoping",
    image: "/images/home/vertical-slider/4.jpg",
    thumb: "/images/home/vertical-slider/4.jpg",
  },
];

// Sample data - replace with your actual data
export const pressSpotlights = [
  {
    id: 1,
    image: "/images/home/spotlight/1.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 2,
    image: "/images/home/spotlight/2.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 3,
    image: "/images/home/spotlight/3.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 4,
    image: "/images/home/spotlight/4.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 5,
    image: "/images/home/spotlight/1.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
  {
    id: 6,
    image: "/images/home/spotlight/2.jpg",
    category: "News category",
    title: "WHAT MAKES AN IMTIAZ HOME EXTRAORDINARY?",
  },
];

export const properties = [
  {
    id: 1,
    number: "01",
    name: "BEACH WALK GRAND 2 by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/1.png",
    thumbnail: "/images/home/imtiaz-properties/1.png",
  },
  {
    id: 2,
    number: "02",
    name: "WYNWOOD HORIZON by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/2.png",
    thumbnail: "/images/home/imtiaz-properties/2.png",
  },
  {
    id: 3,
    number: "03",
    name: "SUNSET BAY 4 by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/3.png",
    thumbnail: "/images/home/imtiaz-properties/3.png",
  },
  {
    id: 4,
    number: "04",
    name: "COVE BOULEVARD by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/4.png",
    thumbnail: "/images/home/imtiaz-properties/4.png",
  },
  {
    id: 5,
    number: "05",
    name: "BEACH WALK GRAND 2 by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/5.png",
    thumbnail: "/images/home/imtiaz-properties/5.png",
  },
  {
    id: 6,
    number: "06",
    name: "SUNSET BAY 3 by Imtiaz",
    location: "Dubai Islands",
    image: "/images/home/imtiaz-properties/1.png",
    thumbnail: "/images/home/imtiaz-properties/1.png",
  },
];

export const aboutSectionJourney = {
  tag: "ABOUT",
  title: "A JOURNEY TO PERFECTION",
  subtitle: "CREATING DESTINATIONS OF DISTINCTION",
  description:
    "We transform visions into living, breathing destinations. At Imtiaz Developments, our legacy is built on excellence, innovation, and uncompromising quality — delivering iconic properties that inspire and endure.",
  button: {
    label: "About Imtiaz",
    link: "#",
  },
};

export const heroSlides = [
  {
    title: "SEA CLIFF BY IMTIAZ",
    video: "/videos/seaClif-web.mp4",
    pillFeatures: {
      title: "/icons/pro_slider/sunset_bay.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "Dynamic Waterfront Living" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "Resort-inspired Amenities" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "Fully Furnished Residences",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "Strategically Located",
        },
      ],
    },
  },
  // {
  //   title: "SUNSET BAY 2 by Imtiaz",
  //   video: "/videos/seaClif-web.mp4",
  //   pillFeatures: {
  //     title: "/icons/pro_slider/sunset_bay.svg",
  //     features: [
  //       { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
  //       { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/3.svg",
  //         label: "FULLY EQUIPPED GYM",
  //       },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/4.svg",
  //         label: "SAUNA & STEAM",
  //       },
  //     ],
  //   },
  // },
];

export const heroSlidesComingSoon = [
  {
    title: "Cotier House 2 by Imtiaz",
    desktopVideo: "/videos/hero_new_desk.mp4",
    mobileVideo: "/videos/hero_new_mob.mp4",
    pillFeatures: {
      title: "/icons/pro_slider/cotier.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },
  // {
  //   title: "Cotier House 2 by Imtiaz",
  //   video: "/videos/slidervdo-2.mp4",
  //   pillFeatures: {
  //     title: "/icons/pro_slider/cotier.svg",
  //     features: [
  //       { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
  //       { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/3.svg",
  //         label: "FULLY EQUIPPED GYM",
  //       },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/4.svg",
  //         label: "SAUNA & STEAM",
  //       },
  //     ],
  //   },
  // },
];


export const promotion = [
  {
    title: "Cotier House 2 by Imtiaz",
    video: "/videos/promotion.mp4",
    pillFeatures: {
      title: "/icons/pro_slider/cotier.svg",
      features: [
        { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
        { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
        {
          icon: "/icons/pro_slider/sunset_icons/3.svg",
          label: "FULLY EQUIPPED GYM",
        },
        {
          icon: "/icons/pro_slider/sunset_icons/4.svg",
          label: "SAUNA & STEAM",
        },
      ],
    },
  },
  // {
  //   title: "Cotier House 2 by Imtiaz",
  //   video: "/videos/slidervdo-2.mp4",
  //   pillFeatures: {
  //     title: "/icons/pro_slider/cotier.svg",
  //     features: [
  //       { icon: "/icons/pro_slider/sunset_icons/1.svg", label: "KIDS' ZONE" },
  //       { icon: "/icons/pro_slider/sunset_icons/2.svg", label: "club house" },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/3.svg",
  //         label: "FULLY EQUIPPED GYM",
  //       },
  //       {
  //         icon: "/icons/pro_slider/sunset_icons/4.svg",
  //         label: "SAUNA & STEAM",
  //       },
  //     ],
  //   },
  // },
];

export const DubaiIslandData = {
  tag: "Dubai Islands",
  title: "A Coastal Paradise",
  subtitle: "A Rising Haven of Leisure & Luxury",
  description:
    "Dubai Islands features 20 km of coastline to explore, offering a unique metropolitan lifestyle surrounded by nature. The fast-growing location is set to become the premier entertainment, dining and leisure destination.",
};

export const ConstructionProgressData = {
  title: "CONSTRUCTION PROGRESS",
  videoSrc: "/videos/Construction_Update.mp4",
  posterSrc: "/images/home/work-progress/progress.jpg",
  description:
    "Watch our projects transform from concept to reality. Stay informed at every stage as we provide a clear view of project milestones, progress on site, and delivery timelines.",
  button: {
    label: "Construction Updates",
    link: "#",
  },
};

export const imtiazPropertiesData = {
  sectionTitle: "IMTIAZ PROPERTIES",

  properties: [
    {
      id: 1,
      title: "LE BLANC by Imtiaz",
      image: "/images/home/imtiaz-properties/p1.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p3_logo.webp",
    },
    {
      id: 2,
      title: "SUNSET BAY GRAND by Imtiaz",
      image: "/images/home/imtiaz-properties/p2.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 3,
      title: "WYNWOOD HORIZON by Imtiaz",
      image: "/images/home/imtiaz-properties/p3.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p2_logo.png",
    },
    {
      id: 4,
      title: "LE BLANC by Imtiaz",
      image: "/images/home/imtiaz-properties/p1.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p3_logo.webp",
    },
    {
      id: 5,
      title: "SUNSET BAY GRAND by Imtiaz",
      image: "/images/home/imtiaz-properties/p2.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p1_logo.svg",
    },
    {
      id: 6,
      title: "WYNWOOD HORIZON by Imtiaz",
      image: "/images/home/imtiaz-properties/p3.jpg",
      link: "#",
      location: "Dubai Islands",
      logo: "/images/home/imtiaz-properties/p2_logo.png",
    },
  ],
};

export const pressSpotlightData = {
  sectionTitle: "Press Spotlight",
  items: [
    {
      id: 1,
      date: "15-10-2025",
      title: "THE IMTIAZ GROWTH STORY: REDEFINING LUXURY, ELEVATING DUBAI",
      image: "/images/home/PressSpotlight/ps1.jpg",
      link: "#",
    },
    {
      id: 2,
      date: "02-12-2025",
      title:
        "IMTIAZ and Zaha Hadid Architects Set the Stage for Dubai’s Next Ultra-Luxury Landmark",
      image: "/images/home/PressSpotlight/1.jpg",
      link: "#",
    },
    {
      id: 3,
      date: "01-01-2026",
      title:
        "Imtiaz Developments hands over Pearl House II in JVC three months early, reinforcing record delivery pace across Dubai",
      image: "/images/home/PressSpotlight/2a.jpg",
      link: "#",
    },
  ],
};

export const appSectionData = {
  heading: "YOUR ALL-IN-ONE APP FOR EVERY PROPERTY NEED",
  subtitle:
    "The Imtiaz App empowers homeowners and tenants to manage their property anytime, anywhere—from their phone.",
  mobileImage: "/images/home/app/mobile.png",

  leftCircles: [
    { title: "CONSTRUCTION UPDATES", icon: "/images/home/app/icons/1.svg" },
    { title: "OWNERSHIP UPDATES", icon: "/images/home/app/icons/2.svg" },
    { title: "ACCESS CARD REQUESTS", icon: "/images/home/app/icons/3.svg" },
  ],

  rightCircles: [
    {
      title: "PROPERTY-RELATED TRANSFERS",
      icon: "/images/home/app/icons/6.svg",
    },
    { title: "MOVE IN/OUT REQUESTS", icon: "/images/home/app/icons/5.svg" },
    { title: "ECM & Home services", icon: "/images/home/app/icons/4.svg" },
  ],

  download: {
    text: "DOWNLOAD IMTIAZ APP",
    googlePlay: "/images/home/app/playstoreV2.svg",
    appStore: "/images/home/app/appleV2.svg",
  },
};

export const communityYardData = [
  {
    id: "s1",
    title: "A COASTAL PARADISE",
    subtitle:
      "Dubai Islands offers 20 km of coastline and a unique metropolitan lifestyle surrounded by nature—set to become the region's top entertainment, dining, and leisure hub.",
    features: [
      {
        id: "f1",
        title: "ISLAND LIFE",
        bgImage: "/images/home/community/ÔüáIsland_Life.jpg",
        link: "#",
      },
      {
        id: "f2",
        title: "MOST SOUGHT-OUT COMMUNITY",
        bgImage: "/images/home/community/ÔüáMost_Sought-After-Community.jpg",
        link: "#",
      },
      {
        id: "f3",
        title: "MARINA-SIDE BLISS",
        bgImage: "/images/home/community/ÔüáMarina-Side Bliss.jpg",
        link: "#",
      },
      {
        id: "f4",
        title: "HUB FOR HIGH-END SHOPPING",
        bgImage: "/images/home/community/Hub_for_High-End_Shopping.jpg",
        link: "#",
      },
    ],
  },
];

export const communityNamesData = {
  heading: "IMTIAZ COMMUNITIES",
  communities: [
    {
      id: "f1",
      name: "JVC",
      bgImage: "/images/community/jvc.jpg",
      link: "#",
    },
    {
      id: "f2",
      name: "Al Furjan",
      bgImage: "/images/community/furjan.jpg",
      link: "#",
    },
    {
      id: "f3",
      name: "Jumeirah Garden City",
      bgImage: "/images/community/jumeirahgardencity.jpg",
      link: "#",
    },
    {
      id: "f4",
      name: "Dubai Land Residence Complex",
      bgImage: "/images/community/dubailand.jpg",
      link: "#",
    },
    {
      id: "f5",
      name: "Dubai Islands",
      bgImage: "/images/community/dubai-islands.jpg",
      link: "#",
    },
    {
      id: "f6",
      name: "Meydan Horizon",
      bgImage: "/images/community/meydanhorizan.jpg",
      link: "#",
    },
    {
      id: "f6",
      name: "Dubai South",
      bgImage: "/images/community/dubai-south.jpg",
      link: "#",
    },
  ],
};
export const projectsData = [
  {
    id: "1",
    image: "/images/home/feat-property/property1.jpg",
    hoverImage: "/images/community-listing/hoverimg.png",
    location: "Dubai Islands",
    title: "COVE by Imtiaz",
    subtitle: "Spacious Community Living",
    href: "/projects/cove-by-imtiaz",
    startingFrom: "AED 3.5 M",
    units: "1BR - 3BR",
  },
  {
    id: "2",
    image: "/images/home/feat-property/property2.jpg",
    hoverImage: "/images/community-listing/hoverimg.png",
    status: "",
    location: "Dubai Islands",
    title: "COVE by Imtiaz",
    subtitle: "Spacious Community Living",
    href: "/projects/azure-residences",
    startingFrom: "AED 3.5 M",
    units: "1BR - 3BR",
  },
  {
    id: "3",
    image: "/images/home/feat-property/property3.jpg",
    hoverImage: "/images/community-listing/hoverimg.png",
    location: "Dubai Islands",
    title: "Cove Edition I by Imtiaz",
    subtitle: "Spacious Community Living",
    href: "/projects/skyline-tower",
    startingFrom: "AED 3.5 M",
    units: "1BR - 3BR",
  },
  {
    id: "4",
    image: "/images/home/feat-property/property4.jpg",
    hoverImage: "/images/community-listing/hoverimg.png",
    location: "Dubai Islands",
    title: "Cove Edition 2 by Imtiaz",
    subtitle: "Spacious Community Living",
    href: "/projects/palm-villas",
    startingFrom: "AED 3.5 M",
    units: "1BR - 3BR",
  },
  {
    id: "5",
    image: "/images/home/feat-property/property2.jpg",
    hoverImage: "/images/community-listing/hoverimg.png",
    status: "",
    location: "Dubai Islands",
    title: "COVE by Imtiaz",
    subtitle: "Spacious Community Living",
    href: "/projects/azure-residences",
    startingFrom: "AED 3.5 M",
    units: "1BR - 3BR",
  },
];

export const spotlight = {
  title: "Press Spotlight",
  viewAllHref: "/sustainability",
  slides: [
    {
      id: "spotlight-1",
      date: "15-10-2025",
      title: "THE IMTIAZ GROWTH STORY: REDEFINING LUXURY, ELEVATING DUBAI",
      href: "/sustainability/green-initiative",
      image: "/images/home/PressSpotlight/ps1.jpg",
      alt: "THE IMTIAZ GROWTH STORY",
    },
    {
      id: "spotlight-2",
      date: "02-12-2025",
      title: "IMTIAZ and Zaha Hadid Architects Set the Stage for Dubai’s Next Ultra-Luxury Landmark",
      href: "/sustainability/net-zero",
      image: "/images/home/PressSpotlight/1.jpg",
      alt: "IMTIAZ and Zaha",
    },
    {
      id: "spotlight-3",
      date: "05-01-2026",
      title: "Imtiaz Developments hands over Pearl House II in JVC three months early, reinforcing record delivery pace across Dubai",
      href: "/sustainability/tree-planting",
      image: "/images/home/PressSpotlight/2a.jpg",
      alt: "Imtiaz Developments",
    },
  ],
};

