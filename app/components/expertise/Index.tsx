import { ExpertisePageResponse } from "./data";
import InnerHeroBanner from "../common/InnerHeroBanner";
import ThinkingThatDelivers from "./sections/thinking-that-delivers";
import Faq from "./sections/Faqsection";
import EnquirySection from "./sections/Enquiry";


export default function Index({data}:{data:ExpertisePageResponse['data']}) {

 const thinkingThatDelivers = {
  heading: data?.reason_title,

  description: data?.reason_brief,

  services: (data?.expertises || []).map(
    (item: any, index: number) => ({
      id: item.title
        ?.toLowerCase()
        .replace(/\s+/g, "-"),
      number: String(index + 1).padStart(2, "0"),
      title: item.title,
      description: item.brief,
      image: item.featured_image_desktop,
      mobileImage: item.featured_image_mobile,
      alt: item.featured_image_alt || item.title,
      dark: index === 0,
    })
  ),
};

const faqData = {
  title: data?.faq_title,
  subtitle: data?.faq_caption,
  items: (data?.faqs || []).map((item: any, index: number) => ({
    id: `faq-${index + 1}`,
    question: item.faq_question,
    answer: item.faq_answer,
  })),
};

  return (
    <>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      mobileImage={data.page_banner_mobile}
      maxW="max-w-[805px]" />
      {data?.show_expertise_section == "true" && <ThinkingThatDelivers data={thinkingThatDelivers}/>}
      {data?.show_faq_section == "true" && <Faq data={faqData}/>}
      <EnquirySection />
    </>
  ); 
}
