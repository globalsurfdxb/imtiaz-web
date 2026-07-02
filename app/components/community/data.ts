export const bannerData = {
    image: "/images/community/banner.jpg",
    title: "Communities",
    description: "Across Dubai, the UAE, and beyond, our properties define unique experiences within the extraordinary communities they are part of."
}

export interface CommunityTag {
  label: string;
  icon: string;
}

export interface CommunityCard {
  id: number;
  title: string;
  image: string;
  tags: CommunityTag[];
  href: string;
  icon1_url:string;
  icon2_url:string;
  icon3_url:string;
  icon1_text:string;
  icon2_text:string;
  icon3_text:string;
  featured_image_desktop:string;
  featured_image_mobile:string;
  featured_image_alt:string;
  slug:string;
}

export const communitySectionData = {
  title: "LIVING SPACES THAT SHAPE EXPERIENCES",
  description:
    "Each community we create is thoughtfully shaped to reflect its surroundings, culture, and lifestyle. From Dubai to the wider UAE and beyond, our developments foster connection, comfort.",
  cards: [
    {
      id: 1,
      title: "DUBAI ISLANDS",
      image: "/images/community/dubai-islands.jpg",
      tags: [
        { label: "Sought After" ,icon: "/images/community/icons/1.svg" },
        { label: "Souk Al Marsa" ,icon: "/images/community/icons/2.svg" },
        { label: "10 Mins to Sheikh Zayed Rd" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 2,
      title: "DUBAI LAND RESIDENCE COMPLEX",
      image: "/images/community/dubailand.jpg",
      tags: [
        { label: "Green Parks" ,icon: "/images/community/icons/7.svg" },
        { label: "Cycling Track" ,icon: "/images/community/icons/5.svg" },
        { label: "10 Mins to D26" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 3,
      title: "AL FURJAN",
      image: "/images/community/furjan.jpg",
      tags: [
        { label: "Green Parks" ,icon: "/images/community/icons/4.svg" },
        { label: "Cycling Track" ,icon: "/images/community/icons/5.svg" },
        { label: "10 Mins to D26" ,icon: "/images/community/icons/6.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 4,
      title: "JUMEIRAH GARDEN CITY",
      image: "/images/community/jumeirahgardencity.jpg",
      tags: [
        { label: "Built Sustainably" ,icon: "/images/community/icons/7.svg" },
        { label: "Near Oud bin Khar" ,icon: "/images/community/icons/8.svg" },
        { label: "Well Connected" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 5,
      title: "JVC",
      image: "/images/community/jvc.jpg",
      tags: [
        { label: "Local Childcare" ,icon: "/images/community/icons/9.svg" },
        { label: "Circle Mall" ,icon: "/images/community/icons/2.svg" },
        { label: "Sheikh Zayed Rd" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 6,
      title: "MEYDAN HORIZON",
      image: "/images/community/meydanhorizan.jpg",
      tags: [
        { label: "Local Childcare" ,icon: "/images/community/icons/9.svg" },
        { label: "Circle Mall" ,icon: "/images/community/icons/2.svg" },
        { label: "Sheikh Zayed Rd" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
    {
      id: 7,
      title: "DUBAI SOUTH",
      image: "/images/community/dubai-south.jpg",
      tags: [
        { label: "Local Childcare" ,icon: "/images/community/icons/9.svg" },
        { label: "Circle Mall" ,icon: "/images/community/icons/2.svg" },
        { label: "Sheikh Zayed Rd" ,icon: "/images/community/icons/3.svg" },
      ],
      href: "/communities/dubai-islands",
    },
  ] as CommunityCard[],
};