
import type { Metadata } from "next";
import Index from "@/app/components/Home/Index2";
import {
  heroSlides,
  ConstructionProgressData,
  imtiazPropertiesData,
  appSectionData,
  communityNamesData,
  heroSlidesComingSoon,
  promotion,
} from "../components/Home/data";
import { headers } from "next/headers";

async function getHomeData() {
  const response = await fetch(`${process.env.BASE_URL}/api/home.php?lang=en`, {
    next: { revalidate: 60 },
  });
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  const meta = data?.data;
  const pathname = (await headers()).get("x-pathname") || "/";

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: meta?.meta_title,
      description: meta?.meta_description,
    },
  };
}

export default async function Page() {
  const data = await getHomeData();

  const communitiesResponse = await fetch(
    `${process.env.BASE_URL}/api/communities.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const communitiesData = await communitiesResponse.json();

  const propertyResponse = await fetch(
    `${process.env.BASE_URL}/api/properties.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const propertiesData = await propertyResponse.json();

  return (
    <Index
      heroSlides={heroSlides}
      heroSlidesComingSoon={heroSlidesComingSoon}
      promotion={promotion}
      communityNamesData={communityNamesData}
      imtiazPropertiesData={imtiazPropertiesData}
      ConstructionProgressData={ConstructionProgressData}
      appSectionData={appSectionData}
      data={data.data}
      communitiesData={communitiesData.data}
      propertiesData={propertiesData.data}
    />
  );
}
