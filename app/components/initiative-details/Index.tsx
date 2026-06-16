import { details, images, relatedItems } from "./sections/data";
import Hero from "./sections/Hero";
import VideoSection from "./sections/VideoSection";
import Content from "./sections/Content";
import ImageSlider from "./sections/ImageSlider";
import RelatedInitiative from "./sections/RelatedInitiative";

const Index = ({data}:any) => {

  const relatedItems = data?.related_initiatives?.map((item:any)=>{
    return {
      title:item?.title,
      image:item?.featured_image_desktop,
      slug:item?.slug
    }
  })

  return (
    <>
      <Hero title={data?.page_banner_title}/>
      <VideoSection image={data?.page_poster_desktop}/>
      <Content content={data?.description} sourceUrl={data?.source_url}/>
      {data?.gallery && <ImageSlider images={data?.gallery}/>}
      {relatedItems && <RelatedInitiative data={relatedItems}/>}
    </>
  );
};

export default Index;
