import type { Metadata } from "next";
import Index from "@/app/components/blog-details/Index";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlogDetailData(slug: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/blog_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogDetailData(slug);
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
  const data = await getBlogDetailData(slug);

  const allBlogsResponse = await fetch(
    `${process.env.BASE_URL}/api/blogs.php?lang=en`,
    { next: { revalidate: 60 } },
  );
  const allBlogsData = await allBlogsResponse.json();

  return <Index data={data.data} allBlogsData={allBlogsData.data} />;
};

export default Page;
