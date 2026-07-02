export interface BlogListingItem {
  slug: string;
  title: string;
  description: string | null;
  featured_image_desktop: string;
  featured_image_mobile: string;
  featured_image_alt: string;
  post_date: string;
  topic_name: string;
  category_name: string;
}

export interface BlogListingData {
  meta_title: string;
  meta_description: string | null;
  page_banner_title: string;
  page_banner_caption: string;
  page_banner_desktop: string;
  page_banner_mobile: string;
  listing: BlogListingItem[];
}

export interface BlogListingResponse {
  status: string;
  language: string;
  code: number;
  message: string;
  data: BlogListingData;
}

export const bannerData = {
  image: "/images/blogs/banner.jpg",
  title: "Our Insightful Blog",
  description: "Explore the latest news, launches, and milestones from Imtiaz Developments, showcasing our continued growth and commitment to excellence."
}

export type BlogCategory = "Blog" | "News" | "Press Release";
export type BlogTopic = "Investment" | "Lifestyle" | "Market" | "Guide";

export interface Blog {
  id: number;
  title: string;
  image: string;
  category: BlogCategory;
  topic: BlogTopic;
  date: string;
  slug: string;
  mobileImage: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Hottest Off-Plan Projects in Dubai Where to Invest for Max ROI?",
    image: "/images/blogs/5.jpg",
    mobileImage: "",
    category: "Blog",
    topic: "Investment",
    date: "2024-05-10",
    slug: "hottest-off-plan-projects-dubai",
  },
  {
    id: 2,
    title: "Your Off-Plan Investment Journey: Tips From Imtiaz Developments",
    image: "/images/blogs/1.jpg",
    mobileImage: "",
    category: "Blog",
    topic: "Investment",
    date: "2024-05-08",
    slug: "off-plan-investment-journey-tips",
  },
  {
    id: 3,
    title: "Buying Property in Dubai: Pros and Cons Revealed",
    image: "/images/blogs/2.jpg",
    mobileImage: "",
    category: "Blog",
    topic: "Market",
    date: "2024-05-06",
    slug: "buying-property-dubai-pros-cons",
  },
  {
    id: 4,
    title: "Top Amenities to Look for When Investing in a Dubai Waterfront Property",
    image: "/images/blogs/3.jpg",
    mobileImage: "",
    category: "Blog",
    topic: "Lifestyle",
    date: "2024-05-04",
    slug: "top-amenities-dubai-waterfront",
  },
  {
    id: 5,
    title: "Your Ultimate Guide to Purchasing a Luxurious Duplex in Dubai",
    image: "/images/blogs/4.jpg",
    mobileImage: "",
    category: "Blog",
    topic: "Guide",
    date: "2024-05-02",
    slug: "guide-purchasing-luxurious-duplex-dubai",
  },

];

export const blogTopics: BlogTopic[] = ["Investment", "Lifestyle", "Market", "Guide"];
export const blogCategories: BlogCategory[] = ["Blog", "News", "Press Release"];