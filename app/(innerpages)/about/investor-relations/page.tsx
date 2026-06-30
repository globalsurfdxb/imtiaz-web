import type { Metadata } from "next";
import Index from "../../../components/investor-relations/Index";

async function getInvestorRelationsData() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/investor_relation.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInvestorRelationsData();
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
  const data = await getInvestorRelationsData();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default page;
