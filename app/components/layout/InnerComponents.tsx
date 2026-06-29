"use client";

import { useEffect } from "react";
import { useLenis } from "../../contexts/LenisContext";
import InnerHeader from "../../components/layout/InnerHeader";
import InnerFooter from "../../components/layout/InnerFooter";

export default function InnerLayout({
  children,
  menuData,
  propertyData,
  communityData
}: {
  children: React.ReactNode;
  menuData: any;
  propertyData:any;
  communityData:any;
}) {
  const { unlock } = useLenis();

  useEffect(() => {
    unlock();
  }, [unlock]);
  

  return (
    <>
      <InnerHeader menuData={menuData}/>
      {children}
      <InnerFooter latestProjects={propertyData?.data?.listing?.slice(0, 6) ?? []} latestCommunities={communityData?.data?.listing?.slice(0, 6) ?? []}/>
    </>
  );
}