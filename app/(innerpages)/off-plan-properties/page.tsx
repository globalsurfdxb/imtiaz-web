import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import Index from "@/app/components/off-plan-properties/Index";

async function getOffPlanPropertiesData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/trending_search_detail.php?slug=off-plan-properties`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getOffPlanPropertiesData();
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
  const data = await getOffPlanPropertiesData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
