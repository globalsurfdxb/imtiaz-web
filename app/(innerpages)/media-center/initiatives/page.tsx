import type { Metadata } from "next";
import Index from "@/app/components/initiatives/Index";
import { headers } from "next/headers";

async function getInitiativesData() {
  const response = await fetch(`${process.env.BASE_URL}/api/initiatives.php`, {
    next: { revalidate: 60 },
  });
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInitiativesData();
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

export default async function Page() {
  const data = await getInitiativesData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
}
