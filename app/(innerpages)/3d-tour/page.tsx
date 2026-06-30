import type { Metadata } from "next";
import Index from '@/app/components/three-d-tour/Index'

async function getThreeDTourData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/3dtour.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getThreeDTourData();
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

  const data = await getThreeDTourData();

  return (
    <>
      <Index data={data.data}/>
    </>
  )
}

export default page