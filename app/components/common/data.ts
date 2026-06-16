// footerData
export const footerData = {
  trendingSearches: [
    { name: "Properties for sale in Dubai", link: "#" },
    { name: "Apartments for sale in Dubai", link: "#" },
    { name: "Off plan apartments in Dubai", link: "#" },
    { name: "Penthouses for sale in Dubai", link: "#" },
    { name: "High ROI properties in Dubai", link: "#" },
    { name: "Investment properties in Dubai", link: "#" },
    { name: "Waterfront apartments in Dubai", link: "#" },
    { name: "Properties for sale in Dubai Island", link: "#" },
    { name: "Ready to move apartments in Dubai", link: "#" },
    { name: "Furnished apartments for sale in Dubai", link: "#" },
    { name: "1-bedroom apartments for sale in Dubai", link: "#" },
    { name: "2-bedroom apartments for sale in Dubai", link: "#" },
    { name: "3-bedroom apartments for sale in Dubai", link: "#" },
  ],

  aboutImtiaz: [
    { name: "About US", link: "#" },
    { name: "Leadership Team", link: "#" },
    { name: "Vison & Mission", link: "#" },
    { name: "Press Releases", link: "#" },
    { name: "Careers", link: "#" },
    { name: "Contact Us", link: "#" },
  ],

  popularAreas: [
    { name: "Apartments for sale in Meydan", link: "#" },
    { name: "Apartments for sale in Dubai Island", link: "#" },
    { name: "Apartments for sale in Dubai Land", link: "#" },
    { name: "Apartments for sale in JVC", link: "#" },
  ],

  helpSupport: [
    { name: "FAQ", link: "#" },
    { name: "Terms & Conditions", link: "#" },
    { name: "Privacy Policy", link: "#" },
    { name: "Cookie Policy", link: "#" },
  ],

  mediaCenter: [
    { name: "News & Press Releases", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Events", link: "#" },
  ],

  socialMedia: [
    {
      name: "Facebook",
      icon: "/icons/facebook.svg",
      link: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: "/icons/instagram.svg",
      link: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.svg",
      link: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: "/icons/youtube.svg",
      link: "https://youtube.com",
    },
  ],
  appLinks: {
    appStore: "https://apps.apple.com",
    playStore: "https://play.google.com",
  },
};

type FooterV2Column = {
  heading: string;
  items: { label: string; link: string }[];
};

type FooterV2Data = {
  top: {
    bgImage: string;
    logo: string;
    placeholderEmail: string;
    sendText: string;
  };
  columns: FooterV2Column[];
  bottom: {
    left: { label: string; href: string }[];
    center: string;
    icons: string[];
  };
};

// data.ts
export const footerV2Data: FooterV2Data = {
  top: {
    bgImage: "/images/footer_bg.jpg",
    logo: "/images/footer_logo.svg",
    placeholderEmail: "Enter your email address",
    sendText: "Send",
  },

  columns: [
    {
      heading: "COMMUNITIES",
      items: [
        { label: "Dubai Islands", link: "/communities/dubai-islands" },
        {
          label: "Meydan Horizon Community",
          link: "/communities/meydan-horizon",
        },
        { label: "JVC Community", link: "/communities/jvc" },
        { label: "Al Furjan Community", link: "/communities/al-furjan" },
        {
          label: "Jumeirah Garden City",
          link: "/communities/jumeirah-garden-city",
        },
        {
          label: "Dubai Land Residence Complex",
          link: "/communities/dubai-land-residence-complex",
        },
      ],
    },
    {
      heading: "Latest Projects",
      items: [
        { label: "Cove Edition 6", link: "/properties/cove-edition-6" },
        { label: "Wynwood", link: "/properties/wynwood" },
        { label: "Cove Edition 5", link: "/properties/cove-edition-5" },
        { label: "Cove Grand", link: "/properties/cove-grand" },
        { label: "Sunset Bay 4", link: "/properties/sunset-bay-4" },
        { label: "Beach Walk 4", link: "/properties/beach-walk-4" },
      ],
    },
    // {
    //   heading: "COMING SOON",
    //   items: [
    //     { label: "Le Blanc", link: "/properties/le-blanc" },
    //     { label: "Sunset Bay Grand", link: "/properties/sunset-bay-grand" },
    //     { label: "Wynwood Horizon", link: "/properties/wynwood-horizon" },
    //     { label: "Sunset Bay 5", link: "/properties/sunset-bay-5" },
    //     { label: "Pearl House 4", link: "/properties/pearl-house-4" },
    //     { label: "Beach Walk Grand 2", link: "/properties/beach-walk-grand-2" },
    //   ],
    // },
    {
      heading: "ABOUT IMTIAZ",
      items: [
        { label: "About", link: "/about/our-story" },
        { label: "Careers", link: "/about/careers" },
        { label: "Contact", link: "/contact-us" },
        { label: "Construction", link: "/about/construction" },
        { label: "3D View", link: "/3d-tour" },
      ],
    },
    {
      heading: "MEDIA CENTER",
      items: [
        { label: "News & Press Releases", link: "/media-center/news" },
        { label: "Blogs", link: "/media-center/blog" },
        { label: "Events", link: "/media-center/events" },
        { label: "Initiatives", link: "/media-center/initiatives" },
      ],
    },
    {
      heading: "TRENDING SEARCHES",
      items: [{ label: "Off Plan Properties", link: "/off-plan-properties" }],
    },
  ],

  bottom: {
    left: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
      {
        label: "Cookie Policy",
        href: "/cookie-policy",
      },
    ],
    center: "©2025 Imtiaz Development. All Rights Reserved",
    icons: [
      "/icons/footer/instagram.svg",
      "/icons/footer/fb.svg",
      "/icons/footer/linkedin.svg",
      "/icons/footer/yt.svg",
    ],
  },
};

// data.ts

export interface MenuItem {
  id: string;
  label: string;
  bgImage: string;
  href?: string;
}

export interface SubMenuItem {
  id: string;
  label: string;
  href?: string;
}

export const menuItems: MenuItem[] = [
  { id: "about", label: "ABOUT", bgImage: "/images/navpage/about_bg.jpg" },
  // {
  //   id: "communities",
  //   label: "COMMUNITIES",
  //   bgImage: "/images/navpage/2.jpg",
  // },
  {
    id: "properties",
    label: "PROPERTIES",
    bgImage: "/images/navpage/3.jpg",
  },
  {
    id: "media",
    label: "MEDIA CENTER",
    bgImage: "/images/home/imtiaz-properties/3.png",
  },
  // {
  //   id: "partnership",
  //   label: "PARTNERSHIP",
  //   bgImage: "/images/home/imtiaz-properties/4.png",
  // },
  {
    id: "partnership",
    label: "PARTNERSHIP",
    bgImage: "/images/home/imtiaz-properties/5.png",
  },
  {
    id: "paynow",
    label: "PAY NOW",
    bgImage: "/images/home/imtiaz-properties/1.png",
  },
];

// Submenus mapped to parent menu ID
export const subMenuItems = {
  about: [
    { id: "our-story", label: "OUR STORY", href: "/about/our-story" },
    {
      id: "sustainability",
      label: "SUSTAINABILITY",
      href: "/about/sustainability",
    },
    // { id: "expertise", label: "EXPERTISE", href: "/about/expertise" },
    {
      id: "investor",
      label: "INVESTOR RELATIONS",
      href: "/media-center/investor-relations",
    },
    { id: "construction", label: "CONSTRUCTION", href: "/about/construction" },
  ],

  communities: [
    { id: "Al-furjan", label: "Al Furjan", href: "#" },
    {
      id: "dubai-islands",
      label: "Dubai Islands",
      href: "/communities/dubai-islands",
    },
    {
      id: "dubai-land-residence-complex",
      label: "Dubai Land Residence Complex",
      href: "#",
    },
    { id: "jumeirah-garden-city", label: "Jumeirah Garden City", href: "#" },
    { id: "jvc", label: "JVC", href: "#" },
    {
      id: "allcommunities",
      label: "View All Communities",
      isButton: true,
      href: "/communities",
    },
  ],

  properties: [
    // {
    //   id: "Alfurjan",
    //   label: "Al Furjan",
    //   children: [{ id: "res-1", label: "Westwood", href: "#" }],
    // },
    {
      id: "dubaiislands",
      label: "Dubai Islands",
      children: [
        { id: "Dubai-1", label: "Beach Walk Residence", href: "#" },
        { id: "Dubai-2", label: "Beach Walk Residence II", href: "#" },
        { id: "Dubai-3", label: "Beach Walk II", href: "#" },
      ],
    },
    {
      id: "dubai-complex",
      label: "Dubai Land Residence Complex",
      children: [
        { id: "lux-1", label: "Cove Edition I", href: "#" },
        { id: "lux-2", label: "Cove by Imtiaz", href: "#" },
        { id: "lux-3", label: "Beach Walk III", href: "#" },
      ],
    },
    {
      id: "al-furjan",
      label: "Al Furjan",
      children: [
        { id: "lux-1", label: "Cove Edition I", href: "#" },
        { id: "lux-2", label: "Cove by Imtiaz", href: "#" },
        { id: "lux-3", label: "Beach Walk III", href: "#" },
      ],
    },
    {
      id: "jumeirahcity",
      label: "Jumeirah Garden City",
      children: [{ id: "jumeirahcity-1", label: "Hyde Walk", href: "#" }],
    },
    {
      id: "JVC",
      label: "JVC",
      children: [
        { id: "jvc-1", label: "Pearl House", href: "#" },
        { id: "jvc-2", label: "Pearl House II", href: "#" },
        { id: "jvc-13", label: "Pearl House III", href: "#" },
        { id: "jvc-3", label: "Westwood Grande", href: "#" },
        { id: "jvc-4", label: "Westwood Grande II", href: "#" },
        { id: "jvc-5", label: "Luxor", href: "#" },
      ],
    },
    {
      id: "meydan-horizon",
      label: "Meydan Horizon",
      children: [{ id: "jumeirahcity-1", label: "Hyde Walk", href: "#" }],
    },
    {
      id: "dubai-south",
      label: "Dubai South",
      children: [{ id: "jumeirahcity-1", label: "Hyde Walk", href: "#" }],
    },
    {
      id: "all-communities",
      label: "ALL COMMUNITIES",
      isButton: true,
      href: "/communities",
    },
    {
      id: "all-properties",
      label: "ALL PROPERTIES",
      isButton: true,
      href: "/properties",
    },
    // { id: "3d-view", label: "3D View", href: "/3d-tour", isButton: true },
  ],

  media: [
    { id: "news", label: "NEWS & PRESS", href: "/media-center/news" },
    { id: "events", label: "EVENTS", href: "/media-center/events" },
    { id: "blogs", label: "BLOGS", href: "/media-center/blog" },
    {
      id: "initiatives",
      label: "INITIATIVES",
      href: "/media-center/initiatives",
    },
  ],

  partnership: [
    {
      id: "Agency",
      label: "AGENCY",
      // href: "/onboarding?tab=agency",
      href: "https://imtiaz.my.salesforce-sites.com/AgentOnboarding",
      newTab: true,
    },
    {
      id: "individual",
      label: "INDIVIDUAL",
      // href: "/onboarding?tab=individual",
      href: "https://imtiaz.my.salesforce-sites.com/AgentOnboarding",
      newTab: true,
    },
  ],

  paynow: [{ id: "online", label: "PAY ONLINE", href: "/pay-now" }],
};
// export const subMenuItems: Record<string, SubMenuItem[]> = {
//   about: [
//     { id: "our-story", label: "OUR STORY", href: "/about/our-story" },
//     { id: "sustainability", label: "SUSTAINABILITY", href: "/about/sustainability" },
//     { id: "expertise", label: "EXPERTISE", href: "/about/expertise" },
//     { id: "investor", label: "INVESTOR RELATIONS", href: "/media-center/investor-relations" },
//     // { id: "careers", label: "CAREERS", href: "/about/careers" },
//   ],
//   communities: [
//     { id: "Al-furjan", label: "Al Furjan", href: "/communities/al-furjan" },
//     { id: "dubai-islands", label: "Dubai Islands", href: "/communities/dubai-islands" },
//     { id: "dubai-land-residence-complex", label: "Dubai Land Residence Complex", href: "/communities/dubai-land-residence-complex" },
//     { id: "jumeirah-garden-city", label: "Jumeirah Garden City", href: "/communities/jumeirah-garden-city" },
//     { id: "jvc", label: "JVC", href: "/communities/jvc" },
//     { id: "allcommunities", label: "View All Communities", href: "/communities/allcommunities" },

//   ],
//   properties: [
//     { id: "all", label: "ALL PROPERTIES", href: "/properties" },
//   ],
//   media: [
//     { id: "news", label: "NEWS & PRESS", href: "/media-center/news" },
//     { id: "events", label: "EVENTS", href: "/media-center/events" },
//     { id: "blogs", label: "BLOGS", href: "/media-center/blog" },
//   ],
//   partnership: [
//     { id: "corp", label: "CORPORATE PARTNERSHIP" },
//     { id: "invest", label: "INVEST WITH US" },
//   ],
//   channel: [
//     { id: "agent", label: "AGENT PORTAL" },
//     { id: "register", label: "REGISTER AS PARTNER" },
//   ],
//   paynow: [
//     { id: "online", label: "PAY ONLINE", href: "/pay-now" },
//     { id: "payment-methods", label: "Payment Methods", href: "/pay-now" },
//   ],
// };

// Right side contact section
export const contactInfo = {
  emailSales: "sales@imtiaz.ae",
  emailInfo: "Info@imtiaz.ae",
  phone: "+971 800 468429",
};

// Social icons (replace with your icons)
export const socialLinks = [
  "/icons/footer/instagram.svg",
  "/icons/footer/fb.svg",
  "/icons/footer/linkedin.svg",
  "/icons/footer/yt.svg",
];
