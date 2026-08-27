import type { Metadata } from "next";
import Index from "@/app/components/community-new-v2/IndexV2";
import { headers } from "next/headers";

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
  const data = await getCommunitiesData();
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
  const data = await getCommunitiesData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
