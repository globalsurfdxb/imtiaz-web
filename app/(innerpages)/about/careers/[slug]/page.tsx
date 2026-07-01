import Index from "@/app/components/careers-details/Index";
import type { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getCareerDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/career_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCareerDetailData(slug);
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

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getCareerDetailData(slug);

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
