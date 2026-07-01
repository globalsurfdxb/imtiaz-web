import InnerHeroBanner from "../common/InnerHeroBanner";
import { bannerData } from "./data";
import Map from "./sections/Map"; 
import Enquiry from "./sections/Enquiry";
 
const Index = ({data}:any) => {

const enquiryData = {
  heading: data.page_title,
  subheading: data.page_caption,

  contacts: [
    {
      id: "phone",
      icon: "phone",
      label: data.phone_text,
      href: data.phone_link,
    },
    {
      id: "email",
      icon: "email",
      label: data.email_text.toUpperCase(),
      href: data.email_link,
    },
  ],

  // Static values since they don't exist in API response
  selectReasons: [
    "General Enquiry",
    "Project Development",
    "Asset Management",
    "Engineering & Construction",
    "Project Management",
    "Development",
  ],

  contactModes: ["Phone", "Whatsapp", "Email"],

  checkboxes: [
    {
      id: "news",
      label: "I'd like to hear about news and offers.",
    },
    {
      id: "privacy",
      label: "I've read and agree to the Privacy Policy",
    },
  ],

  contactInfo: [
    // {
    //   icon: "/images/icons/videocall.svg",
    //   text: data.call_text,
    //   href: data.call_link,
    //   alignment: true,
    // },
    {
      icon: "/images/icons/book.svg",
      text: data.view_text,
      href: data.view_link,
      alignment: true,
    },
    {
      icon: "/images/icons/call.svg",
      text: data.phone_text,
      href: data.phone_link,
      alignment: true,
    },
    {
      icon: "/images/icons/mail.svg",
      text: data.email_text,
      href: data.email_link,
      alignment: true,
    },
    {
      icon: "/images/icons/location.svg",
      text: data.address_text,
      href: data.address_link || "",
      alignment: false,
    },
  ],
};

  return (
    <>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
       maxTitle="max-w-[73ch]" maxW="max-w-[40ch]"/> 
      <Enquiry 
      enquiryData={enquiryData}
      />
      <Map title={data.map_heading} latitude={data.latitude} longitude={data.longitude}/> 
    </>
  );
};

export default Index;
