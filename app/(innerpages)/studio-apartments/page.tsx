import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import Index from "@/app/components/studio-apartments/Index";
import { headers } from "next/headers";

async function getStudioApartmentsData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/trending_search_detail.php?slug=studio-apartments`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStudioApartmentsData();
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
  const data = await getStudioApartmentsData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
