import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData } from './data'
import CommunitiesSection from './sections/CommunitySection'

const Index = ({data}:any) => {
  return (
    <>
      <InnerHeroBanner image={data.page_banner_desktop} mobileImage={data.page_banner_mobile} title={data.page_banner_title} description={data.page_banner_caption} maxW='max-w-[805px]' />
      <CommunitiesSection title={data.page_title} description={data.page_caption} items={data.listing}/>  
    </>
  )
}

export default Index