export interface PropertyDetailsResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: PropertyDetailsData;
}

export interface PropertyDetailsData {
  meta_title: string;
  meta_description: string | null;

  page_banner_title: string;
  page_banner_desktop: string;
  page_banner_mobile: string;
  page_banner_video_desktop: string;
  page_banner_video_mobile: string;

  brochure: string;
  fact_sheet: string;
  unit_layout: string;

  location: string;
  payment_plan: string;
  starting_price: string;
  delivery_date: string;

  basic_title: string;
  basic_brief: string;

  construction_title: string;
  construction_brief: string;
  construction_image: string;
  estimated_completion: string;

  percent_overall: number;

  percent1: number;
  percent1_label: string;

  percent2: number;
  percent2_label: string;

  percent3: number;
  percent3_label: string;

  percent4: number;
  percent4_label: string;

  construction_button_text: string;
  construction_button_url: string;

  reach_title: string;
  reach_caption: string;

  amenities_title: string;
  amenities_brief: string;

  map: string | null;

  faq_title: string;
  faq_caption: string;

  unit_layout_title: string;

  community_name: string;
  community_basic_title: string;
  community_basic_brief: string;
  community_slug:string;

  show_basic_section: "true" | "false";
  show_construction_section: "true" | "false";
  show_reach_section: "true" | "false";
  show_gallery_section: "true" | "false";
  show_amenities_section: "true" | "false";
  show_unitlayout_section: "true" | "false";
  show_communities_section: "true" | "false";
  show_faq_section: "true" | "false";
  show_similar_property_section: "true" | "false";
  show_community_overview_section: "true" | "false";

  reach: ReachItem[];
  gallery: GalleryItem[];
  amenities: AmenityItem[];
  unit_layouts: UnitLayoutItem[];

  property_latitude: string;
  property_longitude: string;

  similar_properties: SimilarProperty[] | null;

  faq: FAQItem[];

  hide_button_brochure: string,
  hide_button_factsheet: string,
  hide_button_unitlayout: string,
}

export interface ReachItem {
  title: string;
  caption: string;
  icon_url: string;
}

export interface GalleryItem {
  caption: string;
  image_url: string;
  type: string;
}

export interface AmenityItem {
  title: string;
  icon_url: string;
}

export interface UnitLayoutItem {
  title: string;
  units: string;
  total_area: string;
  brand_logo: string;
  image_url: string;
}

export interface SimilarProperty {
  slug: string;
  brand_logo: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;

  icon1_url: string;
  icon1_text: string;

  icon2_url: string;
  icon2_text: string;

  property_name: string;
  property_caption: string;
  property_status: string;
}

export interface FAQItem {
  title: string;
  caption: string;
}


export const bannerData = {
  image: "/images/projects/banner.jpg",
  title: "",
}
export const introData = {
  title: "Wynwood Horizon by Imtiaz",
  description:
    "Welcome to Wynwood Residence by Imtiaz, an architectural sanctuary rising on the prestigious shores of the Dubai Islands. Poised along the coastline, Wynwood is a sculpted reflection of serenity and sophistication, designed for those who seek stillness without compromise.",
};

export const communitySectionData = {
  title: "Meydan Horizon",
  subtitle: "Luxury Urban Living",
  description:
    "Meydan Horizon is one of Dubai’s most significant lifestyle destinations. It's a visionary 21.5 million sq. ft. masterplan that seamlessly unites urban",

};
export const EverythingWithinData = {
  title: "Everything Within Reach",
  description:
    "Experience island life, moments from the city’s most convenient connections and amenities.",
  cards: [
    {
      id: 1,
      icon: "/images/community-listing/icon1.svg",
      iconWidth: 32,
      iconHeight: 32,
      label: "DUBAI INTERNATIONAL<br>AIRPORT",
      minutes: "20 Minutes",
    },
    {
      id: 2,
      icon: "/images/community-listing/icon2.svg",
      iconWidth: 32,
      iconHeight: 32,
      label: "GOLD SOUQ METRO<br>STATION",
      minutes: "10 Minutes",
    },
    {
      id: 3,
      icon: "/images/community-listing/icon3.svg",
      iconWidth: 34,
      iconHeight: 32,
      label: "DOWNTOWN<br>DUBAI",
      minutes: "24 Minutes",
    },
    {
      id: 4,
      icon: "/images/community-listing/icon4.svg",
      iconWidth: 38,
      iconHeight: 32,
      label: "BUSINESS<br>BAY",
      minutes: "13 Minutes",
    },
  ],
};

export const eventDetails = [
  {
    signatureImages: [
      "/images/events/signature/1.jpg",
      "/images/events/event-detail.jpg",
      "/images/events/5.jpg",
    ],
  },
];

export const amenitiesData = {
  title: "Amenities",
  description:
    "Enjoy a lifestyle of comfort and convenience with premium amenities including a modern gym, swimming pool, landscaped gardens, and secure community spaces — all designed to enhance your everyday living.",

  amenities: [
    // Row 1
    { label: "EV CHARGING", icon: "/images/projects/icon1.svg" },
    { label: "COURTYARD", icon: "/images/projects/icon2.svg" },
    { label: "CLUBHOUSE", icon: "/images/projects/icon3.svg" },
    { label: "ADULT POOL", icon: "/images/projects/icon4.svg" },
    // Row 2
    { label: "KIDS' POOL", icon: "/images/projects/icon5.svg" },
    { label: "BBQ AREA", icon: "/images/projects/icon6.svg" },
    { label: "YOGA RETREAT", icon: "/images/projects/icon7.svg" },
    { label: "ADULT POOL", icon: "/images/projects/icon8.svg" },
    // Row 3
    { label: "GYM", icon: "/images/projects/icon9.svg" },
    { label: "OUTDOOR CINEMA", icon: "/images/projects/icon10.svg" },
  ]

};
export const LandpropertyData = {
  title: "Similar properties",
  cards: [
    {
      id: "1",
      image: "/images/community-listing/card1.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completedss",
      location: "Down Town Dubai, UAE",
      title: "COVE BY IMTIAZ",
      subtitle: "Spacious Community Living",
      href: "/projects/cove-by-imtiaz",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card2.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Ongoing",
      location: "Dubai Marina, UAE",
      title: "AZURE RESIDENCES",
      subtitle: "Waterfront Luxury Living",
      href: "/projects/azure-residences",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card3.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "Business Bay, UAE",
      title: "Cove Edition I  by Imtiaz",
      subtitle: "Urban Living Redefined",
      href: "/projects/skyline-tower",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card4.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Palm Jumeirah, UAE",
      title: "Cove Edition 2 by Imtiaz",
      subtitle: "Exclusive Island Retreat",
      href: "/projects/palm-villas",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card5.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Completed",
      location: "Palm Jumeirah, UAE",
      title: "Cove Edition III by Imtiaz",
      subtitle: "Exclusive Island Retreat",
      href: "/projects/palm-villas",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card6.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Edition 4 by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card7.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Boulevard by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card8.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Cove Edition 5 by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
    {
      id: "1",
      image: "/images/community-listing/card9.jpg",
      hoverImage: "/images/community-listing/hoverimg.png",
      status: "Upcoming",
      location: "DIFC, UAE",
      title: "Le Blanc by Imtiaz",
      subtitle: "Premium City Residences",
      href: "/projects/district-one",
      startingFrom: "AED 3.5 M",
      units: "1BR - 3BR",
    },
  ],

};

export const faqData = {
  title: "FAQ",
  subtitle:
    "Lorem Ipsum is simply dummy text of the printing and\ntypesetting industry. Lorem Ipsum has",
  items: [
    {
      id: "faq-1",
      question: "What defines your luxury properties?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-2",
      question: "What makes your brand unique?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-3",
      question: "Who are your properties designed for?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-4",
      question: "How do you ensure quality and longevity?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: "faq-5",
      question: "Is sustainability part of your vision?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
  ],
};