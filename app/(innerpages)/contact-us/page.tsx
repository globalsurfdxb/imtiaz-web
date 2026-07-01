import type { Metadata } from "next";
import Index from "@/app/components/contact-us/Index";
import { Suspense } from "react";
import { headers } from "next/headers";

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

const page = async () => {
  const data = await getContactUsData();

  return (
    <>
      <Suspense fallback={null}>
        <Index data={data.data} />
      </Suspense>
    </>
  );
};

export default page;
