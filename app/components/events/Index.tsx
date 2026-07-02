import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData, EventListingData } from './data'
import EventsSection from './sections/EventsSection'
import { Suspense } from 'react'

const Index = ({data}:{data:EventListingData}) => {
  return (
    <>
      <InnerHeroBanner title={data.page_banner_title} image={data.page_banner_desktop} mobileImage={data.page_banner_mobile} description={data.page_banner_caption} maxW='max-w-[394px]' />
      <Suspense fallback={<div>Loading...</div>}>
        <EventsSection data={data}/>  
      </Suspense>
    </>
  )
}

export default Index