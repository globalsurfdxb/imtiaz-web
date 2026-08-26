import type { Metadata } from "next";
import Index from "@/app/components/property/Index";
import { headers } from "next/headers";

async function getPropertiesData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/properties.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

async function getCommunitiesData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/communities.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPropertiesData();
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

const page = async () => {
  const data = await getPropertiesData();
  const communities = await getCommunitiesData();

  return (
    <>
      <Index data={data.data} communities={communities.data} />
    </>
  );
};

export default page;
