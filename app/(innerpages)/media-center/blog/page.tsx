import type { Metadata } from "next";
import Index from "@/app/components/blogs/Index";

async function getBlogsData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/blogs.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBlogsData();
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
  const data = await getBlogsData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
