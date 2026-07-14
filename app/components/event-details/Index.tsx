import EventHero from "./sections/EventHero";
import { EventDetailData, eventDetails } from "./data";
import EventContent from "./sections/EventContent";
import SignatureMomentsSlider from "./sections/SIgnatureMomentsSlider";
import OtherEvents from "./sections/OtherEvents";
import { EventListingData } from "../events/data";

const Index = ({data,allEventsData}:{data:EventDetailData,allEventsData:EventListingData}) => {
  return (
    <>
      <EventHero event={data} />
      <EventContent content={data?.description} />
      {data.gallery && <SignatureMomentsSlider images={data?.gallery} title={data?.gallery_title}/>}
      <OtherEvents data={allEventsData} currentItem={data.page_banner_title}/>
    </>
  );
};

export default Index;
