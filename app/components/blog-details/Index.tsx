import BlogContent from "./sections/BlogContent";
import BlogHero from "./sections/BlogHero";
import { BlogDetailData, blogDetails } from "./data";
import RelatedBlogs from "./sections/RelatedBlogs";
import { BlogListingData } from "../blogs/data";

const Index = ({data,allBlogsData}:{data:BlogDetailData,allBlogsData:BlogListingData}) => {
  return (
    <>
      <BlogHero blog={data} />
      <BlogContent content={data.description} />
      <RelatedBlogs data={allBlogsData.listing} currentBlog={data.page_banner_title}/>
    </>
  );
};

export default Index;
