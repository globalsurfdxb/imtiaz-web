import InnerHeroBanner from "../common/InnerHeroBanner"
import PaymentForm from "./PaymentSection"
import { bannerData, OnlinePaymentResponse } from "./data"

const Index = ({data}:{data:OnlinePaymentResponse['data']}) => {
  return (
    <>
    <InnerHeroBanner 
    title={data.page_banner_title}
    image={data.page_banner_desktop}
    mobileImage={data.page_banner_mobile}
    description={data.page_banner_caption}
    maxW="max-w-[641px]" />
    {/* <PaymentForm 
    title={data.page_title}
    description={data.page_caption}
    /> */}
    </>
  )
}

export default Index