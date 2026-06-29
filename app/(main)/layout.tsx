import type { Metadata } from "next";

import "../globals.css";
import HeaderWithHamburger from "../components/common/HeaderWithHamburger";
import ScrollToTopReload from "../components/common/ScrollToTopReload";
import LenisUnlock from "../components/common/LenisUnlock";
import InnerFooter from "../components/layout/InnerFooter";

export const metadata: Metadata = {
  title: "IMTIAZ",
  description: "Imtiaz",
};

const menuResponse = await fetch(`${process.env.BASE_URL}/api/menu_communities_properties.php`, {
  next: { revalidate: 60 },
})

const menuData = await menuResponse.json();

const propertyResponse = await fetch(`${process.env.BASE_URL}/api/properties.php?lang=en`, {
  next: { revalidate: 60 },
})

const propertyData = await propertyResponse.json();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTopReload />
      <LenisUnlock />
      <HeaderWithHamburger menuData={menuData.data.listing}/>
      {children}
      <InnerFooter latestProjects={propertyData?.data?.listing?.slice(0, 6) ?? []}/>
    </>
  )
}
