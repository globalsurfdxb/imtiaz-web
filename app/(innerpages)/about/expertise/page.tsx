import type { Metadata } from "next";
import Index from "@/app/components/expertise/Index";

async function getExpertiseData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/expertise.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getExpertiseData();
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
  const data = await getExpertiseData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
}
