import type { Metadata } from "next";
import Index from "@/app/components/initiative-details/Index";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getInitiativeDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/initiative_detail.php?slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInitiativeDetailData(slug);
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await getInitiativeDetailData(slug);

  return (
    <>
      <Index data={data.data} />
    </>
  );
}
