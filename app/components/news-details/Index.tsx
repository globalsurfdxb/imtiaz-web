import NewsContent from "./sections/NewsContent";
import NewsHero from "./sections/NewsHero";
import { NewsDetailResponse, newsDetails } from "./data";
import RelatedNews from "./sections/RelatedNews";
import { NewsListingResponse } from "../news/data";

const Index = ({data,allNewsData}:{data:NewsDetailResponse['data'],allNewsData:NewsListingResponse['data']}) => {
  return (
    <>
      <NewsHero news={data} />
      <NewsContent content={data.description}/>
      <RelatedNews data={allNewsData} currentNews={data.page_banner_title}/>
    </>
  );
};

export default Index;
