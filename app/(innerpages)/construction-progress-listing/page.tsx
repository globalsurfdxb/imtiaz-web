import type { Metadata } from "next";
import Index from "@/app/components/construction-progress-listing/Index";

async function getConstructionProgressListingData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/construction_progress_listing.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getConstructionProgressListingData();
  const meta = data?.data;

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    openGraph: {
      title: meta?.meta_title,
      description: meta?.meta_description,
    },
  };
}

const page = async () => {
  const data = await getConstructionProgressListingData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
