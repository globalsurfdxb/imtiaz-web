export interface EventListingItem {
  slug: string;
  title: string;
  description: string;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  post_date: string;
  event_location: string;
  category_name: string;
}

export interface EventListingData {
  meta_title: string;
  meta_description: string | null;
  page_banner_title: string;
  page_banner_caption: string;
  page_banner_desktop: string;
  page_banner_mobile: string;
  listing: EventListingItem[];
}

export interface EventListingResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: EventListingData;
}


export const bannerData = {
    image: "/images/events/banner.jpg",
    title: "Events",
    description: "Browse upcoming events with key dates and details all in one place."
}

export type EventCategory = "News" | "Press Release" | "Event";
export type EventYear = "2026" | "2025" | "2024";
export type EventMonth =
  | "January" | "February" | "March" | "April"
  | "May" | "June" | "July" | "August"
  | "September" | "October" | "November" | "December";

export interface EventItem {
  id: number;
  title: string;
  image: string;
  mobileImage: string;
  category: EventCategory;
  date: string; // ISO: "2026-03-15"
  slug: string;
  tag?: string; // e.g. "UPCOMING SESSION"
  topic?: string;
}

export const eventItems: EventItem[] = [
  {
    id: 1,
    title: "Imtiaz Launches Sea Cliff, Adding One More Landmark to Its Growing Portfolio at Dubai Islands",
    image: "/images/events/1.jpg",
    mobileImage:"",
    category: "Press Release",
    date: "2026-03-20",
    slug: "imtiaz-launches-sea-cliff-dubai-islands",
  },
  {
    id: 2,
    title: "Imtiaz Developments Takes Center Stage as Platinum Partner at PropTech Connect 2026",
    image: "/images/events/2.jpg",
    mobileImage:"",
    category: "Event",
    date: "2026-03-18",
    slug: "imtiaz-platinum-partner-proptech-connect-2026",
    tag: "UPCOMING SESSION",
  },
  {
    id: 3,
    title: "A Magical Ground-Breaking of The Symphony by Imtiaz",
    image: "/images/events/3.jpg",
    mobileImage:"",
    category: "Event",
    date: "2026-03-10",
    slug: "ground-breaking-symphony-imtiaz",
  },
  {
    id: 4,
    title: "Aligning Vision, Focus, and Accountability: Imtiaz Developments' Strategy Meet 2026",
    image: "/images/events/4.jpg",
    mobileImage:"",
    category: "Event",
    date: "2026-03-05",
    slug: "imtiaz-strategy-meet-2026",
  },
  {
    id: 5,
    title: "Imtiaz Unveils The Symphony, A Landmark Designed by Zaha Hadid Architects",
    image: "/images/events/5.jpg",
    mobileImage:"",
    category: "News",
    date: "2026-02-28",
    slug: "imtiaz-unveils-symphony-zaha-hadid",
  },
  {
    id: 6,
    title: "Imtiaz Launches Sunset Bay Grand, an Upcoming Residence in Dubai Islands",
    image: "/images/events/6.jpg",
    mobileImage:"",
    category: "Press Release",
    date: "2026-02-20",
    slug: "imtiaz-launches-sunset-bay-grand-dubai-islands",
  },
];

export const eventYears: EventYear[] = ["2026", "2025", "2024"];
export const eventMonths: EventMonth[] = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];
export const eventCategories: EventCategory[] = ["News", "Press Release", "Event"];