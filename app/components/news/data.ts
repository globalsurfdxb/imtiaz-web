export type NewsListingResponse = {
  status: string;
  language: string;
  code: number;
  message: string;
  data: {
    meta_title: string;
    meta_description: string | null;
    page_banner_title: string;
    page_banner_caption: string;
    page_banner_desktop: string;
    page_banner_mobile: string;
    listing: NewsItem[];
  };
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


export const bannerData = {
    title: "Imtiaz Updates",
    description: "Explore the latest news, launches, and milestones from Imtiaz Developments, showcasing our continued growth and commitment to excellence.",
    image: "/images/news/banner.jpg",
}

export type PressCategory = "News" | "Press Release" | "Event";
export type PressYear = "2026" | "2025" | "2024";
export type PressMonth =
  | "January" | "February" | "March" | "April"
  | "May" | "June" | "July" | "August"
  | "September" | "October" | "November" | "December";

export interface PressItem {
  id: number;
  title: string;
  image: string;
  mobileImage:string;
  category: PressCategory;
  date: string;
  slug: string;
  tag?: string;
}

export const pressItems: PressItem[] = [
  {
    id: 1,
    title: "Imtiaz Delivers Fifth Project of the Year with the Handover of Hyde Walk in Jumeirah Garden City",
    image: "/images/news/7.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-delivers-hyde-walk-jumeirah-garden-city",
  },
  {
    id: 2,
    title: "Imtiaz Developments Launches The Symphony, A DHI Billion Dollar Project",
    image: "/images/news/1.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-developments-launches-symphony",
  },
  {
    id: 3,
    title: "The Imtiaz Growth Story: Redefining Luxury",
    image: "/images/news/2.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-growth-story-redefining-luxury",
  },
  {
    id: 4,
    title: "Imtiaz and Zaha Hadid Architects Set the Stage",
    image: "/images/news/3.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-zaha-hadid-architects-set-the-stage",
  },
  {
    id: 5,
    title: "Imtiaz Developments Hands Over Pearl House II",
    image: "/images/news/4.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-05-02",
    slug: "imtiaz-hands-over-pearl-house-ii",
  },
  {
    id: 6,
    title: "Imtiaz Developments Announces Strategic Partnership",
    image: "/images/news/5.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-announces-strategic-partnership",
  },
  {
    id: 7,
    title: "Imtiaz Developments Appoints Otis for 41-Storey Tower",
    image: "/images/news/6.jpg",
    mobileImage:"",
    category: "News",
    date: "2024-08-02",
    slug: "imtiaz-appoints-otis-41-storey-tower",
  },
];

export const pressYears: PressYear[] = ["2026", "2025", "2024"];
export const pressMonths: PressMonth[] = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];
export const pressCategories: PressCategory[] = ["News", "Press Release", "Event"];