import type { Metadata } from "next";
import Index from "@/app/components/contact-us/Index";

async function getContactUsData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/contact_page_data.php`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactUsData();
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
  const data = await getContactUsData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
