import Index from '@/app/components/property-details/Index'

// export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/property_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();

  const allPropertyResponse = await fetch(`${process.env.BASE_URL}/api/properties.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const allPropertyData = await allPropertyResponse.json();

  return (
    <>
      <Index data={data.data} allPropertyData={allPropertyData.data} slug={slug}/>
    </>
  )
}

export default page