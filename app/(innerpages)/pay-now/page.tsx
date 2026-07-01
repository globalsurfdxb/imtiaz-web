import type { Metadata } from "next";
import Index from "@/app/components/pay-now/Index";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

async function getPayNowData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/paynow.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPayNowData();
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
  const data = await getPayNowData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
