import Index from "@/app/components/event-details/Index";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getEventDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/event_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEventDetailData(slug);
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

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getEventDetailData(slug);

  const allEventsResponse = await fetch(
    `${process.env.BASE_URL}/api/events.php?lang=en`,
    { next: { revalidate: 60 } },
  );
  const allEventsData = await allEventsResponse.json();

  return <Index data={data.data} allEventsData={allEventsData.data} />;
};

export default Page;
