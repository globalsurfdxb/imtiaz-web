import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData, InvestorRelationsPageResponse } from './data'
import InvestorFaq from './sections/InvestorFaq'
import ImtiazProperties from './sections/ImtiazProperties'
import ImtiazCommunities from './sections/ImtiazCommunities'
import Reasons from './sections/Reasons'
import InvestmentSection from './sections/InvestmentSection'

const Index = ({data}:{data:InvestorRelationsPageResponse['data']}) => {

  const investReasonsData = {
  sectionTitle: data?.reason_title,

  sectionDescription: data?.reason_brief,

  reasons: (data?.reasons || []).map(
    (item: any, index: number) => ({
      id: index + 1,

      icon: item.icon_url,

      title: item.reason_title,

      description: item.reason_caption,
    })
  ),
};


const investmentAppealData = {
  sectionTitle: data?.appeal_title,

  sectionDescription: data?.appeal_brief,

  image: {
    src: data?.appeal_image_desktop,
    mobileSrc: data?.appeal_image_mobile,
    alt: data?.appeal_image_alt,
  },

  stats: [
    {
      id: 1,
      value: data?.highlight_title_1,
      label: data?.highlight_caption_1,
    },

    {
      id: 2,
      value: data?.highlight_title_2,
      label: data?.highlight_caption_2,
    },

    {
      id: 3,
      value: data?.highlight_title_3,
      label: data?.highlight_caption_3,
    },

    {
      id: 4,
      value: data?.highlight_title_4,
      label: data?.highlight_caption_4,
    },

    {
      id: 5,
      value: data?.highlight_title_5,
      label: data?.highlight_caption_5,
    },
  ],
};

const faqData = {
  title: data?.faq_title,

  subtitle: data?.faq_caption,

  items: (data?.faqs || []).map(
    (item: any, index: number) => ({
      id: (index + 1).toString(),

      question: item.faq_question,

      answer: item.faq_answer,
    })
  ),
};

  return (
    <>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      mobileImage={data.page_banner_mobile}
      maxW='max-w-[690px]' />
      {data?.show_reasons_section == "true" && <Reasons data={investReasonsData}/>}
      {data?.show_appeal_section == "true" && <InvestmentSection data={investmentAppealData}/>}
      {data?.show_communities_section == "true" && <ImtiazCommunities data={data.communities} title={data.communities_title}/>}
      {data?.show_properties_section == "true" && <ImtiazProperties data={data.properties} title={data.properties_title}/>}
      {data?.show_faq_section == "true" && <InvestorFaq data={faqData}/>}
    </>
  )
}

export default Index