import type { Metadata } from "next";
import Index from "@/app/components/community-details/Index";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getCommunityDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/community_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCommunityDetailData(slug);
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

  const data = await getCommunityDetailData(slug);

  const communitiesResponse = await fetch(
    `${process.env.BASE_URL}/api/communities.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const communitiesData = await communitiesResponse.json();

  return (
    <>
      <Index data={data.data} communitiesData={communitiesData.data} />
    </>
  );
};

export default Page;
