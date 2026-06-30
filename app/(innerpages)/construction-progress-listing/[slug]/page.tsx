import type { Metadata } from "next";
import Index from "@/app/components/construction-progress/Index";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getConstructionProgressDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/construction_progress_detail.php?slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getConstructionProgressDetailData(slug);
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
  const data = await getConstructionProgressDetailData(slug);

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
