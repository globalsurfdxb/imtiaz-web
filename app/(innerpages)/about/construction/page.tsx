import type { Metadata } from "next";
import Index from "@/app/components/construction/Index";

async function getConstructionData() {
  const response = await fetch(`${process.env.BASE_URL}/api/construction.php`, {
    next: { revalidate: 60 },
  });
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getConstructionData();
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

export default async function Page() {
  const data = await getConstructionData();
  return (
    <>
      <Index data={data.data} />
    </>
  );
}
