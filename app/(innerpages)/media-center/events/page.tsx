import type { Metadata } from "next";
import Index from "@/app/components/events/Index";

async function getEventsData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/events.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEventsData();
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
  const data = await getEventsData();
  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
