
import InnerComponents from "../components/layout/InnerComponents";

export default async function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { unlock } = useLenis();

  // useEffect(() => {
  //   unlock();
  // }, [unlock]);

  const menuResponse = await fetch(`${process.env.BASE_URL}/api/menu_communities_properties.php`, {
    next: { revalidate: 60 },
  })

  const menuData = await menuResponse.json();

  const propertyResponse = await fetch(`${process.env.BASE_URL}/api/properties.php?lang=en`, {
    next: { revalidate: 60 },
  })

  const propertyData = await propertyResponse.json();

  return (
    <>
      <InnerComponents menuData={menuData.data.listing} propertyData={propertyData}>
        {children}
      </InnerComponents>
    </>
  );
}
