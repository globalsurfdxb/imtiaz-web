import Index from "@/app/components/property-details/Index";
import type { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPropertyDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/property_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPropertyDetailData(slug);
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
  const data = await getPropertyDetailData(slug);

  const allPropertyResponse = await fetch(
    `${process.env.BASE_URL}/api/properties.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const allPropertyData = await allPropertyResponse.json();

  return (
    <>
      <Index
        data={data.data}
        allPropertyData={allPropertyData.data}
        slug={slug}
      />
    </>
  );
};

export default Page;
